import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from '../App';
import {FilterValuesType} from '../App';

import styles from './styles.module.css'


type TodoListPropsType = {
    todoListId: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void,
    changeFilterState: (todoListId: string, newFilterValue: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskID: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}


const TodoList = (props: TodoListPropsType) => {

        const [taskTitle, setTaskTitle] = useState<string>('')
        const [error, setError] = useState<boolean>(false)

        //put ONE task (as data) to html-tag to display
        //оборачивалка тасок в теги
        const getTasksItemList = (task: TaskType) => {
                const removeTaskHandler = () => props.removeTask(props.todoListId, task.id);
                const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListId, task.id, event.currentTarget.checked)

                return (
                    <div key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler}
                        />
                        <span className={task.isDone ? styles.completedTask : ''}>{task.title}</span>
                        <button onClick={removeTaskHandler}>x</button>
                    </div>
                )
            }
        ;

        //EACH task (as data) put in Function which will create a html-tag for rendering of it
        // передаем список тасок в помещение в теги
        const tasksListItems = props.tasks.length > 0
            ? props.tasks.map((task: TaskType) => {
                return getTasksItemList(task)
            }) : (<div>List is empty</div>)

        const addTaskHandler = () => {
            const trimmedTaskTitle = taskTitle.trim()

            trimmedTaskTitle ? props.addTask(props.todoListId, trimmedTaskTitle) : setError(true)

            setTaskTitle('')

        };

        const onChangeSetTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
            error && setError(false)
            setTaskTitle(event.currentTarget.value)
        };

        const onEnterAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                addTaskHandler()
            }
        }

        const onClickFilterHandlerCreator = (todoListId:string, filter: FilterValuesType) => () => props.changeFilterState(todoListId, filter)

        //styles as an example
        // const errorStyles = {color: 'red', fontWeight: 'bolder'}

    const removeTodoListHandler = () => {
       props.removeTodoList(props.todoListId)
    };

        return (
            <div>
                <h3>{props.title}
                <button onClick={removeTodoListHandler}>X</button>
                </h3>
                <div>
                    <input value={taskTitle}
                           onChange={onChangeSetTaskTitleHandler}
                           onKeyDown={onEnterAddTaskHandler}
                           className={error ? styles.inputError : ''}
                    />
                    <button onClick={addTaskHandler}>Add</button>
                    {error && <div className={error ? styles.errorTitle : ""}>Please enter the task title</div>}
                </div>
                <div>
                    {/*render list of tags with tasks' data*/}
                    {tasksListItems}
                </div>
                <div>
                    <button className={props.filter === 'All' ? styles.btnActive : ''}
                            onClick={onClickFilterHandlerCreator(props.todoListId,'All')}>All
                    </button>
                    <button className={props.filter === 'Active' ? styles.btnActive : ''}
                            onClick={onClickFilterHandlerCreator(props.todoListId,'Active')}>Active
                    </button>
                    <button className={props.filter === 'Completed' ? styles.btnActive : ''}
                            onClick={onClickFilterHandlerCreator(props.todoListId,'Completed')}>Completed
                    </button>
                </div>
            </div>
        );
    }
;

export default TodoList;