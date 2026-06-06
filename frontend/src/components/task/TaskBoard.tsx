import { useState } from "react";
import { useTaskStore } from "../../stores/taskStore";

interface TaskBoardProps {
  projectId: number;
}

const columns = [
  {
    title: "TODO",
    status: "TODO",
  },
  {
    title: "IN PROGRESS",
    status: "IN_PROGRESS",
  },
  {
    title: "DONE",
    status: "DONE",
  },
];

const statusOptions = ["ALL", "TODO", "IN_PROGRESS", "DONE"];
const priorityOptions = ["ALL", "LOW", "MEDIUM", "HIGH"];

export default function TaskBoard({ projectId }: TaskBoardProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("MEDIUM");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedPriority, setSelectedPriority] = useState("ALL");

  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const moveTask = useTaskStore((state) => state.moveTask);

  const projectTasks = tasks.filter((task) => task.projectId === projectId);

  const filteredTasks = projectTasks.filter((task) => {
    const keyword = searchKeyword.toLowerCase();

    const matchesKeyword =
      task.title.toLowerCase().includes(keyword) ||
      task.description.toLowerCase().includes(keyword);

    const matchesStatus =
      selectedStatus === "ALL" || task.status === selectedStatus;

    const matchesPriority =
      selectedPriority === "ALL" || task.priority === selectedPriority;

    return matchesKeyword && matchesStatus && matchesPriority;
  });

  const handleAddTask = () => {
    if (!taskTitle.trim()) {
      return;
    }

    addTask({
      projectId,
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
    });

    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("MEDIUM");
  };

  const handleStartEdit = (taskId: number) => {
    const targetTask = tasks.find((task) => task.id === taskId);

    if (!targetTask) {
      return;
    }

    setEditingTaskId(taskId);
    setTaskTitle(targetTask.title);
    setTaskDescription(targetTask.description);
    setTaskPriority(targetTask.priority);
  };

  const handleUpdateTask = () => {
    if (!editingTaskId || !taskTitle.trim()) {
      return;
    }

    updateTask(editingTaskId, {
      title: taskTitle,
      description: taskDescription,
    });

    setEditingTaskId(null);
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("MEDIUM");
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("MEDIUM");
  };

  const getPriorityClassName = (priority: string) => {
    if (priority === "HIGH") {
      return "bg-red-50 text-red-600";
    }

    if (priority === "MEDIUM") {
      return "bg-yellow-50 text-yellow-600";
    }

    return "bg-green-50 text-green-600";
  };

  return (
    <div className="mt-8">
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          {editingTaskId ? "Edit Task" : "Create Task"}
        </h3>

        <div className="space-y-4">
          <input
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            placeholder="Task Title"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
          />

          <textarea
            value={taskDescription}
            onChange={(event) => setTaskDescription(event.target.value)}
            placeholder="Task Description"
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
          />

          <select
            value={taskPriority}
            onChange={(event) => setTaskPriority(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>

          <div className="flex gap-2">
            {editingTaskId ? (
              <>
                <button
                  onClick={handleUpdateTask}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Update Task
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
                onClick={handleAddTask}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Add Task
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">Task Board</h3>

        <p className="mt-2 text-sm text-gray-500">
          프로젝트 작업을 상태별로 확인하세요.
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="space-y-4">
          <input
            value={searchKeyword}
            onChange={(event) => setSearchKeyword(event.target.value)}
            placeholder="작업 제목 또는 설명으로 검색"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
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

          <div className="flex flex-wrap gap-2">
            {priorityOptions.map((priority) => (
              <button
                key={priority}
                onClick={() => setSelectedPriority(priority)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  selectedPriority === priority
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
                ].join(" ")}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter(
            (task) => task.status === column.status
          );

          return (
            <div
              key={column.status}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-bold text-gray-900">
                  {column.title}
                </h4>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  {columnTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <h5 className="font-semibold text-gray-900">
                        {task.title}
                      </h5>

                      <span
                        className={[
                          "rounded-full px-2 py-1 text-xs font-semibold",
                          getPriorityClassName(task.priority),
                        ].join(" ")}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p className="mb-4 text-sm text-gray-500">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {task.status === "TODO" && (
                        <button
                          onClick={() => moveTask(task.id, "IN_PROGRESS")}
                          className="rounded bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700"
                        >
                          진행중
                        </button>
                      )}

                      {task.status === "IN_PROGRESS" && (
                        <button
                          onClick={() => moveTask(task.id, "DONE")}
                          className="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                        >
                          완료
                        </button>
                      )}

                      <button
                        onClick={() => handleStartEdit(task.id)}
                        className="rounded bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        수정
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="rounded bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">
                    작업이 없습니다.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}