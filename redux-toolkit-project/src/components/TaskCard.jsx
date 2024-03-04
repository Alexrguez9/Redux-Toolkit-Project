import React from "react";
/* ANTES CON REDUX
import { useDispatch } from "react-redux";
import { removeTask, toggleCompleteTask } from "../redux/actions"; // importamos las actions que necesitemos
*/
import './TaskCard.css';
import {
    getTasksError,
    getTasksLoading,
    removeTaskThunk,
    toggleStatusTaskThunk,
} from '../redux/reducers/taskReducer';

import { useDispatch, useSelector } from 'react-redux';

// En componente hacemos (dentro de un handle) un dispatch de acciones
const TaskCard = ({ task }) => {
    const error = useSelector(getTasksError);
    const loading = useSelector(getTasksLoading);
    const dispatch = useDispatch();

    

    // Ahora sí son asíncronas
    const handleToggleComplete = async () => {
        if (!loading){
            dispatch(toggleStatusTaskThunk(task));
        }
    }

    const handleRemoveTask = async () => {
        if (!loading){
            dispatch(removeTaskThunk(task.id));
        }
    }
    
    const cardClassName = task.completed ? 'completed-task' : 'uncompleted-task';

    return (
        <div className={`task-card ${cardClassName}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-actions">
                <button onClick={handleToggleComplete} disabled={loading}>
                    {loading ? 'Updating...' : 'Mark Completed'}
                </button>
                <button onClick={handleRemoveTask} disabled={loading}>
                    {loading ? 'Updating...' : 'Delete Task'}
                </button>
            </div>
            {error && <p className="error-message">{error}</p> }
        </div>
        
    );
}
export default TaskCard;