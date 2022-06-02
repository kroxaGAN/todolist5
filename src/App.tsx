import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type todolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let [todolists, setTodolists] = useState<Array<todolistType>>(
        [
            {id: todolistID1, title: "What to learn", filter: "all"},
            {id: todolistID2, title: "What to know", filter: "all"}
        ]
    )

    let [tasks, setTasks] = useState({
            [todolistID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ]
        }
    );

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone: isDone} : m)})
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(m => m.id === todolistID ? {...m, filter: value} : m))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(f => f.id !== todolistID))
        delete tasks[todolistID]
    }
    const addNewTodoHandler = (title: string) => {
        let newTodoId = v1()
        setTodolists([{id: newTodoId, title: title, filter: "all"}, ...todolists])
        setTasks({
            ...tasks, [newTodoId]: [
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: true},
            ]
        })
    }
    const updateTodoTitle=(todolistID: string,title:string)=>{
        setTodolists(todolists.map(el=>el.id===todolistID ?{...el,title:title}:el))
    }
    const updateTaskTitle=(todolistID: string, taskId: string,title:string)=>{
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskId?{...el,title:title}:el)})
    }


    return (
        <div className="App">
            <AddItemForm callback={addNewTodoHandler}/>
            {
                todolists.map(m => {
                    let tasksForTodolist = tasks[m.id];
                    if (m.filter === "active") {
                        tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                    }
                    if (m.filter === "completed") {
                        tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                    }
                    return (
                        <Todolist
                            key={m.id}
                            todolistID={m.id}
                            title={m.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={m.filter}
                            removeTodolist={removeTodolist}
                            updateTodoTitle={updateTodoTitle}
                            updateTaskTitle={updateTaskTitle}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
