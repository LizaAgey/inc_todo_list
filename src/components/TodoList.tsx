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


export type TodoListPropsType = {
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
        const tasksListItems = props.tasks.length > 0
            ? (<List style={{all: 'unset'}}>{props.tasks.map((task: TaskType) => getTasksItemList(task))}</List>)
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