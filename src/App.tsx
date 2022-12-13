import React, {useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, title: 'What to learn', filter: 'All'},
        {id: todoListId2, title: 'What to buy', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
            [todoListId1]: [
                {id: v1(), title: '1 HTML & CSS', isDone: true},
                {id: v1(), title: '1 JS', isDone: true},
                {id: v1(), title: '1 REACT', isDone: false},
                {id: v1(), title: '1 Abc', isDone: false},
                {id: v1(), title: '1 Cde', isDone: false}
            ],
            [todoListId2]: [
                {id: v1(), title: '2 HTML & CSS', isDone: true},
                {id: v1(), title: '2 JS', isDone: true},
                {id: v1(), title: '2 REACT', isDone: false},
                {id: v1(), title: '2 Abc', isDone: false},
                {id: v1(), title: '2 Cde', isDone: false}
            ]
        }
    )

    const addTask = (todoListId: string, title: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    };
    const removeTask = (todoListId: string, taskId: string) => {
        let filteredTasks = tasks[todoListId].filter(task => task.id !== taskId)

        //get all tasks
        //rewrite a task with specific TODOList ID
        //value for this task is filtered based on incoming taskID
        setTasks({...tasks, [todoListId]: filteredTasks})
    };

    const changeTaskStatus = (todoListId: string, taskID: string, isDone: boolean) => {
        let changedTasks = tasks[todoListId].map(
            (task) => task.id === taskID ? {...task, isDone} : task)

        setTasks({...tasks, [todoListId]: changedTasks})
    };

    const changeFilterState = (todoListId: string, newFilterValue: FilterValuesType) => {
        setTodoLists(
            todoLists.map(
                el => el.id === todoListId ? {...el, filter: newFilterValue} : el
            )
        )
    };

    const addToDoList = (titleFromInput: string) => {
        const newListId = v1()
        const newList: TodoListsType = {
            id: newListId,
            title: titleFromInput,
            filter: 'All'
        }
        setTodoLists([...todoLists, newList])
        setTasks({...tasks, [newListId]: []})
    };

    const getFilteredTasks =
        (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
            switch (filter) {
                case 'Completed' :
                    return tasks.filter(task => task.isDone)
                case 'Active':
                    return tasks.filter(task => !task.isDone)
                default:
                    return tasks
            }
        };

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(list => list.id !== todoListId))

        delete tasks[todoListId]
        setTasks({...tasks}) //to rerender
    };

    const todoListsComponents = todoLists.map(
        list => {
            const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[list.id], list.filter) //send Array with tasks which are related to exact TODOList ID + Filter value of this TODOList

            return <TodoList
                key={list.id}
                todoListId={list.id}
                title={list.title}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilterState={changeFilterState}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={list.filter}
                removeTodoList={removeTodoList}
            />
        }
    )

    return (
        <div className="App">
            <AddItemForm parentAddItem={addToDoList}/>
            {todoListsComponents}
        </div>
    );
}


export default App;
