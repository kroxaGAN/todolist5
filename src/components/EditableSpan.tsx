import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type propsType = {
    title: string
    callback:(title: string)=>void
}
export const EditableSpan: React.FC<propsType> = (props) => {
    const [editOn, setEditOn] = useState(false)
    let [title, setTitle] = useState(props.title)
    let [error, setError] = useState<string | null>(null)

    const changeEditOnHandler=()=>{
        setEditOn(!editOn)
        props.callback(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            changeEditOnHandler()
        }
    }

    return (
        editOn
            ? <input value={title}
                     autoFocus
                     onBlur={changeEditOnHandler}
                     onChange={onChangeHandler}
                     onKeyPress={onKeyPressHandler}
                     className={error ? "error" : ""}
            />
            : <span onDoubleClick={changeEditOnHandler}>{props.title}</span>

    )
}
