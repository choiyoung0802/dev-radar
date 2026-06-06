import { useState } from "react";
import { useActivityStore } from "../stores/activityStore";

const filterOptions = ["ALL", "PROJECT", "TASK", "GITHUB"];

export default function ActivityPage() {
  const [selectedType, setSelectedType] = useState("ALL");
  const [searchKeyword, setSearchKeyword] = useState("");

  const activities = useActivityStore((state) => state.activities);

  const filteredActivities = activities.filter((activity) => {
    const matchesType =
      selectedType === "ALL" || activity.type === selectedType;

    const keyword = searchKeyword.toLowerCase();

    const matchesKeyword =
      activity.title.toLowerCase().includes(keyword) ||
      activity.description.toLowerCase().includes(keyword);

    return matchesType && matchesKeyword;
  });

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Activity</h2>

        <p className="mt-2 text-sm text-gray-500">
          DevRadar에서 발생한 프로젝트, 작업, GitHub 활동을 확인하세요.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <div className="flex gap-2">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedType(option)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition",
                selectedType === option
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
              ].join(" ")}
            >
              {option}
            </button>
          ))}
        </div>

        <input
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          placeholder="활동 제목 또는 설명으로 검색"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="border-b border-gray-100 p-6 last:border-b-0"
          >
            <div className="flex items-center justify-between gap-6">
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

              <p className="shrink-0 text-sm text-gray-400">
                {activity.createdAt}
              </p>
            </div>
          </div>
        ))}

        {filteredActivities.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-400">
            표시할 활동이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}