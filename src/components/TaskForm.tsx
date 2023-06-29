import React, { useState } from 'react';
import { Task } from '../utils/tasks';

interface TaskFormProps {
  createTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ createTask }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        title,
        status: 'Pending',
      };
      createTask(newTask);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
