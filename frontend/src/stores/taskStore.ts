import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useActivityStore } from "./activityStore";

export interface Task {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "status">) => void;
  updateTask: (
    taskId: number,
    task: Pick<Task, "title" | "description">
  ) => void;
  deleteTask: (taskId: number) => void;
  deleteTasksByProjectId: (projectId: number) => void;
  moveTask: (taskId: number, nextStatus: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: 1,
          projectId: 1,
          title: "요구사항 정의서 작성",
          description: "DevRadar 요구사항 정의서 정리",
          status: "TODO",
          priority: "HIGH",
        },
        {
          id: 2,
          projectId: 1,
          title: "Dashboard UI 개발",
          description: "요약 카드와 최근 활동 영역 구현",
          status: "IN_PROGRESS",
          priority: "MEDIUM",
        },
        {
          id: 3,
          projectId: 1,
          title: "프로젝트 초기 세팅",
          description: "React, TypeScript, Vite, Tailwind 설정",
          status: "DONE",
          priority: "HIGH",
        },
      ],

      addTask: (task) => {
        const newTask: Task = {
          id: Date.now(),
          projectId: task.projectId,
          title: task.title,
          description: task.description,
          status: "TODO",
          priority: task.priority,
        };

        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));

        useActivityStore
          .getState()
          .addActivity(
            "TASK",
            "작업 생성",
            `${task.title} 작업이 생성되었습니다.`
          );
      },

      updateTask: (taskId, task) => {
        const targetTask = get().tasks.find((item) => item.id === taskId);

        if (!targetTask) {
          return;
        }

        set((state) => ({
          tasks: state.tasks.map((item) =>
            item.id === taskId
              ? {
                  ...item,
                  title: task.title,
                  description: task.description,
                }
              : item
          ),
        }));

        useActivityStore
          .getState()
          .addActivity(
            "TASK",
            "작업 수정",
            `${task.title} 작업이 수정되었습니다.`
          );
      },

      deleteTask: (taskId) => {
        const targetTask = get().tasks.find((task) => task.id === taskId);

        if (!targetTask) {
          return;
        }

        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));

        useActivityStore
          .getState()
          .addActivity(
            "TASK",
            "작업 삭제",
            `${targetTask.title} 작업이 삭제되었습니다.`
          );
      },

      deleteTasksByProjectId: (projectId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.projectId !== projectId),
        }));
      },

      moveTask: (taskId, nextStatus) => {
        const targetTask = get().tasks.find((task) => task.id === taskId);

        if (!targetTask) {
          return;
        }

        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: nextStatus,
                }
              : task
          ),
        }));

        useActivityStore
          .getState()
          .addActivity(
            "TASK",
            "작업 상태 변경",
            `${targetTask.title} 작업이 ${nextStatus} 상태로 변경되었습니다.`
          );
      },
    }),
    {
      name: "devradar-task-store",
    }
  )
);