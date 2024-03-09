import React, { useCallback, useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import ReactFlow, {
  useNodesState,
  Controls,
  Background,
  useEdgesState,
  addEdge,
  getConnectedEdges,
  ReactFlowProvider,
} from "reactflow";
import Sidebar from "./Sidebar.jsx";
import "reactflow/dist/style.css";
import { Button } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { store } from "../store.js";
import Nodemodal from "./Nodemodal.jsx";
import { mainDFS } from "../utils/findEdgeSequence.js";

/* Intitalization of nodes */
const initialNodes = [];
let id = 0;
const getId = () => `dndnode_${id++}`;

/* Main Flow Component */
const Flow = () => {
  let userId = Cookies.get("id");

  /* States */
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  const navigate = useNavigate();

  const connectedEdges = getConnectedEdges(nodes, edges);
  const sequenceFromHistory = store((state) => state.sequenceFromHistory);

  useEffect(() => {
    // Check if sequence history is available
    const sequenceData = sequenceFromHistory;
    // If sequence data exists and it has nodes and edges, update nodes and edges
    if (sequenceData && sequenceData.nodes && sequenceData.edges) {
      setNodes(sequenceData.nodes);
      setEdges(sequenceData.edges);
    }
  }, []);

  /* On Edges Connect */
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  /* Create New Sequence */
  function createNew() {
    setNodes([]);
    setEdges([]);
  }
  /* On Drag Over */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /* On Drop  */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} ` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  /* Modal Code */
  function openModal(node) {
    setIsOpen(true);
    setSelectedNode(node);
  }
  const closeModal = () => {
    setIsOpen(false);
  };

  /* On node Click */
  const onNodeClick = useCallback((event, node) => {
    openModal(node);
  }, []);

  /* Functions */
  async function saveSequence() {
    let nameInput = prompt("Enter The name of sequence to be saved");
    let name;
    if (nameInput) {
      name = nameInput;
    } else {
      name = "";
    }
    let response = await fetch("https://sales-blink-server.vercel.app/api/sequence/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, nodes, edges, userId }),
    });
    let responseData = await response.json();
    toast(responseData.message);
  }

  /* Get Sequence History */
  function sequenceHistory() {
    navigate("/history");
  }

  /* Execute Function */
  async function Execute() {
    /* Make mapping of edges to apply DFS Algorithm */
    let edgesMap = {};
    for (let i = 0; i < edges.length; i++) {
      if (!edgesMap[edges[i].source]) {
        edgesMap[edges[i].source] = [];
      }
      edgesMap[edges[i].source].push(edges[i].target);
    }
    let executionSequence = mainDFS(edgesMap);
    try {
      let response = await fetch("https://sales-blink-server.vercel.app/api/execution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, executionSequence }),
      });
      let responseData = await response.json();
      if (responseData.success) {
        toast(responseData.message);
      }
    } catch (error) {
      toast(error.message);
    }
  }
  return (
    <div className="flex h-screen">
      <ReactFlowProvider>
        <div className="flex-grow " ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            onNodeClick={onNodeClick}
          >
            {/* Top Buttons */}
            <div className="flex absolute z-10 m-4">
              <Button onClick={saveSequence} className="ml-5" color="light">
                Save
              </Button>
              <Button onClick={createNew} className="ml-5" color="light">
                Create New
              </Button>
              <Button onClick={sequenceHistory} className="ml-5" color="light">
                Sequence history
              </Button>
              <Button onClick={Execute} className="ml-5" color="purple">
                Execute
              </Button>
            </div>

            <Controls />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      {/* Sidebar */}
      <div className="w-1/5  h-full">
        <Sidebar />
      </div>

      {/* Render modal */}
      <Nodemodal isOpen={isOpen} onClose={closeModal} node={selectedNode} />
      <ToastContainer />
    </div>
  );
};

export default Flow;
