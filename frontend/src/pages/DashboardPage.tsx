import SummaryCard from "../components/dashboard/SummaryCard";
import { useActivityStore } from "../stores/activityStore";
import { useProjectStore } from "../stores/projectStore";
import { useTaskStore } from "../stores/taskStore";

export default function DashboardPage() {
  const projects = useProjectStore((state) => state.projects);
  const tasks = useTaskStore((state) => state.tasks);
  const activities = useActivityStore((state) => state.activities);

  const completedTasks = tasks.filter((task) => task.status === "DONE");

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks.length / tasks.length) * 100);

  const summaryCards = [
    {
      title: "Projects",
      value: projects.length,
      description: "관리 중인 프로젝트",
      icon: "📁",
    },
    {
      title: "Tasks",
      value: tasks.length,
      description: "전체 작업 수",
      icon: "📋",
    },
    {
      title: "Completed",
      value: completedTasks.length,
      description: "완료된 작업",
      icon: "✅",
    },
    {
      title: "Completion Rate",
      value: completionRate,
      description: "전체 작업 완료율",
      icon: "📈",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

        <p className="mt-2 text-sm text-gray-500">
          DevRadar에서 프로젝트와 작업 현황을 한눈에 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium text-gray-700">
            Overall Task Completion
          </span>

          <span className="font-semibold text-gray-900">
            {completionRate}%
          </span>
        </div>

        <div className="h-3 rounded-full bg-gray-100">
          <div
            className="h-3 rounded-full bg-blue-600"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          Recent Activity
        </h3>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {activities.slice(0, 5).map((activity) => (
            <div
              key={activity.id}
              className="border-b border-gray-100 py-4 last:border-b-0"
            >
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="font-semibold text-gray-900">
                    {activity.title}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {activity.description}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-gray-400">
                  {activity.createdAt}
                </span>
              </div>
            </div>
          ))}

          {activities.length === 0 && (
            <div className="py-8 text-center text-sm text-gray-400">
              활동 내역이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}