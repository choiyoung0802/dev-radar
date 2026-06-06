import { Link, useParams } from "react-router-dom";
import TaskBoard from "../components/task/TaskBoard";
import { useProjectStore } from "../stores/projectStore";

export default function BoardPage() {
  const { projectId } = useParams();

  const projects = useProjectStore((state) => state.projects);

  const currentProjectId = Number(projectId);

  const project = projects.find((item) => item.id === currentProjectId);

  if (!project) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          프로젝트를 찾을 수 없습니다.
        </h2>

        <Link
          to="/projects"
          className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          프로젝트 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          to={`/projects/${project.id}`}
          className="mb-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          ← Back to Project Detail
        </Link>

        <h2 className="text-2xl font-bold text-gray-900">
          {project.title} Board
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {project.description}
        </p>
      </div>

      <TaskBoard projectId={project.id} />
    </div>
  );
}