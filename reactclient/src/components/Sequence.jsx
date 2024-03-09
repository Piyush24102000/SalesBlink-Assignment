import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Flow from "./Flow";

const Sequence = () => {
  let userName = Cookies.get("name");
  let token = Cookies.get("token");

  return (
    <>
      {!token ? (
        <>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  You are not logged in!
                </h2>
                <p className="text-gray-600">
                  Please login to create sequences.
                </p>
              </div>
              <div className="flex justify-center">
                <Link
                  to="/login"
                  className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Flow />
        </>
      )}
    </>
  );
};

export default Sequence;
