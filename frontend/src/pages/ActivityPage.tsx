import { useState } from "react";

const activities = [
  {
    id: 1,
    type: "PROJECT",
    title: "프로젝트 생성",
    description: "DevRadar 프로젝트가 생성되었습니다.",
    createdAt: "2026-06-03 15:20",
  },
  {
    id: 2,
    type: "TASK",
    title: "작업 추가",
    description: "Dashboard UI 작업이 등록되었습니다.",
    createdAt: "2026-06-03 15:35",
  },
  {
    id: 3,
    type: "GITHUB",
    title: "GitHub 연동 준비",
    description: "GitHub Repository 연동 기능을 준비 중입니다.",
    createdAt: "2026-06-03 15:50",
  },
  {
    id: 4,
    type: "PROJECT",
    title: "프로젝트 수정",
    description: "프로젝트 상태가 IN_PROGRESS로 변경되었습니다.",
    createdAt: "2026-06-03 16:10",
  },
];

const filterOptions = ["ALL", "PROJECT", "TASK", "GITHUB"];

export default function ActivityPage() {
  const [selectedType, setSelectedType] = useState("ALL");

  const filteredActivities =
    selectedType === "ALL"
      ? activities
      : activities.filter((activity) => activity.type === selectedType);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Activity</h2>

        <p className="mt-2 text-sm text-gray-500">
          DevRadar에서 발생한 프로젝트, 작업, GitHub 활동을 확인하세요.
        </p>
      </div>

      <div className="mb-6 flex gap-2">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedType(option)}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition",
              selectedType === option
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50",
            ].join(" ")}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="border-b border-gray-100 p-6 last:border-b-0"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {activity.type}
                </span>

                <h3 className="mt-3 text-lg font-bold text-gray-900">
                  {activity.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {activity.description}
                </p>
              </div>

              <p className="text-sm text-gray-400">
                {activity.createdAt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}