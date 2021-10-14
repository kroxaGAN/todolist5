import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type todolistType={
    id:string
    title:string
    filter:FilterValuesType
}

function App() {
    let todolistID1=v1()
    let todolistID2=v1()
    let [todolists,setTodolists]=useState<Array<todolistType>>(
        [
            {id: todolistID1, title:"What to learn", filter: "all"},
            {id: todolistID2, title:"What to know", filter: "all"}
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
    let [filter, setFilter] = useState<FilterValuesType>("all");
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }
    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }
    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);
    }
    function changeFilter(todolistID:string,value: FilterValuesType) {
        setTodolists(todolists.map(m=>m.id===todolistID ? {...m,filter:value}:m))
    }


    return (
        <div className="App">
            {
                todolists.map(m=>{
                    let tasksForTodolist = tasks;

                    if (m.filter === "active") {
                        tasksForTodolist = tasks.filter(t => t.isDone === false);
                    }
                    if (m.filter === "completed") {
                        tasksForTodolist = tasks.filter(t => t.isDone === true);
                    }
                    return(
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
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
