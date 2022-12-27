import {TodoListsType} from '../App';
import {v1} from 'uuid';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST' as const
export const ADD_TODOLIST = 'ADD-TODOLIST' as const
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE' as const

type ActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodolisTitleActionType

type RemoveTodoListActionType = {
    type: typeof REMOVE_TODOLIST
    id: string
}
type AddTodoListActionType = {
    type: typeof ADD_TODOLIST
    titleFromInput: string
}

type ChangeTodolisTitleActionType = {
    type: typeof CHANGE_TODOLIST_TITLE
    todoListId: string,
    newTitleValue: string
}

export const todolistsReducer = (todoLists: Array<TodoListsType>, action: ActionsType): Array<TodoListsType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoLists.filter(list => list.id !== action.id)
        case ADD_TODOLIST:
            const newListId = v1()
            const newList: TodoListsType = {
                id: newListId,
                title: action.titleFromInput,
                filter: 'All'
            }
            return [...todoLists, newList]
        case CHANGE_TODOLIST_TITLE:
            return todoLists.map(
                el => el.id === action.todoListId ? {...el, title: action.newTitleValue} : el
            )
        default:
            return todoLists
    }
};