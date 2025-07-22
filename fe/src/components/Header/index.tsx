import { Tooltip } from "antd";
import type { AuthInfo } from "../../types/types";
import { getAuthData } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const infoUser = getAuthData("authInfo") as AuthInfo | null;
  const [initials, setInitials] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (infoUser?.email) {
      const email = infoUser.email;
      setInitials(email.slice(0, 2).toUpperCase());
    }
  }, [infoUser]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xxl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./img/logo.png" className="h-8" alt="Logo" />
        </a>

        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            type="button"
          >
            <span className="sr-only">Open user menu</span>
            <div className="w-10 h-10 flex items-center justify-center bg-red-400 rounded-full text-white font-bold">
              {initials}
            </div>
          </button>

          {isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>
                  <Tooltip title={infoUser?.email}>
                    <span>
                      {infoUser?.email
                        ? infoUser.email.length > 18
                          ? infoUser.email.substring(0, 18) + "..."
                          : infoUser.email
                        : ""}
                    </span>
                  </Tooltip>
                </div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <NavLink
                    to="/auth/login"
                    onClick={() => localStorage.clear()}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
