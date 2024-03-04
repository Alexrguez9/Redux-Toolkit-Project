import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

const store = configureStore({
    reducer: rootReducer,
    devTools: true, // false en producción (para no repercutir en el rendimiento)
});
export default store;