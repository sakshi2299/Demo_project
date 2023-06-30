import React, { useState } from 'react';
import { Task } from '../utils/Tasks';
import { Card, CardContent, Typography, Button, TextField, Grid } from '@mui/material';

interface TaskListProps {
  tasks: Task[];
  updateTask: (taskId: number, updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTask, deleteTask }) => {
  const [updatedTitles, setUpdatedTitles] = useState<{ [taskId: number]: string }>({});
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const handleEditClick = (taskId: number) => {
    setEditTaskId(taskId);
    setUpdatedTitles(prevState => ({ ...prevState, [taskId]: tasks.find(task => task.id === taskId)?.title || '' }));
  };

  const handleCancelClick = () => {
    setEditTaskId(null);
    setUpdatedTitles({});
  };

  const handleUpdateClick = (taskId: number) => {
    const updatedTitle = updatedTitles[taskId] || '';
    updateTask(taskId, { ...tasks.find(task => task.id === taskId)!, title: updatedTitle });
    setEditTaskId(null);
    setUpdatedTitles({});
  };

  const handleTitleChange = (taskId: number, value: string) => {
    setUpdatedTitles(prevState => ({ ...prevState, [taskId]: value }));
  };

  return (
    <div>
      {tasks.map(task => (
        <Card key={task.id} variant="outlined" sx={{ my: 2 }}>
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="subtitle1">Status: {task.status}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateTask(task.id, { ...task, status: 'Completed' })}
            >
              Complete
            </Button>
            <Button variant="contained" color="error" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
            {editTaskId === task.id ? (
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Update task"
                    value={updatedTitles[task.id] || ''}
                    onChange={e => handleTitleChange(task.id, e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" color="primary" onClick={() => handleUpdateClick(task.id)}>
                    Update
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Button variant="contained" onClick={() => handleEditClick(task.id)}>
                Edit
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
