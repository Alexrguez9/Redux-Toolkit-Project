//taskReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as TASK_API from "../../api/task.js";

// Thunks
export const addTaskThunk = createAsyncThunk(
    "tasks/addTask", async (task) => {
    try {
        return await TASK_API.addTask(task);
    } catch (error) {
        return error;
    }
});

export const toggleStatusTaskThunk = createAsyncThunk(
    "tasks/toggleStatusTask",
    async (task, {dispatch}) => {
        try {
            const response = await TASK_API.toggleStatusTask(task);
            dispatch(getAllTasksThunk());
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const removeTaskThunk = createAsyncThunk(
    "tasks/removeTask",
    async (taskId, { dispatch }) => { // Agrega { dispatch } al segundo argumento: ARREGLA EL PROBLEMA DE QUE NO SE MUESTRA EN LA UI EL CAMBIO
        try {
            const response = await TASK_API.removeTask(taskId);
            dispatch(getAllTasksThunk()); // Despachar la acción para obtener todas las tareas actualizadas
            return response.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);


export const getAllTasksThunk = createAsyncThunk(
    "tasks/getAllTasks", 
    async () => {
        try {
            const tasks = await TASK_API.getAllTasks();
            // Convertir las identificaciones de cadena a números
            const tasksWithNumericIds = tasks.map(task => ({...task, id: parseInt(task.id)}));
            console.log('tasksWithNumericIds', tasksWithNumericIds);
            return tasksWithNumericIds;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);



/*
"task/getAllTasks/fullfilled"
"task/getAllTasks/pending"
"task/getAllTasks/rejected"
*/

// Slice
const initialState = {
    tasks: [],
    loading: false,
    error: null,
};
{/* ANTES CON REDUX
  // import data from "../../tasks.json"; -> Antes estático
  // Reducer tiene estado inicial y recibe acciones. Según el type del action, devolvemos un estado nuevo.
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case TASKS_ADD_TASK:
        return {
          // Sin redux-toolkit, tenemos que crear la copia del estado manualmente
          ...state,
          tasks: [...state.tasks, action.payload],
        };
      case TASKS_TOGGLE_STATUS_TASK:
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id ? action.payload : task
            /* ahora esto se maneja en task.js con updatedTask
              ? { ...task, completed: !task.completed }
              : task 
            * /
          ),
        };
      case TASKS_REMOVE_TASK:
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.payload),
        };
      default:
        return state;
    }
  };
*/}

// AHORA CON REDUX-TOOLKIT
const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasksThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload; // internamente redux hace la copia del estado, nosotros hacemos la mutación directa
            })
            .addCase(addTaskThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(toggleStatusTaskThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                );
            })
            .addCase(removeTaskThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                }
            );
    }
});

export const { fetchAllTasks, addTask, toggleStatusTask, removeTask } = taskSlice.actions;

export const getAllTasks = (state) => state.tasks.tasks;
export const getTasksLoading = (state) => state.tasks.loading;
export const getTasksError = (state) => state.tasks.error;

export default taskSlice.reducer;
