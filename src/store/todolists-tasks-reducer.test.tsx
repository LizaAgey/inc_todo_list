import {TasksType, TodoListsType} from '../App';
import {AddTodoListActionCreator, todoListsReducer} from './todo-lists-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodoListsType> = []

    const action = AddTodoListActionCreator('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodolists).toBe(action.todoListId)
})