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

type RemoveTodoListActionType = {
    type: typeof REMOVE_TODOLIST
    id: string
}
type AddTodoListActionType = {
    type: typeof ADD_TODOLIST
    titleFromInput: string
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
        titleFromInput
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

export const todoListsReducer = (todoLists: Array<TodoListsType>, action: ActionsType): Array<TodoListsType> => {
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
        case CHANGE_TODOLIST_FILTER:
            return todoLists.map(
                el => el.id === action.todoListId ? {...el, filter: action.newFilterValue} : el
            )
        default:
            return todoLists
    }
};