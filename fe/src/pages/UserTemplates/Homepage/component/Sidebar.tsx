import {
  BarChartOutlined,
  TeamOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="md:hidden p-4 bg-gray-800">
        <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
          <MenuOutlined className="text-xl" />
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden backdrop-blur-xs bg-black/10 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`bg-gray-800 text-white border-r border-gray-700 w-64 min-h-screen p-4
          fixed z-40 top-0 left-0 transition-transform duration-300 ease-in-out
          md:static md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="flex flex-col space-y-2 mt-16 md:mt-0">
          <button
            onClick={() => navigate("/")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition 
              ${
                isActive("/")
                  ? "bg-gray-700 border-l-4 border-red-400 pl-4 text-red-400 font-semibold"
                  : "hover:text-red-400"
              }`}
          >
            <BarChartOutlined />
            <span>Boards</span>
          </button>

          <button
            onClick={() => navigate("/members")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition 
              ${
                isActive("/members")
                  ? "bg-gray-700 border-l-4 border-red-400 pl-4 text-red-400 font-semibold"
                  : "hover:text-red-400"
              }`}
          >
            <TeamOutlined />
            <span>All Members</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
