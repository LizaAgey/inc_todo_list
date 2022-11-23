import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from '../App';
import {FilterValuesType} from "../App";


type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void,
    changeFilterState: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => void

}

const TodoList = (props: TodoListPropsType) => {

    //put ONE task (as data) to html-tag to display
    //оборачивалка тасок в теги
    const getTasksItemList = (task: TaskType) => {
        const removeTaskHandler = () => props.removeTask(task.id);

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    };

    //EACH task (as data) put in Function which will create a html-tag for rendering of it
    // передаем список тасок в помещение в теги
    const tasksListItem = props.tasks.map((task: TaskType) => {
        return getTasksItemList(task)
    })

    const [taskTitle, setTaskTitle] = useState<string>("")

    const addTaskHandler = () => {
        props.addTask(taskTitle)
        setTaskTitle("")
    };

    const onChangeSetTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTaskTitle(event.currentTarget.value);

    const onEnterAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    const onClickFilterHandlerCreator = (filter: FilterValuesType) => () => props.changeFilterState(filter)


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={onChangeSetTaskTitleHandler}
                       onKeyDown={onEnterAddTaskHandler}
                />
                <button onClick={addTaskHandler}>Add</button>
            </div>
            <ul>
                {/*render list of tags with tasks' data*/}
                {tasksListItem}
            </ul>
            <div>
                <button onClick={onClickFilterHandlerCreator("All")}>All</button>
                <button onClick={onClickFilterHandlerCreator("Active")}>Active</button>
                <button onClick={onClickFilterHandlerCreator("Completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;