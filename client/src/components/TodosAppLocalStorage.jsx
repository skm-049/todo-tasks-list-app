
import React, { useEffect, useState } from "react";
import "../App.css"
export default function TodosAppLocalStorage() {

  const [tasks, setTasks] = useState( JSON.parse(localStorage.getItem("tasks")) || Array());
  const [newTask, setNewTask] = useState("");
  const [updateTask, setUpdateTask] = useState({ index: null, text: "" });
  const [showNotification, setShowNotification] = useState(false);  
  
  useEffect(() => {
    setTimeout(() => {
      setShowNotification(false);
    }, 3000)
  }, [showNotification])

  useEffect(() => {

    localStorage.setItem("tasks", JSON.stringify(tasks));
  
  }, [tasks])

  function AddNewTask(){
    setTasks(arr=>{
      return [...arr, newTask]
    }    
    );
    setNewTask("");
    
  }

  function DeleteAllTasks(){
    setTasks(Array());    
  }

  function RemoveATask(index){
    setTasks(arr=>{
      const updatedArr = arr.slice(0);
      updatedArr.splice(index, 1)
      return updatedArr;
    })    
  }

  function UpdateATask(index){
    setTasks(arr=>{
      const updatedArr = arr.slice(0);
      updatedArr.splice(index, 1, updateTask.text );
      return updatedArr;
    })
    setUpdateTask(()=>{return{index:null, text:""}}) 
  }

  
  return (
    <>
      <h1 id="main-heading">Todos App with LocalStorage</h1>

      <input type="text" name="new-task-input"  id="new-task-input" value={newTask} onChange={(e)=>{setNewTask(e.target.value)}} onKeyDown={(e)=>{if( (e.key==="Enter") && (newTask!=="")){AddNewTask();}}}  />
      <button id="add-task" className="todo-btn" onClick={()=>{if(newTask!==""){AddNewTask();}}} >Add</button>
      <button id="delete-all-tasks" className="todo-btn" onClick={()=>{DeleteAllTasks();}} >Delete All Tasks</button>

      {
        tasks.length===0 ? (
          <h1>
            You don't have any Todos
          </h1>
        ) : (
          <ul>
            {
              tasks.map((task, i)=>{

                return(
                  <li key={`task_${i}`}>
                    {
                      updateTask.index===i ? (
                        <>
                        <input type="text" name="update-task-input" id="update-task-input" value={updateTask.text} onChange={(e)=>{setUpdateTask(obj=>{return{...obj, text:e.target.value}})}} onKeyDown={(e)=>{if( (e.key==="Enter") && (updateTask.text!=="")){UpdateATask(updateTask.index);}}} />
                        <button onClick={()=>{if(updateTask.text!==""){UpdateATask(updateTask.index)}}}>Update</button>
                        </>
                        ) : (
                          <p onDoubleClick={()=>setUpdateTask(obj=>{return{text:task, index:i}})}>{task}</p>
                      )
                    }
                    <button className="todo-btn" onClick={()=>{RemoveATask(i); setShowNotification(true); }} >Done</button>
                    <button className="todo-btn" onClick={()=>{RemoveATask(i); }} >Delete</button>
                  </li>
                )
              })
            }
          </ul>
        ) 
      }
      {
        showNotification &&
        <div id="notification">
          <p >Wohoo! You have completed one.</p>
          <div className="confetti">
            <span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span><span className="confetti-piece"></span>
          </div>
        </div>
      }
    </>
  )

}