import React, { useState } from "react";

export function TaskListView({ category, onAddTaskList, onAddTask }: {
  category: {
    id: number;
    name: string;
    taskLists: Array<{ id: number; name: string; tasks: Array<{ id: number; title: string }> }>;
  };
  onAddTaskList: (categoryId: number, name: string) => void;
  onAddTask: (taskListId: number, title: string) => void;
}) {
  const [newTaskListName, setNewTaskListName] = useState("");

  const handleAddTaskList = () => {
    if (newTaskListName.trim()) {
      onAddTaskList(category.id, newTaskListName.trim());
      setNewTaskListName("");
    }
  };

  return (
    <div className="task-lists w-[80%] p-4">
      <h1 className="text-xl font-bold">{category.name}</h1>
      {category.taskLists.map((taskList) => (
        <div key={taskList.id} className="task-list p-4 border rounded-lg mb-4">
          <h2 className="text-lg font-semibold">{taskList.name}</h2>
          <button
            className="bg-green-500 text-white p-1 rounded mt-2"
            onClick={() => onAddTask(taskList.id, `New Task ${Date.now()}`)}
          >
            Add task
          </button>
          <div className="tasks mt-2">
            {taskList.tasks.map((task) => (
              <div key={task.id} className="task p-2 border-b">
                <h3>{task.title}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-4">
        <input
          type="text"
          className="border p-1 w-full"
          value={newTaskListName}
          onChange={(e) => setNewTaskListName(e.target.value)}
          placeholder="New Task List Name"
        />
        <button
          className="mt-2 bg-blue-500 text-white p-1 rounded"
          onClick={handleAddTaskList}
        >
          Add task list
        </button>
      </div>
    </div>
  );
}

