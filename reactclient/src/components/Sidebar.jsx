import React from "react";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar on the right */}
      <aside className="w-64 border-l border-gray-200 p-4 text-xs bg-white">
        <div className="mb-2.5 text-base">Drag the nodes on the Canvas</div>
        <div
          className="node-box text-lg border rounded-md h-10 p-2 flex justify-center items-center cursor-grab"
          onDragStart={(event) => onDragStart(event, "Send Email")}
          draggable
        >
         Send Email
        </div>
        <div
          className=" mt-5 node-box  text-lg border rounded-md h-10 p-2 flex justify-center items-center cursor-grab"
          onDragStart={(event) => onDragStart(event, "Wait")}
          draggable
        >
         Wait 
        </div>
        <div
          className="mt-5 node-box  text-lg border rounded-md h-10 p-2 flex justify-center items-center cursor-grab"
          onDragStart={(event) => onDragStart(event, "Decision")}
          draggable
        >
          Decision
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
