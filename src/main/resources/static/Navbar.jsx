function Navbar(props) {
    return (
        <nav>
            <Button text='+ ADD NODE' onClick={props.onAddNode} />
            <Button text='+ ADD EDGE' onClick={props.onAddEdge} />
            <Button text='DELETE SELECTED' onClick={props.onDelete} />
            <Button text='CLEAR ALL' onClick={props.onClear} />
            <Button text='SHOW ADJACENCY' onClick={props.onAdjacency} />
        </nav>
    );
}