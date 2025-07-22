import {
  TeamOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface SidebarProps {
  boardDetail: any;
}

const Sidebar: React.FC<SidebarProps> = ({ boardDetail }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const isActive = (path: string): boolean => location.pathname === path;
  const [showMembers, setShowMembers] = useState<boolean>(false);

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
          <div className="w-full">
            <button
              onClick={() => setShowMembers(!showMembers)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition ${
                isActive("/members")
                  ? "bg-gray-700 border-l-4 border-red-400 pl-4 text-red-400 font-semibold"
                  : "hover:text-red-400"
              }`}
            >
              <span className="flex items-center space-x-2">
                <span>{boardDetail?.name}</span>
              </span>
              <span>{showMembers ? "-" : "+"}</span>
            </button>

            {showMembers && (
              <>
                <span className="flex items-center space-x-2 pl-5 my-2">
                  <TeamOutlined />
                  <span>Members</span>
                </span>
                <div className="pl-8 mt-5 space-y-2">
                  <ul className="space-y-1">
                    {/* {members.map((member: any) => (
              <li
                key={member.id}
                className="text-sm text-gray-300 flex items-center space-x-2"
              >
                <img
                  src={member.avatar || "/default-avatar.png"}
                  alt={member.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{member.name}</span>
              </li>
            ))} */}
                    <li className="text-sm text-gray-300 flex items-center space-x-2">
                      <img
                        src="/img/default-avatar.jpg"
                        className="w-6 h-6 rounded-full"
                      />
                      <span>abc</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
