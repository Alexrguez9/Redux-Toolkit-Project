import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from '../components/TaskCard';

import { 
    getAllTasksThunk,
    getAllTasks,
    getTasksLoading,
    getTasksError,
    addTaskThunk,
} from '../redux/reducers/taskReducer';

const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(getAllTasks);
    const loading = useSelector(getTasksLoading);
    const error = useSelector(getTasksError);

    const [newTask, setNewTask] = useState({ title: '', description: '' });

    useEffect(() => {
        dispatch(getAllTasksThunk());
    }, []);

    const handleAddTask = async () => {
        if (newTask.title.trim() != '') {
            await dispatch(
                addTaskThunk({
                    id: Math.floor(Math.random() * 1000).toString(),
                    title: newTask.title,
                    description: newTask.description,
                    completed: false,
                })
            );
            
        setNewTask({ title: '', description: '' });
        }
    };

    return (
        <div className='task-list'>
            <h2>Task List</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>Hubo un error al cargar las tareas</p>
            ) : (
                <>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                    <div className="add-task">
                        <input 
                        type="text"
                        placeholder='Task Title'
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                        <textarea 
                            placeholder='Task Description'
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                        <button onClick={handleAddTask}>Add Task</button>
                    </div>
                </>
            )}
        </div>
    );
}
export default TaskList;