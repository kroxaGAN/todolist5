import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type propsType={
    title:string
    setTitle:(title:string)=>void
    error:string | null
    setError:(error:string | null)=>void
    addTask:()=>void
}

export const Input=(props:propsType)=>{

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null);
        if (e.charCode === 13) {
            props.addTask();
        }
    }
    return(
        <input value={props.title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={props.error ? "error" : ""}
        />
    )
}
