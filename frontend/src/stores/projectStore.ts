import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useActivityStore } from "./activityStore";
import { useTaskStore } from "./taskStore";

export interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
}

interface ProjectStore {
  projects: Project[];
  addProject: (project: Omit<Project, "id" | "status" | "progress">) => void;
  updateProject: (
    projectId: number,
    project: Pick<Project, "title" | "description">
  ) => void;
  deleteProject: (projectId: number) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [
        {
          id: 1,
          title: "DevRadar",
          description: "개발자 생산성 관리 플랫폼",
          status: "IN_PROGRESS",
          progress: 35,
        },
        {
          id: 2,
          title: "Portfolio Website",
          description: "개인 포트폴리오 웹사이트",
          status: "PLANNING",
          progress: 10,
        },
        {
          id: 3,
          title: "Study Tracker",
          description: "학습 기록 관리 서비스",
          status: "COMPLETED",
          progress: 100,
        },
      ],

      addProject: (project) => {
        set((state) => ({
          projects: [
            {
              id: Date.now(),
              title: project.title,
              description: project.description,
              status: "PLANNING",
              progress: 0,
            },
            ...state.projects,
          ],
        }));

        useActivityStore
          .getState()
          .addActivity(
            "PROJECT",
            "프로젝트 생성",
            `${project.title} 프로젝트가 생성되었습니다.`
          );
      },

      updateProject: (projectId, project) => {
        const targetProject = get().projects.find(
          (item) => item.id === projectId
        );

        if (!targetProject) {
          return;
        }

        set((state) => ({
          projects: state.projects.map((item) =>
            item.id === projectId
              ? {
                  ...item,
                  title: project.title,
                  description: project.description,
                }
              : item
          ),
        }));

        useActivityStore
          .getState()
          .addActivity(
            "PROJECT",
            "프로젝트 수정",
            `${project.title} 프로젝트가 수정되었습니다.`
          );
      },

      deleteProject: (projectId) => {
        const targetProject = get().projects.find(
          (project) => project.id === projectId
        );

        if (!targetProject) {
          return;
        }

        set((state) => ({
          projects: state.projects.filter(
            (project) => project.id !== projectId
          ),
        }));

        useTaskStore.getState().deleteTasksByProjectId(projectId);

        useActivityStore
          .getState()
          .addActivity(
            "PROJECT",
            "프로젝트 삭제",
            `${targetProject.title} 프로젝트가 삭제되었습니다.`
          );
      },
    }),
    {
      name: "devradar-project-store",
    }
  )
);