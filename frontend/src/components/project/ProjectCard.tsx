import { Link } from "react-router-dom";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
}

export default function ProjectCard({
  id,
  title,
  description,
  status,
  progress,
}: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${id}`}
      className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>

          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          {status}
        </span>
      </div>

      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500">Progress</span>

          <span className="font-medium text-gray-900">{progress}%</span>
        </div>

        <div className="h-2 rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Link>
  );
}