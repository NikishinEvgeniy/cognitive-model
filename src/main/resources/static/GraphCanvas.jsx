function GraphCanvas(props) {
    return (
        <div ref={props.containerRef} style={{
                width: '100%',
                height: '500px',
                border: '2px solid #000',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                borderRadius: '4px',
                background: '#fff'
            }}></div>
    );
}