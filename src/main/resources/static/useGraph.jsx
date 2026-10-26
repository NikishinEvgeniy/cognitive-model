function useGraph() {
    // Так привязал div элемент. Точнее тут ссылка на него из GraphCanvas.jsx
    const containerRef = React.useRef(null);
    const cyRef = React.useRef(null);
    const counterNodeRef = React.useRef(0);
    const counterEdgeRef = React.useRef(0);

    // Инициализация graph
    React.useEffect(() => {
        const cy = cytoscape({
            container: containerRef.current,
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
            zoomingEnabled: true,
            userZoomingEnabled: true,
            minZoom: 0.1,
            maxZoom: 10,
            wheelSensitivity: 0.3
        });
        cyRef.current = cy;
        return () => cy.destroy();
    }, []);

    const addNode = (position) => {
        cyRef.current?.add({
            group: 'nodes',
            data: { id: counterNodeRef.current },
            position: position
        });
        counterNodeRef.current++;
    };

    // Double-click обработка
    React.useEffect(() => {
        const cy = cyRef.current;
        if (!cy) return;

        const handleDblClick = (event) => {
            if (event.target === cy) {
                addNode(event.position);
            }
        };

        cy.on('dblclick', handleDblClick);
        return () => cy.off('dblclick', handleDblClick);
    }, []);

    const addEdge = () => {
        const selected = cyRef.current?.$(':selected').nodes();

        if (selected?.length === 2) {
            const weight = prompt('Enter edge weight:', '1');
            if (weight === null) return;

            counterEdgeRef.current++;
            cyRef.current?.add({
                group: 'edges',
                data: {
                    id: `e${counterEdgeRef.current}`,
                    source: selected[0].id(),
                    target: selected[1].id(),
                    weight: Number(weight)
                }
            });
        }
    };

    const deleteSelected = () => {
        cyRef.current?.$(':selected').remove();
    };

    const clearAll = () => {
        cyRef.current?.elements().remove();
        counterNodeRef.current = 0;
        counterEdgeRef.current = 0;
    };

    const getAdjacency = () => {
        const nodes = cyRef.current?.nodes() || [];
        const edges = cyRef.current?.edges() || [];
        const adjacency = [];
        nodes.forEach((node, i) => {
            adjacency[i] = new Array(nodes.length).fill(0);
        });
        edges.forEach((edge) => {
            const source = nodes.indexOf(edge.source());
            const target = nodes.indexOf(edge.target());
            adjacency[source][target] = edge.data('weight') ?? 0;
        });
        return adjacency;
    };

    const showAdjacency = () => {
        console.log(getAdjacency());
    };

    return { containerRef, addNode, addEdge, deleteSelected, clearAll, showAdjacency };
}