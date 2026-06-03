import { useState } from "react";
import ProjectCard from "../components/project/ProjectCard";

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  progress: number;
}

export default function ProjectListPage() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] =
    useState("");

  const [projects, setProjects] = useState<Project[]>([
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
  ]);

  const handleAddProject = () => {
    if (!projectTitle.trim()) {
      return;
    }

    const newProject: Project = {
      id: Date.now(),
      title: projectTitle,
      description: projectDescription,
      status: "PLANNING",
      progress: 0,
    };

    setProjects([newProject, ...projects]);

    setProjectTitle("");
    setProjectDescription("");
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Projects
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          DevRadar에서 관리 중인 프로젝트를 확인하세요.
        </p>
      </div>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          Create Project
        </h3>

        <div className="space-y-4">
          <input
            value={projectTitle}
            onChange={(event) =>
              setProjectTitle(event.target.value)
            }
            placeholder="Project Title"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
          />

          <textarea
            value={projectDescription}
            onChange={(event) =>
              setProjectDescription(
                event.target.value
              )
            }
            placeholder="Project Description"
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
          />

          <button
            onClick={handleAddProject}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Create Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            status={project.status}
            progress={project.progress}
          />
        ))}
      </div>
    </div>
  );
}