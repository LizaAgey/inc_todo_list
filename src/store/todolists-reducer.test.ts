import {v1} from 'uuid';
import {TodoListsType} from '../App';
import {ADD_TODOLIST, CHANGE_TODOLIST_TITLE, REMOVE_TODOLIST, todolistsReducer} from './todolists-reducer';

test('specialized todolist should be removed', () => {
    //
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]
    //
    const endState = todolistsReducer(startState, {type: REMOVE_TODOLIST, id: todolistId1})
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
    const endState = todolistsReducer(startState, {type: ADD_TODOLIST, titleFromInput: newTodolistTitle})
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

    const endState = todolistsReducer(startState, {
        type: CHANGE_TODOLIST_TITLE,
        newTitleValue: newTodolistTitle,
        todoListId: todolistId2
    })


    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});
