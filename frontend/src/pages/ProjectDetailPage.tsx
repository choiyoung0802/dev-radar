import { Link, useParams } from "react-router-dom";
import TaskBoard from "../components/task/TaskBoard";

const projects = [
  {
    id: 1,
    title: "DevRadar",
    description: "개발자 생산성 관리 플랫폼",
    status: "IN_PROGRESS",
    progress: 35,
    startDate: "2026-06-03",
    endDate: "2026-08-31",
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "개인 포트폴리오 웹사이트",
    status: "PLANNING",
    progress: 10,
    startDate: "2026-06-10",
    endDate: "2026-07-15",
  },
  {
    id: 3,
    title: "Study Tracker",
    description: "학습 기록 관리 서비스",
    status: "COMPLETED",
    progress: 100,
    startDate: "2026-05-01",
    endDate: "2026-05-31",
  },
];

export default function ProjectDetailPage() {
  const { projectId } = useParams();

  const project = projects.find(
    (item) => item.id === Number(projectId)
  );

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
            {project.progress}%
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Period</p>
          <p className="mt-3 text-xl font-bold text-gray-900">
            {project.startDate} ~ {project.endDate}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500">Project Progress</span>

          <span className="font-medium text-gray-900">
            {project.progress}%
          </span>
        </div>

        <div className="h-3 rounded-full bg-gray-100">
          <div
            className="h-3 rounded-full bg-blue-600"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <TaskBoard />
    </div>
  );
}