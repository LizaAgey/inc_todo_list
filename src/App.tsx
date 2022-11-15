import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {


    const todoListTitle: string = 'What to learn';

    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: 1, title: 'HTML & CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'REACT', isDone: true},

        ]
    )

    const removeTask = (taskId: number) => {
        const updatesTask = tasks.filter((task => task.id !== taskId))
        setTasks(updatesTask)
    };


    return (
        <div className="App">
            <TodoList tasks={tasks}
                      title={todoListTitle}
                      removeTask={removeTask}
            />
        </div>
    );
}


export default App;
