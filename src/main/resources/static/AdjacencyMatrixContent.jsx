function AdjacencyMatrix() {
    const nodes = ['A', 'B', 'C', 'D'];
    const matrix = [
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0],
    ];

    return (
        <>
            <h2>Adjacency Matrix</h2>
            <table>
                <thead>
                <tr>
                    <th></th>
                    {nodes.map((node) => (
                        <th key={node}>{node}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {matrix.map((row, i) => (
                    <tr key={nodes[i]}>
                        <th>{nodes[i]}</th>
                        {row.map((cell, j) => (
                            <td key={j}>{cell}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}