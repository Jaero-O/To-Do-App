import React from 'react'

function OpenTaskBtn(props) {

    const {task} = props;

    const statusTask = () => {
      return props.task.ifDone ? 'Completed' : 'Not Yet Completed';
    };

    return (props.trigger)?(
    <div className="add-btn-bg">
      <div className="add-btn-ui">
        <div className="add-btn-header">
          <h1 className="add-btn-title">{statusTask()}</h1>
          <button className="add-btn-close-btn" onClick={()=>{props.setTrigger(false)}}>X</button>
        </div>
        <hr className="divider"/>
        <div className="add-btn-form">
          <form>
            <div className="add-btn-task-div">
              <label className="add-btn-task-title">Task Title</label>
              <input
                className = "add-btn-title-input"
                type="text"
                value={props.task.taskTitle}
                readOnly
              />
            
            </div>
            <div className="add-btn-task-div">
             <label className="add-btn-task-title">Task Description (Optional)</label>
             <textarea
              className="add-btn-description-input"
              value={task.taskDescription}
              readOnly
             />
            </div>
            <div className="add-btn-deadline-task">
              <label className="add-btn-task-title deadline-title">Task Deadline:</label>
              <input 
                className="add-btn-deadline-input"
                type="date"
                required
                value={props.task.taskDeadlineDate}
                readOnly
              />
              <input 
                className="add-btn-deadline-input"
                type="time"
                required
                value={props.task.taskDeadlineTime}
                readOnly
              />
            </div>
              <hr className="divider"/>
          </form>
        </div>
      </div>
    </div>
  ):"";
}

export default OpenTaskBtn