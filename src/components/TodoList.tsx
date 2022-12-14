import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from '../App';
import {FilterValuesType} from '../App';

import styles from './styles.module.css'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';


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
                    <div style={{display:"inline-block"}}  className={task.isDone ? styles.completedTask : ''}>
                        <EditableSpan title={task.title}/>
                    </div>
                    <button onClick={removeTaskHandler}>x</button>
                </div>
            )
        }
        const tasksListItems = props.tasks.length > 0 ? props.tasks.map((task: TaskType) => {
            return getTasksItemList(task)
        }) : (<div>List is empty</div>)
        const onClickFilterHandlerCreator = (todoListId: string, filter: FilterValuesType) => () => props.changeFilterState(todoListId, filter)
        const removeTodoListHandler = () => {
            props.removeTodoList(props.todoListId)
        };
        const addNewTask = (titleFromInput: string) => {
            props.addTask(props.todoListId, titleFromInput)
        };

        return (
            <div>
                <h3>{props.title}
                    <button onClick={removeTodoListHandler}>X</button>
                </h3>
                <AddItemForm parentAddItem={addNewTask}/>
                <div>
                    {tasksListItems}
                </div>
                <div>
                    <button className={props.filter === 'All' ? styles.btnActive : ''}
                            onClick={onClickFilterHandlerCreator(props.todoListId, 'All')}>All
                    </button>
                    <button className={props.filter === 'Active' ? styles.btnActive : ''}
                            onClick={onClickFilterHandlerCreator(props.todoListId, 'Active')}>Active
                    </button>
                    <button className={props.filter === 'Completed' ? styles.btnActive : ''}
                            onClick={onClickFilterHandlerCreator(props.todoListId, 'Completed')}>Completed
                    </button>
                </div>
            </div>
        );
    }
;

export default TodoList;