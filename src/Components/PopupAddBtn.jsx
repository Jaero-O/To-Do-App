import React, { useState, useRef } from 'react'

function PopupAddBtn(props) {

  const [taskTitle,setTaskTitle] = useState("");
  const [taskDescription,setTaskDescription] = useState("");
  const [taskDeadlineDate,setTaskDeadlineDate] = useState("");
  const [taskDeadlineTime,setTaskDeadlineTime] = useState("");
  
  const closeAddBtnInterface = () =>{
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadlineDate("");
    setTaskDeadlineTime("");
    props.setTrigger(false);
  }

  const AddTaskSubmit = (e) => {
    e.preventDefault();
    let showdate = new Date();
    if (taskTitle.trim() === ''){
      setTaskTitle("Untitled Task");
      return;
    }
    let dateCreated = showdate.toLocaleDateString();
    let timeCreated = showdate.toLocaleTimeString();
    const listOfTask = {taskTitle,taskDescription,taskDeadlineDate,taskDeadlineTime,ifDone:false,dateCreated,timeCreated};
    props.onSubmit(listOfTask);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadlineDate("");
    setTaskDeadlineTime("");
    props.setTrigger(false);
  }

  return (props.trigger) ? (
    <div className="add-btn-bg">
      <div className="add-btn-ui">
        <div className="add-btn-header">
          <h1 className="add-btn-title">Create a Task</h1>
          <button className="add-btn-close-btn" onClick={closeAddBtnInterface}>X</button>
        </div>
        <hr className="divider"/>
        <div className="add-btn-form">
          <form onSubmit={AddTaskSubmit}>
            <div className="add-btn-task-div">
              <label className="add-btn-task-title">Task Title</label>
              <input
                className = "add-btn-title-input"
                type="text"
                required
                placeholder="Enter your task"
                value = {taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            
            </div>
            <div className="add-btn-task-div">
             <label className="add-btn-task-title">Task Description (Optional)</label>
             <textarea
              className="add-btn-description-input"
              placeholder = "Enter the description of your task"
              value={taskDescription}
              onChange={(e)=>setTaskDescription(e.target.value)}
             />
            </div>
            <div className="add-btn-deadline-task">
              <label className="add-btn-task-title deadline-title">Task Deadline:</label>
              <input 
                className="add-btn-deadline-input"
                type="date"
                required
                value={taskDeadlineDate}
                onChange={(e)=>setTaskDeadlineDate(e.target.value)}
              />
              <input 
                className="add-btn-deadline-input"
                type="time"
                required
                value={taskDeadlineTime}
                onChange={(e)=>setTaskDeadlineTime(e.target.value)}
              />
            </div>
              <hr className="divider"/>
            <div className="add-btn-create-btn-div">
              <button type="submit" className="add-btn-create-task-btn">Create Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : "";
}

export default PopupAddBtn