import React, {useState} from 'react';
import {TaskType} from '../App';
import {FilterValuesType} from "../App";


type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeFilterState: (newFilterValue: FilterValuesType) => void
    addTask: (title:string) => void

}

const TodoList = (props: TodoListPropsType) => {

//put ONE task (as data) to html-tag to display
    //оборачивалка тасок в теги
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
    // передаем список тасок в помещение в теги
    const tasksListItem = props.tasks.map((task: TaskType) => {
        return getTasksItemList(task)
    })


    const [taskTitle, setTaskTitle] = useState<string>("")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={(event)=>setTaskTitle(event.currentTarget.value)}
                onKeyDown={()=>{}}
                />
                <button onClick={()=> {
                    props.addTask(taskTitle)
                    setTaskTitle("")
                }}>Add</button>
            </div>
            <ul>
                {/*render list of tags with tasks' data*/}
                {tasksListItem}
            </ul>
            <div>
                <button onClick={() => props.changeFilterState("All")}>All</button>
                <button onClick={() => props.changeFilterState("Active")}>Active</button>
                <button onClick={() => props.changeFilterState("Completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;