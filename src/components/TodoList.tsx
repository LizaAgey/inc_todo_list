import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TaskType} from '../App';
import {FilterValuesType} from '../App';

import styles from './styles.module.css'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Simulate} from 'react-dom/test-utils';
import change = Simulate.change;


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
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitleValue: string) => void
}


const TodoList = (props: TodoListPropsType) => {

        const getTasksItemList = (task: TaskType) => {
            const removeTaskHandler = () => props.removeTask(props.todoListId, task.id);
            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListId, task.id, event.currentTarget.checked)
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            };

            return (
                <div key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={changeTaskStatusHandler}
                    />
                    <div style={{display: 'inline-block'}} className={task.isDone ? styles.completedTask : ''}>
                        <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    </div>
                    <button onClick={removeTaskHandler}>x</button>
                </div>
            )
        }
        const tasksListItems = props.tasks.length > 0
            ? props.tasks.map((task: TaskType) => getTasksItemList(task))
            : (<div>List is empty</div>)
        const onClickFilterHandlerCreator = (todoListId: string, filter: FilterValuesType) => () => props.changeFilterState(todoListId, filter)
        const removeTodoListHandler = () => {
            props.removeTodoList(props.todoListId)
        };
        const addNewTask = (titleFromInput: string) => {
            props.addTask(props.todoListId, titleFromInput)
        };
        const changeTodoListTile = (title: string) => {
         props.changeTodoListTitle(props.todoListId, title)
        };

        return (
            <div>
                <h3>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTile}/>
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