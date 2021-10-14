import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistID, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onClickHandlerForTodolist = () => {
        props.removeTodolist(props.todolistID)
    }
    const changeFilterForButton=(value:FilterValuesType)=>{
        props.changeFilter(props.todolistID,value)
    }
    const onClickHandler = (taskID:string) => {
        props.removeTask(props.todolistID, taskID)
    }
    const onChangeHandlerCheckBox = (e: ChangeEvent<HTMLInputElement>, taskID:string) => {
        props.changeTaskStatus(props.todolistID, taskID, e.currentTarget.checked);
    }

    return <div>
        <h3>
            {props.title}
            <button onClick={onClickHandlerForTodolist}>DEL</button>
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={(e)=>onChangeHandlerCheckBox(e,t.id)}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={()=>onClickHandler(t.id)}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={()=>changeFilterForButton('all')} className={props.filter === 'all' ? "active-filter" : ""}>All</button>
            <button onClick={()=>changeFilterForButton('active')} className={props.filter === 'active' ? "active-filter" : ""}>Active</button>
            <button onClick={()=>changeFilterForButton('completed')} className={props.filter === 'completed' ? "active-filter" : ""}>Completed</button>

        </div>
    </div>
}
