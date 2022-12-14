import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
}

const EditableSpan: React.FC<EditableSpanType> = (props) => {
    const [isEditMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(props.title)
    const onChangeSetTitleHandler = (event:ChangeEvent<HTMLInputElement>) => {
     setNewTitle(event.currentTarget?.value)
    };
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)

    }
    return (isEditMode
            ? <input type="text" onBlur={offEditMode} value={newTitle} autoFocus onChange={(event)=>onChangeSetTitleHandler(event)}/>
            : <span onDoubleClick={onEditMode}>{newTitle}</span>
    );
};

export default EditableSpan;