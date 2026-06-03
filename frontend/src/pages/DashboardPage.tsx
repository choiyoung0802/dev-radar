import { useState } from "react";
import SummaryCard from "../components/dashboard/SummaryCard";

export default function DashboardPage() {
  const [projectCount, setProjectCount] = useState(0);
  const [projectName, setProjectName] = useState("");

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      title: "프로젝트 생성",
      description: "DevRadar 프로젝트가 생성되었습니다.",
    },
    {
      id: 2,
      title: "작업 추가",
      description: "첫 번째 작업이 등록되었습니다.",
    },
    {
      id: 3,
      title: "GitHub 연동",
      description: "GitHub 계정 연동을 준비 중입니다.",
    },
  ]);

  const summaryCards = [
    {
      title: "Projects",
      value: projectCount,
      description: "진행 중인 프로젝트",
      icon: "📁",
    },
    {
      title: "Tasks",
      value: 0,
      description: "등록된 작업",
      icon: "📋",
    },
    {
      title: "Commits",
      value: 0,
      description: "GitHub 커밋",
      icon: "💻",
    },
  ];

  const handleAddProject = () => {
    if (!projectName.trim()) {
      return;
    }

    const newProjectCount = projectCount + 1;

    const newActivity = {
      id: Date.now(),
      title: "프로젝트 생성",
      description: `${projectName} 프로젝트가 생성되었습니다.`,
    };

    setProjectCount(newProjectCount);
    setRecentActivities([newActivity, ...recentActivities].slice(0, 5));
    setProjectName("");
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

        <p className="mt-2 text-sm text-gray-500">
          DevRadar에서 프로젝트와 작업 현황을 한눈에 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <SummaryCard
            key={card.title}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          Quick Project
        </h3>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            placeholder="프로젝트명을 입력하세요"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-600"
          />

          <button
            onClick={handleAddProject}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            프로젝트 추가
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          현재 프로젝트 수: {projectCount}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          Recent Activity
        </h3>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="border-b border-gray-100 py-4 last:border-b-0"
            >
              <p className="font-semibold text-gray-900">{activity.title}</p>

              <p className="mt-1 text-sm text-gray-500">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}