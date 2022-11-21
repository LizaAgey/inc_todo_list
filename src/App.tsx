import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "All" | "Active" | "Completed"

function App() {

    const todoListTitle: string = 'What to learn';

    // initialState of Array with data
    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},

        ]
    )

    // user press DELETE button and the function is called;
    // set global list of tasks as list WITHOUT a task for deletion (filter by task ID)
    const removeTask = (taskId: string) => {
        const updatesTask = tasks.filter((task => task.id !== taskId))
        setTasks(updatesTask)
    };


    let [filter, setFilter] = useState("All")

    // once user press UI filter button, onClickHandler receive new nextFilerValue
    // set this new filter value as filter
    // App re-render once changed
    const changeFilterState = (newFilterValue: FilterValuesType) => {
        setFilter(newFilterValue)
    };

    // new variable which will be transferred to render as task list based on task filter
    let taskForRender: Array<TaskType> = []

    //filter main task list based on  the filter button
    if (filter === "All") {
        taskForRender = tasks
    } else if (filter == "Active") {
        taskForRender = tasks.filter(task => task.isDone === false)
    } else if (filter == "Completed") {
        taskForRender = tasks.filter(task => task.isDone === true)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }

        setTasks([newTask,...tasks])
    };


    return (
        <div className="App">
            <TodoList
                //list of tasks after filtration (initialState: All)
                tasks={taskForRender}
                title={todoListTitle}
                //for removal button
                removeTask={removeTask}
                // for filter button
                // onClickHandler which change filer value => filter task list
                changeFilterState={changeFilterState}
                addTask={addTask}


            />
        </div>
    );
}


export default App;
