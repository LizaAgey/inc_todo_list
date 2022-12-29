import {v1} from 'uuid';
import {FilterValuesType, TodoListsType} from '../App';
import {
    AddTodoListActionCreator,
    ChangeTodolistFilterActionCreator,
    ChangeTodolistTitleActionCreator,
    RemoveTodolistActionCreator,
    todoListsReducer
} from './todo-lists-reducer';

test('specified todolist should be removed', () => {
    //
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]
    //
    const endState = todoListsReducer(startState, RemoveTodolistActionCreator(todolistId1))
    //
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    //
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]
    //
    const endState = todoListsReducer(startState, AddTodoListActionCreator(newTodolistTitle))
    //
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New Todolist';

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todoListsReducer(startState, ChangeTodolistTitleActionCreator(newTodolistTitle, todolistId2))

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
})
;

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = 'Completed';

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todoListsReducer(startState, ChangeTodolistFilterActionCreator(todolistId2, newFilter));

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
});
