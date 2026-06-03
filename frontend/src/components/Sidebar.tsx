import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Activity", path: "/activity" },
  { label: "My Page", path: "/mypage" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <nav className="flex flex-col p-4 gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                "rounded-lg px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}