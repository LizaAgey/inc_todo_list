import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "All" | "Active" | "Completed"

function App() {

    const todoListTitle: string = 'What to learn';

    // initialState of Array with data
    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: 1, title: 'HTML & CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'REACT', isDone: false},

        ]
    )

    // user press DELETE button and the function is called;
    // set global list of tasks as list WITHOUT a task for deletion (filter by task ID)
    const removeTask = (taskId: number) => {
        const updatesTask = tasks.filter((task => task.id !== taskId))
        setTasks(updatesTask)
    };

    // create filter to manage the task list
    // initialState: to display all tasks
    const [filter, setFilter] = useState<any>("All")


    // once user press UI filter button, onClickHandler receive new nextFilerValue
    // set this new filter value as filter
    // App re-render once changed
    const changeTodoListFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue)
    };

    // new variable which will be transferred to render as task list based on task filter
    let tasksForRender: Array<TaskType> = [];

    //filter main task list based on  the filter button
    if (filter === "All") {
        tasksForRender = tasks
    } else if (filter === "Active") {
        tasksForRender = tasks.filter(task => task.isDone === false)
    } else if (filter === "Completed") {
        tasksForRender = tasks.filter(task => task.isDone === true)
    }


    return (
        <div className="App">
            <TodoList
                //list of tasks after filtration (initialState: All)
                tasks={tasksForRender}

                title={todoListTitle}

                //for removal button
                removeTask={removeTask}

                // for filter button
                // onClickHandler which change filer value => filter task list
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}


export default App;
