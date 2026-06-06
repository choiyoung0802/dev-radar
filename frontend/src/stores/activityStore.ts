import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Activity {
  id: number;
  type: string;
  title: string;
  description: string;
  createdAt: string;
}

interface ActivityStore {
  activities: Activity[];
  addActivity: (
    type: string,
    title: string,
    description: string
  ) => void;
}

export const useActivityStore = create<ActivityStore>()(
  persist(
    (set) => ({
      activities: [
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
          description:
            "Dashboard UI 작업이 등록되었습니다.",
          createdAt: "2026-06-03 15:35",
        },
      ],

      addActivity: (
        type,
        title,
        description
      ) =>
        set((state) => ({
          activities: [
            {
              id: Date.now(),
              type,
              title,
              description,
              createdAt:
                new Date().toLocaleString(),
            },
            ...state.activities,
          ],
        })),
    }),
    {
      name: "devradar-activity-store",
    }
  )
);