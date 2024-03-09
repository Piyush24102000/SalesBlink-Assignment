import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "55%",
    height: "55%",
    transform: "translate(-50%, -50%)",
  },
};

const Nodemodal = ({ isOpen, onClose, node }) => {
  // Initialize state variables
  const [emailContent, setEmailContent] = useState("");
  const [recipients, setRecipients] = useState("");
  const [condition, setCondition] = useState("");
  const [duration, setDuration] = useState("");

  // Update state variables when node changes
  useEffect(() => {
    if (node) {
      setEmailContent(node.data?.emailContent || "");
      setRecipients(node.data?.recipients || "");
      setCondition(node.data?.condition || "");
      setDuration(node.data?.duration || "");
    }
  }, [node]);

  // Define handleSave function
  const handleSave = () => {
    // Update the node object with the new data based on node type
    if (node.type === "Send Email") {
      node.data.emailContent = emailContent;
      node.data.recipients = recipients;
    } else if (node.type === "Wait") {
      node.data.duration = duration;
    } else if (node.type === "Decision") {
      node.data.condition = condition;
    }

    // Close the modal
    onClose();
  };

  // Render the modal content
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <div className="flex justify-center mb-4">
          <Button color="success" className="mr-2" onClick={handleSave}>
            Save
          </Button>
          <Button color="failure" onClick={onClose}>
            Close
          </Button>
        </div>
        {/* Conditionally render input fields based on node type */}
        {node && (
          <>
            {node.type === "Send Email" && (
              <>
                <label>Email Content:</label>
                <textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="block w-full border-gray-300 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <div className="mt-5">
                  <label>Recipients:</label>
                  <input
                    type="text"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    placeholder="Enter email addresses separated by commas"
                    className="block w-full border-gray-300 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </>
            )}
            {node.type === "Wait" && (
              <>
                <label>Duration (in minutes):</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="block w-full mt-5 border-gray-300 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </>
            )}
            {node.type === "Decision" && (
              <>
                <label>Decision:</label>
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="Type a condition"
                  className="block w-full mt-5 border-gray-300 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default Nodemodal;
