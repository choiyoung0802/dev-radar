import { Link } from "react-router-dom";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
  onEdit: (projectId: number) => void;
  onDelete: (projectId: number) => void;
}

export default function ProjectCard({
  id,
  title,
  description,
  status,
  progress,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onEdit(id);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onDelete(id);
  };

  return (
    <Link
      to={`/projects/${id}`}
      className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
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

      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={handleEditClick}
          className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200"
        >
          수정
        </button>

        <button
          onClick={handleDeleteClick}
          className="rounded-lg bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
        >
          삭제
        </button>
      </div>
    </Link>
  );
}