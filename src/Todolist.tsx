import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

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
    updateTodoTitle:(todolistID: string,title: string)=>void
    updateTaskTitle:(todolistID: string, taskId: string,title:string)=>void
}

export function Todolist(props: PropsType) {

    const onClickHandlerForTodolist = () => {
        props.removeTodolist(props.todolistID)
    }
    const changeFilterForButton = (value: FilterValuesType) => {
        props.changeFilter(props.todolistID, value)
    }
    const onClickHandler = (taskID: string) => {
        props.removeTask(props.todolistID, taskID)
    }
    const onChangeHandlerCheckBox = (e: ChangeEvent<HTMLInputElement>, taskID: string) => {
        props.changeTaskStatus(props.todolistID, taskID, e.currentTarget.checked);
    }
    const inputHandler=(title:string)=>{
        props.addTask(props.todolistID,title)
    }
    const updateTodoTitleHandler=(title:string)=>{
        props.updateTodoTitle(props.todolistID,title)
    }
    const updateTaskTitleHandler=(title:string,taskId:string)=>{
        props.updateTaskTitle(props.todolistID,taskId,title)
    }

    return <div>

        <h3>
            <EditableSpan title={props.title} callback={updateTodoTitleHandler}/>
            <Button name={'DEL'} callBack={onClickHandlerForTodolist}/>
        </h3>

        <AddItemForm callback={inputHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={(e) => onChangeHandlerCheckBox(e, t.id)}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={(title)=>updateTaskTitleHandler(title,t.id)}/>
                        {/*<span>{t.title}</span>*/}
                        <Button name={'del task'} callBack={() => onClickHandler(t.id)}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button name={'All'} callBack={() => changeFilterForButton('all')}/>
            <Button name={'Active'} callBack={() => changeFilterForButton('active')}/>
            <Button name={'Completed'} callBack={() => changeFilterForButton('completed')}/>
        </div>
    </div>
}
