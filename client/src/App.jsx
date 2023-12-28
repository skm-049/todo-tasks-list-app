import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import "./App.css";

function NewTodo({setFetchButton}){

  const [newTask, setNewTask] = useState({title:""})

  function handleSubmit(e){
    e.preventDefault();
    if(newTask.title==="") return;

    axios
      .post("http://todosappserverapi.vercel.app/api/add", newTask)
      .then((res)=>{
        setNewTask({title:""});
        setFetchButton(btn=>!btn);
        console.log(res.data.message);
      })
      .catch((err)=>{
        console.log("Couldn't create Todo");
      })

  }

  return(
    <>
      <form id="taskInputForm" action="" onSubmit={handleSubmit} >
        <input type="text" id="newtask" name="newtask" value={newTask.title} onChange={(e)=>{setNewTask({title:e.target.value})}} className="newtask" placeholder="Write your task..." required />
        <input type="submit" value="Add" />
      </form>
    </>
  )
}

function Task({setFetchButton, setShowNotification, taskData }){
  const [updateTask, setUpdateTask] = useState({})

  function handleUpdate(e){
    e.preventDefault();
    if(updateTask.title===""){return}

    axios
      .put(`http://todosappserverapi.vercel.app/api/update/${updateTask._id}`, {"title":updateTask.title})
      .then((res)=>{
        setUpdateTask({});
        setFetchButton(btn=>!btn);
        console.log(res.data.message);
      })
      .catch((err)=>{
        console.log("Couldn't update try again..", err);
      })
  }

  function handleRemove(id){
    axios
      .delete(`http://todosappserverapi.vercel.app/api/delete/${id}`)
      .then((res)=>{
        setFetchButton(btn=>!btn);
        console.log(res.data.message);
      })
      .catch((err)=>{
        console.log("Error in deleting the task...", err);
      })
  }

  return(
    <li className="task">
      {
        (updateTask._id===taskData._id) ? (

       <form className="updateInputForm" action="" onSubmit={handleUpdate} >
         <input type="text" id="updateTask" name="updateTask" value={updateTask.title} onChange={(e)=>{setUpdateTask(obj=>{return{...obj, title:e.target.value}})}} required />
         <input type="submit" value="Update" />
       </form>
        

        ) : (

          <p onDoubleClick={()=>{setUpdateTask({...taskData})}}>
            {taskData.title}
          </p>

        )

      }

      <button className="removeTask" onClick={()=>{handleRemove(taskData._id); setShowNotification(true); }}>Done</button>
      <button className="removeTask" onClick={()=>{handleRemove(taskData._id); }}>Delete</button>

    </li>
  )
}


export default function App({}){

  // const [tasks, setTasks] = useState(Array());
  const [tasks, setTasks] = useState(Array());
  const [showNotification, setShowNotification] = useState(false);  
  const [fetchButton, setFetchButton] = useState(true);

  //fetching todosList from Database
  useEffect(()=>{  
      axios
        .get("http://todosappserverapi.vercel.app/api/")
        .then((res)=>{
          console.log(res.data);
          setTasks(res.data);
        })
        .catch((err)=>{
          console.log(err);
        })    
  }, [fetchButton])

  //handling notification 
  useEffect(() => {
    setTimeout(() => {
      setShowNotification(false);
    }, 3000)
  }, [showNotification])

  function handleAllDelete(){
    let isConfirm = window.confirm('Are you sure to delete All Tasks?');
    if(isConfirm){
      axios
        .post("http://todosappserverapi.vercel.app/api/deleteAll" )
        .then(()=>{
          setFetchButton(btn=>!btn);
        })
        .catch((error)=>{
          console.log("Couldn't delete all the todos.", error.message);
        })
    }
  }

  return(
    <>

      <h1>Todos App with MERN</h1>

      <div id="firstsection">

      <NewTodo setFetchButton={setFetchButton}  />
      <button onClick={()=>{handleAllDelete();}}>Remove All Todos</button>      

      </div>

      <hr />

      {
        (tasks.length===0) ? (

          <h1>You don't have any todos! Create new todo</h1>

        ) : (

          <ul id="tasks-list">

            {
              tasks.map((taskData, index) => {
                return <Task key={index} setFetchButton={setFetchButton} taskData={taskData} setShowNotification={setShowNotification}   />;
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
