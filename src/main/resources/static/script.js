var cy = cytoscape({
    container: document.getElementById('cy'),
    style: [
        {
            selector: 'node',
            style: {
                'background-color': '#ffffff',
                'label': 'data(id)',
                'color': '#000000',
                'font-size': 13,
                'text-valign': 'center',
                'text-halign': 'center',
                'width': 45,
                'height': 45,
                'border-width': 2,
                'border-color': '#000000',
                'font-weight': 500
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 1.5,
                'line-color': '#000000',
                'target-arrow-color': '#000000',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'label': 'data(weight)',
                'font-size': 10,
                'color': '#000000',
                'text-background-color': '#ffffff',
                'text-background-opacity': 0.9,
                'text-background-padding': '3px'
            }
        },
        {
            selector: ':selected',
            style: {
                'background-color': '#000000',
                'border-color': '#000000',
                'color': '#ffffff',
                'line-color': '#000000',
                'target-arrow-color': '#000000'
            }
        }
    ],
    layout: {
        name: 'cose',
        animate: false,
        padding: 40,
        nodeRepulsion: 8000,
        idealEdgeLength: 150,
        nodeOverlap: 10,
        gravity: 0.8,
        numIter: 2000,
        initialTemp: 1000,
        coolingFactor: 0.98,
        minTemp: 0.5
    },
    // Fixed zoom settings
    zoomingEnabled: true,
    userZoomingEnabled: true,
    minZoom: 0.1,
    maxZoom: 10,
    wheelSensitivity: 0.3
});

// Update status
function updateStatus() {
    var nodeCount = cy.nodes().length;
    var edgeCount = cy.edges().length;
    document.getElementById('status').textContent = nodeCount + ' nodes · ' + edgeCount + ' edges';
}

// Add node without changing zoom
function addNode(position) {
    var id = prompt('Node name:');
    if (id && !cy.getElementById(id).length) {
        var nodeData = { data: { id: id } };

        // Если передана позиция - используем её
        if (position) {
            nodeData.position = position;
        }

        cy.add(nodeData);
        updateStatus();
    } else if (id) {
        alert('A node with this name already exists!');
    }
}

// Обновленный обработчик двойного клика
cy.on('dblclick', function(event) {
    if (event.target === cy) {
        // Передаем координаты клика
        var position = {
            x: event.position.x,
            y: event.position.y
        };
        addNode(position);
    }
});

// Добавьте глобальную переменную
var clickOrder = [];

// Отслеживайте клики по узлам
cy.on('tap', 'node', function(evt) {
    var node = evt.target;
    if (!clickOrder.includes(node)) {
        clickOrder.push(node);
    }
    // Ограничьте до 2 узлов
    if (clickOrder.length > 2) {
        clickOrder.shift();
    }
});

// В addEdge()
function addEdge() {
    if (clickOrder.length !== 2) {
        alert('Select exactly 2 nodes (Ctrl+click)');
        return;
    }

    var weight = prompt('Edge weight:', '1');
    if (weight !== null) {
        cy.add({
            data: {
                source: clickOrder[0].id(),  // Первый кликнутый
                target: clickOrder[1].id(),  // Второй кликнутый
                weight: parseFloat(weight)
            }
        });
        clickOrder = []; // Очистить после создания
        updateStatus();
    }
}

// Delete selected
function deleteSelected() {
    var selected = cy.$(':selected');
    if (selected.length > 0) {
        cy.remove(selected);
        updateStatus();
    } else {
        alert('Select elements to delete');
    }
}

// Clear graph
function clearGraph() {
    if (confirm('Clear the entire graph?')) {
        cy.elements().remove();
        updateStatus();
        document.getElementById('output').innerHTML = '<span class="empty-state">No matrix generated yet</span>';
    }
}

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteSelected();
    }
});

// Initialize
updateStatus();

