import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {FilterValuesType, TaskType, TodoListsType} from '../AppWithRedux';
import styles from './styles.module.css'
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';
import Button from '@material-ui/core/Button';
import {IconButton} from '@material-ui/core';
import ClearIcon from '@mui/icons-material/Clear';
import {ButtonGroup, Checkbox, List, ListItem, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../store/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../store/tasks-reducer';
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from '../store/todolists-reducer';
import Task from './Task';


export type TodoListPropsType = {
    currentTodolist: TodoListsType
}

export const TodoList = memo(({currentTodolist}: TodoListPropsType) => {
    let {id, title, filter} = currentTodolist

    const dispatch = useDispatch()
    const tasksOfCurrentTodolist = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id])
    const filteredTasks = useMemo((): Array<TaskType> => {
        switch (filter) {
            case 'Completed' :
                return tasksOfCurrentTodolist.filter(task => task.isDone)
            case 'Active':
                return tasksOfCurrentTodolist.filter(task => !task.isDone)
            default:
                return tasksOfCurrentTodolist
        }
    },[tasksOfCurrentTodolist, filter]) //при измененении зависимостей, произойдет перерисовка, а при изменении, напр., заголовка TodoList, нет

    const addNewTask = useCallback((titleFromInput: string) => {
        dispatch(addTaskAC(titleFromInput, id))
    }, [dispatch])

    const tasksListItems = filteredTasks.length > 0
        ? (<List style={{all: 'unset'}}>{filteredTasks.map((task: TaskType) => <Task task={task} todolistId={id}
                                                                                     key={task.id}/>)}</List>)
        : (<div>List is empty</div>)

    const onClickAllFilter = useCallback(() => dispatch(ChangeTodolistFilterAC(id, "All")),[dispatch])
    const onClickActiveFilter = useCallback(() => dispatch(ChangeTodolistFilterAC(id, "Active")),[dispatch])
    const onClickCompletedFilter = useCallback(() => dispatch(ChangeTodolistFilterAC(id, "Completed")),[dispatch])


    const removeTodoListHandler = useCallback(() => dispatch(RemoveTodolistAC(id)),[dispatch])
    const changeTodoListTile = (title: string) => dispatch(ChangeTodolistTitleAC(title, id))

    return (
        <div>
            <Typography variant={'h5'} align={'center'}>
                <EditableSpan title={title} changeTitle={changeTodoListTile}/>
                <IconButton onClick={removeTodoListHandler} color="secondary">
                    <ClearIcon/>
                </IconButton>
            </Typography>
            <AddItemForm parentAddItem={addNewTask}/>
            <div>
                {tasksListItems}
            </div>
            <ButtonGroup fullWidth disableElevation size="small">

                <ButtonWithMemo currentButton={'All'}
                                color={filter === 'All' ? 'secondary' : 'primary'}
                                onClickHandler={onClickAllFilter}
                />
                <ButtonWithMemo currentButton={'Active'}
                                color={filter === 'Active' ? 'secondary' : 'primary'}
                                onClickHandler={onClickActiveFilter}
                />
                <ButtonWithMemo currentButton={'Completed'}
                                color={filter === 'Completed' ? 'secondary' : 'primary'}
                                onClickHandler={onClickCompletedFilter}
                />

            </ButtonGroup>
        </div>
    );
})

export type ButtonWithMemoType = {
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
    onClickHandler: () => void
    currentButton: string
}

const ButtonWithMemo = memo((props: ButtonWithMemoType) => {
    return <Button variant="contained"
                   fullWidth
                   color={props.color}
                   sx={{fontSize: '10px', minWidth: 'fit-content'}}
                   onClick={props.onClickHandler}>
        {props.currentButton}
    </Button>
})

export default TodoList;