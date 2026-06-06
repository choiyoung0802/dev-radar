import { useState } from "react";
import ProjectCard from "../components/project/ProjectCard";
import { useProjectStore } from "../stores/projectStore";
import { useTaskStore } from "../stores/taskStore";

const statusOptions = ["ALL", "PLANNING", "IN_PROGRESS", "COMPLETED"];

export default function ProjectListPage() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const projects = useProjectStore((state) => state.projects);
  const addProject = useProjectStore((state) => state.addProject);
  const updateProject = useProjectStore((state) => state.updateProject);
  const deleteProject = useProjectStore((state) => state.deleteProject);

  const tasks = useTaskStore((state) => state.tasks);

  const getProjectProgress = (projectId: number) => {
    const projectTasks = tasks.filter((task) => task.projectId === projectId);

    if (projectTasks.length === 0) {
      return 0;
    }

    const doneTasks = projectTasks.filter((task) => task.status === "DONE");

    return Math.round((doneTasks.length / projectTasks.length) * 100);
  };

  const getProjectStatus = (progress: number) => {
    if (progress === 0) {
      return "PLANNING";
    }

    if (progress === 100) {
      return "COMPLETED";
    }

    return "IN_PROGRESS";
  };

  const filteredProjects = projects.filter((project) => {
    const keyword = searchKeyword.toLowerCase();
    const progress = getProjectProgress(project.id);
    const status = getProjectStatus(progress);

    const matchesKeyword =
      project.title.toLowerCase().includes(keyword) ||
      project.description.toLowerCase().includes(keyword);

    const matchesStatus =
      selectedStatus === "ALL" || status === selectedStatus;

    return matchesKeyword && matchesStatus;
  });

  const handleAddProject = () => {
    if (!projectTitle.trim()) {
      return;
    }

    addProject({
      title: projectTitle,
      description: projectDescription,
    });

    setProjectTitle("");
    setProjectDescription("");
  };

  const handleStartEdit = (projectId: number) => {
    const targetProject = projects.find((project) => project.id === projectId);

    if (!targetProject) {
      return;
    }

    setEditingProjectId(projectId);
    setProjectTitle(targetProject.title);
    setProjectDescription(targetProject.description);
  };

  const handleUpdateProject = () => {
    if (!editingProjectId || !projectTitle.trim()) {
      return;
    }

    updateProject(editingProjectId, {
      title: projectTitle,
      description: projectDescription,
    });

    setEditingProjectId(null);
    setProjectTitle("");
    setProjectDescription("");
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setProjectTitle("");
    setProjectDescription("");
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>

        <p className="mt-2 text-sm text-gray-500">
          DevRadar에서 관리 중인 프로젝트를 확인하세요.
        </p>
      </div>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          {editingProjectId ? "Edit Project" : "Create Project"}
        </h3>

        <div className="space-y-4">
          <input
            value={projectTitle}
            onChange={(event) => setProjectTitle(event.target.value)}
            placeholder="Project Title"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
          />

          <textarea
            value={projectDescription}
            onChange={(event) => setProjectDescription(event.target.value)}
            placeholder="Project Description"
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
          />

          <div className="flex gap-2">
            {editingProjectId ? (
              <>
                <button
                  onClick={handleUpdateProject}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Update Project
                </button>

                <button
                  onClick={handleCancelEdit}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAddProject}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Create Project
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4">
        <input
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          placeholder="프로젝트명 또는 설명으로 검색"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
        />

        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition",
                selectedStatus === status
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
              ].join(" ")}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {filteredProjects.map((project) => {
          const progress = getProjectProgress(project.id);

          return (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              status={getProjectStatus(progress)}
              progress={progress}
              onEdit={handleStartEdit}
              onDelete={deleteProject}
            />
          );
        })}

        {filteredProjects.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-400">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}