// Get adjacency matrix
function getAdjacencyMatrix() {
    var nodes = cy.nodes();
    if (nodes.length === 0) {
        alert('No nodes to display');
        return;
    }

    var nodeIds = nodes.map(function(n) { return n.id(); });

    // Build adjacency matrix with weights
    var matrix = [];
    var jsonMatrix = {};

    nodes.forEach(function(source, i) {
        matrix[i] = [];
        jsonMatrix[source.id()] = {};

        nodes.forEach(function(target, j) {
            var edge = cy.edges().filter(function(e) {
                return e.source().id() === source.id() &&
                    e.target().id() === target.id();
            });

            var weight = 0;
            if (edge.length > 0) {
                weight = edge[0].data('weight') ? edge[0].data('weight') : 1;
            }

            matrix[i][j] = weight;
            jsonMatrix[source.id()][target.id()] = weight;
        });
    });

    // Format matrix for display (text version)
    var textOutput = '';
    textOutput += '  ' + nodeIds.join('  ') + '\n';
    matrix.forEach(function(row, i) {
        textOutput += nodeIds[i] + ' ';
        textOutput += row.map(function(val) {
            if (val === 0) return '0';
            return val.toFixed ? val.toFixed(1) : val;
        }).join('  ');
        textOutput += '\n';
    });

    // Create JSON output
    var jsonOutput = JSON.stringify(jsonMatrix, null, 2);

    // Open new window with matrix
    var newWindow = window.open('', '_blank', 'width=600,height=500');
    newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Adjacency Matrix</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    padding: 20px;
                    background: #ffffff;
                    color: #000000;
                }
                h2 {
                    font-size: 18px;
                    margin-bottom: 20px;
                }
                .tabs {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .tab-button {
                    padding: 8px 16px;
                    background: #ffffff;
                    border: 1px solid #000000;
                    cursor: pointer;
                    font-size: 13px;
                }
                .tab-button.active {
                    background: #000000;
                    color: #ffffff;
                }
                .tab-content {
                    display: none;
                }
                .tab-content.active {
                    display: block;
                }
                pre {
                    font-family: 'SF Mono', 'Courier New', monospace;
                    font-size: 13px;
                    white-space: pre-wrap;
                    background: #f5f5f5;
                    padding: 15px;
                    border: 1px solid #e0e0e0;
                    overflow-x: auto;
                }
                .copy-button {
                    padding: 8px 16px;
                    background: #000000;
                    color: #ffffff;
                    border: none;
                    cursor: pointer;
                    margin-bottom: 10px;
                }
                .copy-button:hover {
                    background: #333333;
                }
            </style>
        </head>
        <body>
            <h2>Adjacency Matrix</h2>
            <div class="tabs">
                <button class="tab-button active" onclick="showTab('text')">Text Format</button>
                <button class="tab-button" onclick="showTab('json')">JSON Format</button>
            </div>
            <div id="text-tab" class="tab-content active">
                <button class="copy-button" onclick="copyText()">Copy Text</button>
                <pre id="text-output">${textOutput}</pre>
            </div>
            <div id="json-tab" class="tab-content">
                <button class="copy-button" onclick="copyJSON()">Copy JSON</button>
                <pre id="json-output">${jsonOutput}</pre>
            </div>
            <script>
                function showTab(tab) {
                    // Hide all tabs
                    document.querySelectorAll('.tab-content').forEach(el => {
                        el.classList.remove('active');
                    });
                    document.querySelectorAll('.tab-button').forEach(el => {
                        el.classList.remove('active');
                    });
                    
                    // Show selected tab
                    document.getElementById(tab + '-tab').classList.add('active');
                    event.target.classList.add('active');
                }
                
                function copyText() {
                    const text = document.getElementById('text-output').textContent;
                    navigator.clipboard.writeText(text).then(() => {
                        alert('Text copied to clipboard!');
                    });
                }
                
                function copyJSON() {
                    const json = document.getElementById('json-output').textContent;
                    navigator.clipboard.writeText(json).then(() => {
                        alert('JSON copied to clipboard!');
                    });
                }
            </script>
        </body>
        </html>
    `);
    newWindow.document.close();

    // Also update the main page output
    document.getElementById('output').textContent = textOutput;
    return matrix;
}