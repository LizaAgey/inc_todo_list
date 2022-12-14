import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan: React.FC<EditableSpanType> = (props) => {
    const [isEditMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const onChangeSetTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget?.value)
    };

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(newTitle)
    }
    const onKeyDownOffEditMode = (event: KeyboardEvent<HTMLInputElement>) => {event.key === 'Enter' && offEditMode()};

    return (isEditMode
            ? <input
                type="text"
                onBlur={offEditMode}
                value={newTitle}
                autoFocus
                onChange={onChangeSetTitleHandler}
                onKeyDown={onKeyDownOffEditMode}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;