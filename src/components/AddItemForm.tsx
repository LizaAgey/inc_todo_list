import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './styles.module.css';
import Button from '@material-ui/core/Button';
import {IconButton} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

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

    const errorMessage = error
        ? <div className={error ? styles.errorTitle : ''}>Please enter the title</div>
        : null

    return (
        <div>
            <input value={taskTitle}
                   onChange={onChangeSetTaskTitleHandler}
                   onKeyDown={onEnterAddItemHandler}
                   className={error ? styles.inputError : ''}
            />

            <IconButton onClick={addItem}>
                <SendIcon/>
            </IconButton>
            {errorMessage}
        </div>
    );
};

export default AddItemForm;