import {TasksType} from '../AppWithRedux';
import {ADD_TODOLIST, AddTodoListActionType, REMOVE_TODOLIST, RemoveTodoListActionType} from './todo-lists-reducer';


export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

const initialState : TasksType= {}

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)
            }
        case 'ADD-TASK':
            let newId = (state[action.todolistID].length + 1).toString()
            return {
                ...state,
                [action.todolistID]: [{id: newId, title: action.taskTitle, isDone: false}, ...state[action.todolistID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                        ...task,
                        isDone: action.newStatus
                    } : task
                )
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                        ...task,
                        title: action.newTitle
                    } : task
                )
            }
        case ADD_TODOLIST:
            return {...state, [action.todoListId]: []}
        case REMOVE_TODOLIST:
             {
                 // let copyState = {...state}
                 // delete copyState[action.id]
                 // return copyState
                 let {[action.id]: [], ...rest} = {...state}
                 return rest
             }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {type: 'REMOVE-TASK', taskID, todolistID} as const
}

export const addTaskAC = (taskTitle: string, todolistID: string) => {
    return {type: 'ADD-TASK', taskTitle, todolistID} as const
}

export const changeTaskStatusAC = (taskID: string, newStatus: boolean, todolistID: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskID, newStatus, todolistID} as const
}

export const changeTaskTitleAC = (taskID: string, todolistID: string, newTitle: string,) => {
    return {type: 'CHANGE-TASK-TITLE', taskID, newTitle, todolistID} as const
}