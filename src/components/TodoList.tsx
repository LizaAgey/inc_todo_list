import React, {ChangeEvent, memo, useCallback} from 'react';
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
    console.log('todo list')
    let {id, title, filter} = currentTodolist

    const dispatch = useDispatch()
    const tasksOfCurrentTodolist = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id])
    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case 'Completed' :
                return tasks.filter(task => task.isDone)
            case 'Active':
                return tasks.filter(task => !task.isDone)
            default:
                return tasks
        }
    };
    const filteredTasks: Array<TaskType> = getFilteredTasks(tasksOfCurrentTodolist, filter)
    const addNewTask = useCallback((titleFromInput: string) => {
        dispatch(addTaskAC(titleFromInput, id))
    }, [dispatch])

    const tasksListItems = filteredTasks.length > 0
        ? (<List style={{all: 'unset'}}>{filteredTasks.map((task: TaskType) => <Task task={task} todolistId={id}
                                                                                     key={task.id}/>)}</List>)
        : (<div>List is empty</div>)

    const onClickAllFilter = useCallback(() => dispatch(ChangeTodolistFilterAC(id, "All")),[dispatch])
    const  onClickActiveFilter = useCallback(() => dispatch(ChangeTodolistFilterAC(id, "Active")),[dispatch])
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
                                filterValue={filter}
                                onClickHandler={onClickAllFilter}
                />
                <ButtonWithMemo currentButton={'Active'}
                                filterValue={filter}
                                onClickHandler={onClickActiveFilter}
                />
                <ButtonWithMemo currentButton={'Completed'}
                                filterValue={filter}
                                onClickHandler={onClickCompletedFilter}
                />

            </ButtonGroup>
        </div>
    );
})

export type ButtonWithMemoType = {
    filterValue: FilterValuesType
    onClickHandler: () => void
    currentButton: FilterValuesType
}

const ButtonWithMemo = memo((props: ButtonWithMemoType) => {
    return <Button variant="contained"
                   fullWidth
                   color={props.filterValue === props.currentButton ? 'secondary' : 'primary'}
                   sx={{fontSize: '10px', minWidth: 'fit-content'}}
                   onClick={props.onClickHandler}>
        {props.currentButton}
    </Button>
})

export default TodoList;