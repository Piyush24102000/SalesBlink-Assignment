import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const Header = () => {
  const [userName, setUserName] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      setUserName(Cookies.get("name"));
      setToken(Cookies.get("token"));
    };
    checkAuth();

    const interval = setInterval(checkAuth, 3000); // checks every 1 second or use State management
    return () => clearInterval(interval);
  }, []);

  function logoutUser() {
    Cookies.remove("name");
    Cookies.remove("token");
    setUserName(null);
    setToken(null);
  }
  return (
    <div>
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              SalesBlink
            </span>
          </Link>
          <div className="text-lg">
            {userName ? <h1>Welcome {userName}</h1> : ""}
          </div>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              {token ? (
                <>
                  <li>
                    <Link
                      to="/create-sequence"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Create Sequence
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={logoutUser}
                      className="block cursor-pointer py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/register"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  SignUp
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
