import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddItemForm from './components/AddItemForm';
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import {
    AddTodoListActionCreator,
    ChangeTodolistFilterActionCreator,
    ChangeTodolistTitleActionCreator,
    RemoveTodolistActionCreator
} from './store/todo-lists-reducer';
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

    const todoListsComponents = todoLists.map(list => {
        //send Array with tasks which are related to exact TODOList ID + Filter value of this TODOList

        return <Grid item key={list.id}>
            <Paper sx={{p: '15px'}} elevation={16}>
                <TodoList
                    todoListId={list.id}
                    title={list.title}
                    filter={list.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                    changeFilterState={changeTodoListFilter}
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
