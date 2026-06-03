import { useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
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

export default function TaskBoard() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "요구사항 정의서 작성",
      description: "DevRadar 요구사항 정의서 정리",
      status: "TODO",
      priority: "HIGH",
    },
    {
      id: 2,
      title: "Dashboard UI 개발",
      description: "요약 카드와 최근 활동 영역 구현",
      status: "IN_PROGRESS",
      priority: "MEDIUM",
    },
    {
      id: 3,
      title: "프로젝트 초기 세팅",
      description: "React, TypeScript, Vite, Tailwind 설정",
      status: "DONE",
      priority: "HIGH",
    },
  ]);

  const handleAddTask = () => {
    if (!taskTitle.trim()) {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      status: "TODO",
      priority: "MEDIUM",
    };

    setTasks([newTask, ...tasks]);

    setTaskTitle("");
    setTaskDescription("");
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleMoveTask = (
    taskId: number,
    nextStatus: string
  ) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: nextStatus,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <div className="mt-8">
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          Create Task
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
            onChange={(event) =>
              setTaskDescription(event.target.value)
            }
            placeholder="Task Description"
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-600"
          />

          <button
            onClick={handleAddTask}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">
          Task Board
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          프로젝트 작업을 상태별로 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
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

                      <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        {task.priority}
                      </span>
                    </div>

                    <p className="mb-4 text-sm text-gray-500">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {task.status === "TODO" && (
                        <button
                          onClick={() =>
                            handleMoveTask(
                              task.id,
                              "IN_PROGRESS"
                            )
                          }
                          className="rounded bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700"
                        >
                          진행중
                        </button>
                      )}

                      {task.status === "IN_PROGRESS" && (
                        <button
                          onClick={() =>
                            handleMoveTask(
                              task.id,
                              "DONE"
                            )
                          }
                          className="rounded bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                        >
                          완료
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleDeleteTask(task.id)
                        }
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