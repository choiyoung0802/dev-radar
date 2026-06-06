import { Link, useParams } from "react-router-dom";
import TaskBoard from "../components/task/TaskBoard";
import { useProjectStore } from "../stores/projectStore";
import { useTaskStore } from "../stores/taskStore";

export default function ProjectDetailPage() {
  const { projectId } = useParams();

  const projects = useProjectStore((state) => state.projects);
  const tasks = useTaskStore((state) => state.tasks);

  const currentProjectId = Number(projectId);

  const project = projects.find((item) => item.id === currentProjectId);

  const projectTasks = tasks.filter(
    (task) => task.projectId === currentProjectId
  );

  const doneTasks = projectTasks.filter((task) => task.status === "DONE");

  const progress =
    projectTasks.length === 0
      ? 0
      : Math.round((doneTasks.length / projectTasks.length) * 100);

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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            to="/projects"
            className="mb-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Projects
          </Link>

          <h2 className="text-2xl font-bold text-gray-900">
            {project.title}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {project.description}
          </p>
        </div>

        <Link
          to={`/projects/${project.id}/board`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Open Board
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Status</p>
          <p className="mt-3 text-xl font-bold text-gray-900">
            {project.status}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Progress</p>
          <p className="mt-3 text-xl font-bold text-gray-900">
            {progress}%
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Tasks</p>
          <p className="mt-3 text-xl font-bold text-gray-900">
            {doneTasks.length} / {projectTasks.length}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500">Project Progress</span>

          <span className="font-medium text-gray-900">{progress}%</span>
        </div>

        <div className="h-3 rounded-full bg-gray-100">
          <div
            className="h-3 rounded-full bg-blue-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <TaskBoard projectId={project.id} />
    </div>
  );
}