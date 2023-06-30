import React, { useState } from 'react';
import { Task } from '../utils/Tasks';
import { TextField, Button, Grid } from '@mui/material';

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
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={9}>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter task title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            Add Task
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskForm;
