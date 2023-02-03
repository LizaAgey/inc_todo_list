import {TasksType} from '../App';


export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType

export const tasksReducer = (state: TasksType, action: ActionsType) => {
switch (action.type) {
    case "REMOVE-TASK":
        return {
            ...state,
            [action.todolistID] : state[action.todolistID].filter(task => task.id !== action.taskID)
        }
    case "ADD-TASK":
        let newId = state[action.todolistID].length + 1
        return {
            ...state,
            [action.todolistID]: [{id: newId, title: action.taskTitle, isDone: false}, ...state[action.todolistID] ]
        }
}
}

export const removeTaskAC = (taskID: string, todolistID:string) => {
return {type: 'REMOVE-TASK', taskID, todolistID} as const
}

export const addTaskAC = (taskTitle: string, todolistID: string) => {
    return {type: 'ADD-TASK', taskTitle, todolistID} as const
}