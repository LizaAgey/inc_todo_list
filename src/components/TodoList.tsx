import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType, TodoListsType} from '../AppWithRedux';
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
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from '../store/todolists-reducer';


export type TodoListPropsType = {
    currentTodolist: TodoListsType
}

const TodoList = ({currentTodolist}: TodoListPropsType) => {
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

        const addNewTask = (titleFromInput: string) => {
            dispatch(addTaskAC(title, id))
        };
        const getTasksItemList = (task: TaskType) => {
            const removeTaskHandler = () => dispatch(removeTaskAC(task.id, id))
            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, event.currentTarget.checked, id))
            const changeTaskTitle = (title: string) => dispatch(changeTaskTitleAC(task.id, id, title))

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

        const onClickFilterHandlerCreator = (todoListId: string, filter: FilterValuesType) => () => dispatch(ChangeTodolistFilterAC(todoListId, filter))
        const removeTodoListHandler = () => dispatch(RemoveTodolistAC(id))
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
                    <Button variant="contained"
                            fullWidth
                            color={filter === 'All' ? 'secondary' : 'primary'}
                            sx={{mr: '3px', fontSize: '10px', minWidth: 'fit-content'}}
                            onClick={onClickFilterHandlerCreator(id, 'All')}>
                        All
                    </Button>
                    <Button variant="contained"
                            fullWidth
                            color={filter === 'Active' ? 'secondary' : 'primary'}
                            sx={{mr: '3px', fontSize: '10px', minWidth: 'fit-content'}}
                            onClick={onClickFilterHandlerCreator(id, 'Active')}>
                        Active
                    </Button>
                    <Button variant="contained"
                            fullWidth
                            color={filter === 'Completed' ? 'secondary' : 'primary'}
                            sx={{fontSize: '10px', minWidth: 'fit-content'}}
                            onClick={onClickFilterHandlerCreator(id, 'Completed')}>
                        Completed
                    </Button>
                </ButtonGroup>
            </div>
        );
    }
;

export default TodoList;