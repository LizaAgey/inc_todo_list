import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan = memo((props: EditableSpanType) => {
    console.log('span')

    const [isEditMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(props.title)
    const [error, setError] = useState<boolean>(false)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        if (newTitle.trim()) {
            props.changeTitle(newTitle)
            setEditMode(false)
        } else {
            setError(true)
        }
    }
    const onKeyDownOffEditMode = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && offEditMode()
    };
    const onChangeSetTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setNewTitle(event.currentTarget?.value)
    };

    return (isEditMode
            ? <TextField
                onBlur={offEditMode}
                value={newTitle}
                onChange={onChangeSetTitleHandler}
                onKeyDown={onKeyDownOffEditMode}
                variant={'standard'}
                size={'small'}
                color={'primary'}
                autoFocus
                error={error}
            />

            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
})

export default EditableSpan;