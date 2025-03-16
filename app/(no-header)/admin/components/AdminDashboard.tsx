import { useState } from "react";
import SectionContentSetting from "./SectionContentSetting";
import SectionSetting from "./SectionSetting";

const AdminDashboard = () => {
  // Define menu items and associated content
  const menuItems = [
    { id: "dashboard", label: "Dashboard", content: <DashboardContent /> },
    {
      id: "home-sections",
      label: "Home Sections",
      content: <ManageHomeSection />,
    },
    {
      id: "section-settings",
      label: "Section Setting",
      content: <ManagePostsContent />,
    },
    { id: "settings", label: "Settings", content: <SettingsContent /> },
  ];

  const [activeMenu, setActiveMenu] = useState<string>("home-sections"); // Track active menu

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Menu */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 font-bold text-lg">Admin Dashboard</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`cursor-pointer p-3 ${
                  activeMenu === item.id ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-white shadow-md overflow-y-auto">
        {menuItems.find((item) => item.id === activeMenu)?.content}
      </div>
    </div>
  );
};

// Components for different menu content
const DashboardContent = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
    <p>This is the main dashboard content.</p>
  </div>
);

const ManagePostsContent = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Manage Section's Collection</h1>
    <SectionContentSetting />
  </div>
);

const ManageHomeSection = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Manage Home Section</h1>
    <SectionSetting />
  </div>
);

const SettingsContent = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Settings</h1>
    <p>Here you can adjust your settings.</p>
  </div>
);

export default AdminDashboard;
