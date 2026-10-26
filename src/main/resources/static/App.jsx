function App() {
    const graph = useGraph();

    return (
        <div>
            <Navbar
                onAddNode={graph.addNode}
                onAddEdge={graph.addEdge}
                onDelete={graph.deleteSelected}
                onClear={graph.clearAll}
                onAdjacency={graph.showAdjacency}
            />
            <GraphCanvas containerRef={graph.containerRef} />
            <Modal isOpen={false}>
                <AdjacencyMatrix />
            </Modal>
        </div>
    );
}