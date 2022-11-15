import React from 'react';
import {TaskType} from '../App';
import {FilterValuesType} from "../App";


type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: number) => void
    changeTodoListFilter: (nextFilterValue: FilterValuesType) => void
}

const TodoList = (props: TodoListPropsType) => {

//put ONE task (as data) to html-tag to display
    const getTasksItemList = (task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    };

//EACH task (as data) put in Function which will create a html-tag for rendering of it
    const tasksListItem = props.tasks.map((task: TaskType) => {
        return getTasksItemList(task)

    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {/*render list of tags with tasks' data*/}
                {tasksListItem}
            </ul>
            <div>
                <button onClick={() => props.changeTodoListFilter("All")}>All</button>
                <button onClick={() => props.changeTodoListFilter("Active")}>Active</button>
                <button onClick={() => props.changeTodoListFilter("Completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;