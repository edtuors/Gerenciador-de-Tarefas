import React from 'react';
import Button from '@mui/material/Button';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onDelete, onEdit }) => {
  return (
    <li className="flex justify-between items-center p-2 mb-2 bg-white rounded shadow-sm">
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        className="flex-1"
      >
        {task.title}
      </span>
      <div className="space-x-2">
        <Button
          variant="outlined"
          color={task.completed ? 'secondary' : 'primary'}
          onClick={() => onComplete(task.id)}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </Button>
        <Button variant="contained" color="error" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
        <Button variant="outlined" onClick={() => onEdit(task)}>
          Edit
        </Button>
      </div>
    </li>
  );
};

export default TaskItem;
