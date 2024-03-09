import React, { useCallback, useRef } from "react";
import ReactFlow, {
  useNodesState,
  Controls,
  Background,
  useEdgesState,
  addEdge,
  onNodeDragStart,
  onNodeDragEnd,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
];
const initialEdges = [];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeDraggingRef = useRef(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeDragStart = useCallback((event, node) => {
    nodeDraggingRef.current = node;
  }, []);

  const onNodeDragEnd = useCallback((event, node) => {
    nodeDraggingRef.current = null;
    onNodesChange(nodes); // Update node positions
  }, [nodes, onNodesChange]);


  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStart={onNodeDragStart}
        onNodeDragEnd={onNodeDragEnd}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Flow;
