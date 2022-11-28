import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from '../App';
import {FilterValuesType} from '../App';

import styles from './styles.module.css'


type TodoListPropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void,
    changeFilterState: (newFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    filter: FilterValuesType
}


const TodoList = (props: TodoListPropsType) => {


        //put ONE task (as data) to html-tag to display
        //оборачивалка тасок в теги
        const getTasksItemList = (task: TaskType) => {
                const removeTaskHandler = () => props.removeTask(task.id);
                const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, event.currentTarget.checked)

                return (
                    <div key={
                        task.id
                    }
                    >
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
        const tasksListItem = props.tasks.length > 0
            ? props.tasks.map((task: TaskType) => {
                return getTasksItemList(task)
            }) : (<div>List is empty</div>)

        const [taskTitle, setTaskTitle] = useState<string>('')

        const addTaskHandler = () => {
            props.addTask(taskTitle)
            setTaskTitle('')
        };

        const onChangeSetTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => setTaskTitle(event.currentTarget.value);

        const onEnterAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
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
                <div>
                    {/*render list of tags with tasks' data*/}
                    {tasksListItem}
                </div>
                <div>
                    <button className={props.filter === 'All' ? styles.btnActive : ''}
                            onClick={onClickFilterHandlerCreator('All')}>All
                    </button>
                    <button className={props.filter === 'Active' ? styles.btnActive : ''}
                            onClick={onClickFilterHandlerCreator('Active')}>Active
                    </button>
                    <button className={props.filter === 'Completed' ? styles.btnActive : ''}
                            onClick={onClickFilterHandlerCreator('Completed')}>Completed
                    </button>
                </div>
            </div>
        );
    }
;

export default TodoList;