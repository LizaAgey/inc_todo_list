import React, {ChangeEvent} from 'react';
import {TaskType} from '../App';
import {FilterValuesType} from '../App';
import styles from './styles.module.css'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import Button from '@material-ui/core/Button';
import {IconButton} from '@material-ui/core';
import ClearIcon from '@mui/icons-material/Clear';
import {ButtonGroup, Checkbox, List, ListItem, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from '../store/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../store/tasks-reducer';


export type TodoListPropsType = {
    todoListId: string
    title: string,
    filter: FilterValuesType
    changeFilterState: (todoListId: string, newFilterValue: FilterValuesType) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitleValue: string) => void
}

const TodoList = (props: TodoListPropsType) => {
        const dispatch = useDispatch()
        const tasksOfCurrentTodolist = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todoListId])
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
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasksOfCurrentTodolist, props.filter)

        const getTasksItemList = (task: TaskType) => {
            const removeTaskHandler = () => dispatch(removeTaskAC(task.id, props.todoListId))
            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, event.currentTarget.checked, props.todoListId))
            const changeTaskTitle = (title: string) => dispatch(changeTaskTitleAC(task.id, props.todoListId, title))

            return (
                <ListItem key={task.id} sx={{p: '0px'}}>
                    <Checkbox checked={task.isDone}
                              onChange={changeTaskStatusHandler}
                              size="small"
                    />
                    <div style={{display: 'inline-block'}} className={task.isDone ? styles.completedTask : ''}>
                        <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    </div>
                    <IconButton onClick={removeTaskHandler}>
                        <ClearIcon fontSize="small"/>
                    </IconButton>
                </ListItem>
            )
        }
        const tasksListItems = filteredTasks.length > 0
            ? (<List style={{all: 'unset'}}>{filteredTasks.map((task: TaskType) => getTasksItemList(task))}</List>)
            : (<div>List is empty</div>)

        const onClickFilterHandlerCreator = (todoListId: string, filter: FilterValuesType) => () => props.changeFilterState(todoListId, filter)
        const removeTodoListHandler = () => {
            props.removeTodoList(props.todoListId)
        };
        const addNewTask = (titleFromInput: string) => {
            dispatch(addTaskAC(props.title, props.todoListId))
        };
        const changeTodoListTile = (title: string) => {
            props.changeTodoListTitle(props.todoListId, title)
        };

        return (
            <div>
                <Typography variant={'h5'} align={'center'}>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTile}/>
                    <IconButton onClick={removeTodoListHandler} color="secondary">
                        <ClearIcon/>
                    </IconButton>
                </Typography>
                <AddItemForm parentAddItem={addNewTask}/>
                <div>
                    {tasksListItems}
                </div>
                <ButtonGroup fullWidth disableElevation size="small">
                    <Button variant="contained"
                            fullWidth
                            color={props.filter === 'All' ? 'secondary' : 'primary'}
                            sx={{mr: '3px', fontSize: '10px', minWidth: 'fit-content'}}
                            onClick={onClickFilterHandlerCreator(props.todoListId, 'All')}>
                        All
                    </Button>
                    <Button variant="contained"
                            fullWidth
                            color={props.filter === 'Active' ? 'secondary' : 'primary'}
                            sx={{mr: '3px', fontSize: '10px', minWidth: 'fit-content'}}
                            onClick={onClickFilterHandlerCreator(props.todoListId, 'Active')}>
                        Active
                    </Button>
                    <Button variant="contained"
                            fullWidth
                            color={props.filter === 'Completed' ? 'secondary' : 'primary'}
                            sx={{fontSize: '10px', minWidth: 'fit-content'}}
                            onClick={onClickFilterHandlerCreator(props.todoListId, 'Completed')}>
                        Completed
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
;

export default TodoList;