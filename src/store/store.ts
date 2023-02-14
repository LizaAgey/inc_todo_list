import {legacy_createStore, combineReducers} from "redux"
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

export const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store