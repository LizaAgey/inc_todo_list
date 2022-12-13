import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from './styles.module.css';

type AddItemFormType = {
    parentAddItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormType> = (props) => {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeSetTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(event.currentTarget.value)
    };

    const addItemHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        trimmedTaskTitle ? props.parentAddItem(trimmedTaskTitle) : setError(true)
        setTaskTitle('')
    };

    const onEnterAddItemHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

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
            <button onClick={addItemHandler}>Add</button>
            {errorMessage}
        </div>
    );
};

export default AddItemForm;