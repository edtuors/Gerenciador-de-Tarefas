import React, { useState, useEffect } from 'react';
import { Task } from './types';
import TaskItem from './components/taskItem';
import './App.css';

const App: React.FC = () => {
  // Estado e funções do aplicativo
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  // Sincronização com localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskItem: Task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
    };
    setTasks([...tasks, newTaskItem]);
    setNewTask('');
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
    setNewTitle(task.title);
  };

  const saveEdit = () => {
    if (editingTask) {
      setTasks(tasks.map((task) =>
        task.id === editingTask.id ? { ...task, title: newTitle.trim() } : task
      ));
      setEditingTask(null);
      setNewTitle('');
    }
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      {/* Estatísticas */}
      <div className="stats">
        <p>Total: {tasks.length}</p>
        <p>Completed: {tasks.filter((task) => task.completed).length}</p>
        <p>Pending: {tasks.filter((task) => !task.completed).length}</p>
      </div>

      {/* Filtros */}
      <div className="filters">
        <button
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
      </div>

      {/* Entrada de nova tarefa */}
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button className="primary" onClick={addTask}>
          Add Task
        </button>
      </div>

      {/* Lista de tarefas */}
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={toggleTaskCompletion}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))}
      </ul>

      {/* Botão para limpar tarefas completas */}
      <button className="secondary" onClick={clearCompletedTasks}>
        Clear Completed
      </button>
    </div>
  );
};

export default App;
