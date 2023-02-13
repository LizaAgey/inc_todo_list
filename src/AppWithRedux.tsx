import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm';
import {AppBar, Container, IconButton, Toolbar, Typography, Grid, Paper} from '@mui/material';
import {Menu} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import {
    AddTodoListActionCreator,
    ChangeTodolistFilterActionCreator, ChangeTodolistTitleActionCreator,
    RemoveTodolistActionCreator,
    todoListsReducer
} from './store/todo-lists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './store/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './store/store';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = 'All' | 'Active' | 'Completed'
export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function AppWithRedux() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListsType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)

    const addTask = (todoListId: string, title: string) => {
        dispatch(addTaskAC(title, todoListId))
    };
    const removeTask = (todoListId: string, taskId: string) => {
        let action = removeTaskAC(taskId, todoListId)
        dispatch(action)
    };
    const changeTaskStatus = (todoListId: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListId))
    };
    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskID, todoListId, title))
    };

    const changeTodoListFilter = (todoListId: string, newFilterValue: FilterValuesType) => {
        dispatch(ChangeTodolistFilterActionCreator(todoListId, newFilterValue))
    };
    const addToDoList = (titleFromInput: string) => {
        let action = AddTodoListActionCreator(titleFromInput)
        dispatch(action)
    };
    const removeTodoList = (todoListId: string) => {
        let action = RemoveTodolistActionCreator(todoListId)
        dispatch(action)
    };
    const changeTodoListTitle = (todoListId: string, newTitleValue: string) => {
        dispatch(ChangeTodolistTitleActionCreator(newTitleValue, todoListId))
    };

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
    const todoListsComponents = todoLists.map(list => {
        //send Array with tasks which are related to exact TODOList ID + Filter value of this TODOList
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[list.id], list.filter)

        return <Grid item key={list.id}>
            <Paper sx={{p: '15px'}} elevation={16}>
                <TodoList
                    todoListId={list.id}
                    title={list.title}
                    filter={list.filter}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}

                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeFilterState={changeTodoListFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                />
            </Paper>
        </Grid>
    })

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container sx={{m: '40px 0'}}>
                    <AddItemForm parentAddItem={addToDoList}/>
                </Grid>
                <Grid container spacing={6}>
                    {todoListsComponents}
                </Grid>

            </Container>

        </div>
    );
}


export default AppWithRedux;
