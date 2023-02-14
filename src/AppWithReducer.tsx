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
    todolistsReducer
} from './store/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './store/tasks-reducer';

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

function AppWithReducer() {

    // let todoListId1 = v1()
    // let todoListId2 = v1()
    //
    // const [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
    //     {id: todoListId1, title: 'What to learn', filter: 'All'},
    //     {id: todoListId2, title: 'What to buy', filter: 'All'},
    // ])
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todoListId1]: [
    //         {id: v1(), title: '1 HTML & CSS', isDone: true},
    //         {id: v1(), title: '1 JS', isDone: true},
    //         {id: v1(), title: '1 REACT', isDone: false},
    //         {id: v1(), title: '1 Abc', isDone: false},
    //         {id: v1(), title: '1 Cde', isDone: false}
    //     ],
    //     [todoListId2]: [
    //         {id: v1(), title: '2 HTML & CSS', isDone: true},
    //         {id: v1(), title: '2 JS', isDone: true},
    //         {id: v1(), title: '2 REACT', isDone: false},
    //         {id: v1(), title: '2 Abc', isDone: false},
    //         {id: v1(), title: '2 Cde', isDone: false}
    //     ]
    // })
    //
    // const addTask = (todoListId: string, title: string) => {
    //     dispatchToTasks(addTaskAC(title, todoListId))
    // };
    // const removeTask = (todoListId: string, taskId: string) => {
    //     let action = removeTaskAC(taskId, todoListId)
    //     dispatchToTasks(action)
    // };
    // const changeTaskStatus = (todoListId: string, taskID: string, isDone: boolean) => {
    //     dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListId))
    // };
    // const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
    //     dispatchToTasks(changeTaskTitleAC(taskID, todoListId, title))
    // };
    //
    //
    // const changeTodoListFilter = (todoListId: string, newFilterValue: FilterValuesType) => {
    //    dispatchToTodolists(ChangeTodolistFilterActionCreator(todoListId,newFilterValue))
    // };
    // const addToDoList = (titleFromInput: string) => {
    //     let action = AddTodoListActionCreator(titleFromInput)
    //     dispatchToTasks(action)
    //     dispatchToTodolists(action)
    // };
    //
    // const removeTodoList = (todoListId: string) => {
    //     let action = RemoveTodolistActionCreator(todoListId)
    //     dispatchToTodolists(action)
    //     dispatchToTasks(action)
    // };
    //
    // const changeTodoListTitle = (todoListId: string, newTitleValue: string) => {
    //    dispatchToTodolists(ChangeTodolistTitleActionCreator(newTitleValue,todoListId))
    // };
    //
    // const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
    //     switch (filter) {
    //         case 'Completed' :
    //             return tasks.filter(task => task.isDone)
    //         case 'Active':
    //             return tasks.filter(task => !task.isDone)
    //         default:
    //             return tasks
    //     }
    // };
    // const todoListsComponents = todoLists.map(list => {
    //     //send Array with tasks which are related to exact TODOList ID + Filter value of this TODOList
    //     const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[list.id], list.filter)
    //
    //     return <Grid item>
    //         <Paper sx={{p: '15px'}} elevation={16}>
    //             <TodoList
    //                 key={list.id}
    //
    //                 todoListId={list.id}
    //                 title={list.title}
    //                 filter={list.filter}
    //                 removeTodoList={removeTodoList}
    //                 changeTaskTitle={changeTaskTitle}
    //                 changeTodoListTitle={changeTodoListTitle}
    //
    //                 tasks={filteredTasks}
    //                 removeTask={removeTask}
    //                 changeFilterState={changeTodoListFilter}
    //                 addTask={addTask}
    //                 changeTaskStatus={changeTaskStatus}
    //             />
    //         </Paper>
    //     </Grid>
    // })

    return (
        <div className="App">

            {/*<AppBar position="static">*/}
            {/*    <Toolbar>*/}
            {/*        <IconButton*/}
            {/*            size="large"*/}
            {/*            edge="start"*/}
            {/*            color="inherit"*/}
            {/*            aria-label="menu"*/}
            {/*            sx={{mr: 2}}*/}
            {/*        >*/}
            {/*            <Menu/>*/}
            {/*        </IconButton>*/}
            {/*        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>*/}
            {/*            TodoLists*/}
            {/*        </Typography>*/}
            {/*        <Button color="inherit">Login</Button>*/}
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}

            {/*<Container fixed>*/}
            {/*    <Grid container sx={{m: '40px 0'}}>*/}
            {/*        <AddItemForm parentAddItem={addToDoList}/>*/}
            {/*    </Grid>*/}
            {/*    <Grid container spacing={6}>*/}
            {/*        {todoListsComponents}*/}
            {/*    </Grid>*/}

            {/*</Container>*/}

        </div>
    );
}


export default AppWithReducer;
