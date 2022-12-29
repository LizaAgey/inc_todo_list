import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './styles.module.css';
import {Button, IconButton, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type AddItemFormType = {
    parentAddItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormType> = (props) => {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addItem = () => {
        const trimmedTaskTitle = taskTitle.trim()
        trimmedTaskTitle ? props.parentAddItem(trimmedTaskTitle) : setError(true)
        setTaskTitle('')
    };
    const onEnterAddItemHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItem()
        }
    }
    const onChangeSetTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(event.currentTarget.value)
    };

    return (
        <div>
            <TextField
                value={taskTitle}
                onChange={onChangeSetTaskTitleHandler}
                onKeyDown={onEnterAddItemHandler}
                variant={'outlined'}
                size={'small'}
                error={error}
                helperText ={error && "Please enter the title"}
            />

            <Button
                onClick={addItem}
                variant={'contained'}
                sx={{ml: '3px', fontSize:"12px", width: "fit-content"}}
                endIcon={<AddIcon/>}
                size={"small"}
            >
                Add
            </Button>
        </div>
    );
};

export default AddItemForm;