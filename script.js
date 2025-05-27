
const MAZE_SIZE = 10;
let maze = [];
let robotPos = { x: 1, y: 1 };
let packagePos = { x: 8, y: 8 };
let isRunning = false;
let speed = 'slow'; // slow, fast

// Simple maze patterns
const mazePatterns = [
    // Pattern 1: Simple corridors
    [
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,0,0,0,1],
        [1,0,1,0,1,0,1,1,0,1],
        [1,0,1,0,0,0,0,1,0,1],
        [1,0,1,1,1,1,0,1,0,1],
        [1,0,0,0,0,1,0,0,0,1],
        [1,1,1,0,0,1,1,1,0,1],
        [1,0,0,0,0,0,0,1,0,1],
        [1,0,1,1,1,1,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1]
    ],
    // Pattern 2: Spiral-like
    [
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,0,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,1,0,1],
        [1,1,1,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,0,1,0,1],
        [1,0,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1]
    ],
    // Pattern 3: Cross pattern
    [
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,0,0,0,1],
        [1,0,1,0,1,0,1,0,1,1],
        [1,0,1,0,0,0,1,0,0,1],
        [1,0,1,1,1,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,0,1],
        [1,1,1,0,1,1,1,0,1,1],
        [1,0,0,0,1,0,0,0,0,1],
        [1,0,1,1,1,0,1,1,0,1],
        [1,1,1,1,1,1,1,1,1,1]
    ]
];

function generateMaze() {
    if (isRunning) return;
    
    // Choose random pattern
    const pattern = mazePatterns[Math.floor(Math.random() * mazePatterns.length)];
    maze = pattern.map(row => [...row]);
    
    // Random positions for robot and package
    const freeSpaces = [];
    for (let y = 0; y < MAZE_SIZE; y++) {
        for (let x = 0; x < MAZE_SIZE; x++) {
            if (maze[y][x] === 0) {
                freeSpaces.push({ x, y });
            }
        }
    }
    
    if (freeSpaces.length >= 2) {
        const robotIndex = Math.floor(Math.random() * freeSpaces.length);
        robotPos = freeSpaces[robotIndex];
        
        let packageIndex;
        do {
            packageIndex = Math.floor(Math.random() * freeSpaces.length);
        } while (packageIndex === robotIndex);
        packagePos = freeSpaces[packageIndex];
    }
    
    renderMaze();
    resetStats();
}

function renderMaze() {
    const mazeElement = document.getElementById('maze');
    mazeElement.innerHTML = '';
    
    for (let y = 0; y < MAZE_SIZE; y++) {
        for (let x = 0; x < MAZE_SIZE; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${x}-${y}`;
            
            if (maze[y][x] === 1) {
                cell.className += ' wall';
                cell.textContent = '⬛';
            } else {
                cell.className += ' path';
            }
            
            if (x === robotPos.x && y === robotPos.y) {
                cell.className += ' robot';
                cell.textContent = '🤖';
            } else if (x === packagePos.x && y === packagePos.y) {
                cell.className += ' package';
                cell.textContent = '📦';
            }
            
            mazeElement.appendChild(cell);
        }
    }
}

function resetMaze() {
    if (isRunning) return;
    
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('visited', 'solution');
    });
    
    resetStats();
    hideStatus();
}

function resetStats() {
    document.getElementById('steps').textContent = '0';
    document.getElementById('visited').textContent = '0';
    document.getElementById('pathLength').textContent = '0';
}

function showStatus(message, type) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
    statusElement.className = `status ${type}`;
    statusElement.style.display = 'block';
}

function hideStatus() {
    document.getElementById('status').style.display = 'none';
}

function toggleSpeed() {
    speed = speed === 'slow' ? 'fast' : 'slow';
    document.getElementById('speedBtn').textContent = speed === 'slow' ? '🐌 Lambat' : '🚀 Cepat';
}

function getNeighbors(pos) {
    const neighbors = [];
    const directions = [
        { dx: 0, dy: -1 }, // up
        { dx: 1, dy: 0 },  // right
        { dx: 0, dy: 1 },  // down
        { dx: -1, dy: 0 }  // left
    ];
    
    for (const dir of directions) {
        const newX = pos.x + dir.dx;
        const newY = pos.y + dir.dy;
        
        if (newX >= 0 && newX < MAZE_SIZE && 
            newY >= 0 && newY < MAZE_SIZE && 
            maze[newY][newX] === 0) {
            neighbors.push({ x: newX, y: newY });
        }
    }
    
    return neighbors;
}

async function bfsSearch() {
    const queue = [{ pos: robotPos, path: [robotPos] }];
    const visited = new Set();
    const startKey = `${robotPos.x}-${robotPos.y}`;
    visited.add(startKey);
    
    let steps = 0;
    let visitedCount = 0;
    
    while (queue.length > 0) {
        const { pos, path } = queue.shift();
        steps++;
        
        // Visual feedback
        const cell = document.getElementById(`cell-${pos.x}-${pos.y}`);
        if (!cell.classList.contains('robot') && !cell.classList.contains('package')) {
            cell.classList.add('visited');
            visitedCount++;
        }
        
        // Update stats
        document.getElementById('steps').textContent = steps;
        document.getElementById('visited').textContent = visitedCount;
        
        // Check if we found the package
        if (pos.x === packagePos.x && pos.y === packagePos.y) {
            await showSolution(path);
            return true;
        }
        
        // Add neighbors to queue
        const neighbors = getNeighbors(pos);
        for (const neighbor of neighbors) {
            const neighborKey = `${neighbor.x}-${neighbor.y}`;
            if (!visited.has(neighborKey)) {
                visited.add(neighborKey);
                queue.push({
                    pos: neighbor,
                    path: [...path, neighbor]
                });
            }
        }
        
        // Delay for visualization
        await new Promise(resolve => 
            setTimeout(resolve, speed === 'slow' ? 200 : 50)
        );
    }
    
    return false;
}

async function showSolution(path) {
    // Remove visited class and show solution
    for (let i = 1; i < path.length - 1; i++) { // Skip start and end
        const pos = path[i];
        const cell = document.getElementById(`cell-${pos.x}-${pos.y}`);
        cell.classList.remove('visited');
        cell.classList.add('solution');
        
        await new Promise(resolve => 
            setTimeout(resolve, speed === 'slow' ? 150 : 75)
        );
    }
    
    document.getElementById('pathLength').textContent = path.length - 1;
}

async function startDelivery() {
    if (isRunning) return;
    
    isRunning = true;
    document.getElementById('startBtn').disabled = true;
    resetMaze();
    
    showStatus('🔍 Robot sedang mencari jalur...', 'searching');
    
    const found = await bfsSearch();
    
    if (found) {
        showStatus('✅ Paket berhasil ditemukan!', 'found');
    } else {
        showStatus('❌ Tidak ada jalur ke paket!', 'not-found');
    }
    
    isRunning = false;
    document.getElementById('startBtn').disabled = false;
}

// Initialize
generateMaze();
