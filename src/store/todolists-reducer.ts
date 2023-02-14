import {FilterValuesType, TodoListsType} from '../App';
import {v1} from 'uuid';

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST' as const
export const ADD_TODOLIST = 'ADD-TODOLIST' as const
export const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE' as const
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER' as const

type ActionsType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodoListActionType = {
    type: typeof REMOVE_TODOLIST
    id: string
}
export type AddTodoListActionType = {
    type: typeof ADD_TODOLIST
    titleFromInput: string
    todoListId: string
}
type ChangeTodolistTitleActionType = {
    type: typeof CHANGE_TODOLIST_TITLE
    todoListId: string,
    newTitleValue: string
}
type ChangeTodolistFilterActionType = {
    type: typeof CHANGE_TODOLIST_FILTER
    todoListId: string,
    newFilterValue: FilterValuesType
}

export const RemoveTodolistActionCreator = (id: string): RemoveTodoListActionType => ({
    type: REMOVE_TODOLIST,
    id
});
export const AddTodoListActionCreator = (titleFromInput: string): AddTodoListActionType => {
    return {
        type: ADD_TODOLIST,
        titleFromInput,
        todoListId: v1()
    }
};
export const ChangeTodolistTitleActionCreator = (newTitleValue: string, todoListId: string): ChangeTodolistTitleActionType => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        newTitleValue,
        todoListId
    }
};
export const ChangeTodolistFilterActionCreator = (todoListId: string, newFilterValue: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        todoListId,
        newFilterValue
    }
};

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: Array<TodoListsType> = []

export const todolistsReducer = (todoLists: Array<TodoListsType> = initialState, action: ActionsType): Array<TodoListsType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return todoLists.filter(list => list.id !== action.id)
        case ADD_TODOLIST:
            const newList: TodoListsType = {
                id: action.todoListId,
                title: action.titleFromInput,
                filter: 'All'
            }
            return [...todoLists, newList]
        case CHANGE_TODOLIST_TITLE:
            return todoLists.map(
                el => el.id === action.todoListId ? {...el, title: action.newTitleValue} : el
            )
        case CHANGE_TODOLIST_FILTER:
            return todoLists.map(
                el => el.id === action.todoListId ? {...el, filter: action.newFilterValue} : el
            )
        default:
            return todoLists
    }
};