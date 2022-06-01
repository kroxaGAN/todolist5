import {Input} from "./Input";
import {Button} from "./Button";
import React, {useState} from "react";

type AddItemFormPropsType={
    callback:(title:string)=>void
}

export const AddItemForm: React.FC<AddItemFormPropsType>=({callback})=>{
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            callback(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }


    return (
        <div>
            <Input
                title={title}
                setTitle={setTitle}
                error={error}
                setError={setError}
                addTask={addTask}
            />
            <Button name={'add task'} callBack={addTask}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

