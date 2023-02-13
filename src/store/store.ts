import {createStore, combineReducers} from "redux"
import {todoListsReducer} from './todo-lists-reducer';
import {tasksReducer} from './tasks-reducer';

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store