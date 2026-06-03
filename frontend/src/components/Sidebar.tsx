import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <nav className="flex flex-col p-4 gap-2">
        <Link to="/">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/activity">Activity</Link>
        <Link to="/mypage">My Page</Link>
      </nav>
    </aside>
  );
}