import axios from 'axios';
/* ANTES CON REDUX 
import {
    TASKS_ADD_TASK,
    TASKS_TOGGLE_STATUS_TASK,
    TASKS_REMOVE_TASK,
    TASKS_FETCH_ALL_TASKS,
} from '../redux/actions/actionTypes';
*/

const API_URL = 'http://localhost:3000/tasks';
{/* ANTES CON REDUX

// action Thunk
export const addTask = (newTask) => async (dispatch) => { // una vez hecho el dispatch de cada accion
    try {
        await axios.post(API_URL, newTask); // se resuelve la accion
        // ahora sí, hacemos dispatch de un objeto plano 
        dispatch({ 
            type: TASKS_ADD_TASK, 
            payload: newTask });
    } catch (error) {
        throw new Error(error.message);
    }
};

/* ######ANTES NUESTRAS ACTIONS ERAN ASI: (actions planos, objetos planos)
export const addTask = (task) => {
        type: TASKS_ADD_TASK,
        payload: task,
}
####luego pasará (redux) a un dispatch y ya el dispatch dentro con un objeto plano


export const toggleCompleteTask = (task) => async (dispatch) => {
    const updatedTask = { ...task, completed: !task.completed };
    try {
        await axios.put(`${API_URL}/${task.id}`, updatedTask);
        dispatch({ 
            type: TASKS_TOGGLE_STATUS_TASK, 
            payload: updatedTask });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const removeTask = (taskId) => async (dispatch) => {
    try {
        await axios.delete(`${API_URL}/${taskId}`);
        dispatch({ type: TASKS_REMOVE_TASK, payload: taskId });
    } catch (error) {
        console.error('Error removing task:', error);
    }
};

export const fetchTasks = () => async (dispatch) => {
    try {
        const response = await axios.get(API_URL);
        dispatch({ type: TASKS_FETCH_ALL_TASKS, payload: response.data });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};
*/}

export const addTask = async (newTask) => {
    try {
        const response = await axios.post(API_URL, newTask);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const toggleStatusTask = async (task) => {
    const updatedTask = { ...task, completed: !task.completed, id: task.id.toString() };
    try {
        const response = await axios.put(`${API_URL}/${task.id}`, updatedTask);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const removeTask = async (taskId) => {
    try {
        const response = await axios.delete(`${API_URL}/${taskId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};