// RootReducer que va a contener todos los reducers de la aplicación
import { combineReducers } from 'redux';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
    tasks: taskReducer,
    // otros reducers (usuarios, productos...)
});
export default rootReducer;

// DATO: si luego queremos acceder a valores de la Store, haremos state.tasks.loquesea, state.users.loquesea, state.products.loquesea...