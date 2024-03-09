import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate  } from "react-router-dom";
import { store } from "../store";

const History = () => {
  let userId = Cookies.get("id");
  let [sequenceData, setSequenceData] = useState([]);
  let navigate =  useNavigate();
  const sequenceFromHistory = store((state) => state.sequenceFromHistory);
  const setSequenceFromHistory = store((state) => state.setSequenceFromHistory);

  useEffect(() => {
    async function fetchAllSequences() {
      try {
        let response = await fetch(
          `https://sales-blink-assignment-server.vercel.app/api/sequence/${userId}`
        );
        let responseData = await response.json();
        setSequenceData(responseData.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllSequences();
  }, []);

  function handleClick(item) {
    setSequenceFromHistory(item)
    navigate('/create-sequence')
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <table className="table-auto border border-collapse mt-5">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="px-3 py-2 text-center">Sequence Names</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3 py-2">
              {sequenceData.map((item) => (
                <div key={item._id} className="flex items-center">
                  <span className="flex-1">{item.name}</span>
                  <button
                    onClick={() => {
                      handleClick(item);
                    }}
                    className="px-3 py-2 ml-24 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                  >
                    Load
                  </button>
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default History;
