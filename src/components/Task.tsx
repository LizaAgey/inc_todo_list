import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, ListItem} from '@mui/material';
import styles from './styles.module.css';
import EditableSpan from './EditableSpan';
import {IconButton} from '@material-ui/core';
import ClearIcon from '@mui/icons-material/Clear';
import {TaskType} from '../AppWithRedux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../store/tasks-reducer';
import {useDispatch} from 'react-redux';

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

const Task = memo((props: TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTaskHandler = useCallback(() => dispatch(removeTaskAC(props.task.id, props.todolistId)), [dispatch])
    const changeTaskStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(props.task.id, event.currentTarget.checked, props.todolistId)), [dispatch])
    const changeTaskTitle = useCallback((title: string) => dispatch(changeTaskTitleAC(props.task.id, props.todolistId, title)), [dispatch])

    return (
        <ListItem key={props.task.id} sx={{p: '0px'}}>
            <Checkbox checked={props.task.isDone}
                      onChange={changeTaskStatusHandler}
                      size="small"
            />
            <div style={{display: 'inline-block'}} className={props.task.isDone ? styles.completedTask : ''}>
                <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <ClearIcon fontSize="small"/>
            </IconButton>
        </ListItem>
    )
})

export default Task;