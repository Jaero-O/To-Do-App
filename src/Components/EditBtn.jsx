import React,{ useState, useEffect} from 'react'

function EditBtn(props) {

    const {task} = props;
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskDeadlineDate, setNewTaskDeadlineDate] = useState('');
    const [newTaskDeadlineTime, setNewTaskDeadlineTime] = useState('');

    useEffect(() => {
        if (task) {
        setNewTaskTitle(task.taskTitle);
        setNewTaskDescription(task.taskDescription);
        setNewTaskDeadlineDate(task.taskDeadlineDate);
        setNewTaskDeadlineTime(task.taskDeadlineTime);
        }
    }, [task]);

    const closeEditBtnInterface = () =>{
        setNewTaskTitle(task.taskTitle);
        setNewTaskDescription(task.taskDescription);
        setNewTaskDeadlineDate(task.taskDeadlineDate);
        setNewTaskDeadlineTime(task.taskDeadlineTime);
        props.setTrigger(false);
    }

    const EditTaskSubmit = (e) => {
        e.preventDefault();
        let showdate = new Date();
        if (newTaskTitle.trim() === ''){
          setNewTaskTitle("Untitled Task");
          return;
        }
        let dateCreated = showdate.toLocaleDateString();
        let timeCreated = showdate.toLocaleTimeString();
        const listOfTask = {
            taskTitle:newTaskTitle,
            taskDescription:newTaskDescription,
            taskDeadlineDate:newTaskDeadlineDate,
            taskDeadlineTime:newTaskDeadlineTime,
            ifDone:false,
            dateCreated,
            timeCreated
        };
        props.onSubmit(listOfTask);
        props.setTrigger(false);
    }

    return (props.trigger)?(
    <div className="add-btn-bg">
      <div className="add-btn-ui">
        <div className="add-btn-header">
          <h1 className="add-btn-title">Edit a Task</h1>
          <button className="add-btn-close-btn" onClick={closeEditBtnInterface}>X</button>
        </div>
        <hr className="divider"/>
        <div className="add-btn-form">
          <form onSubmit={EditTaskSubmit}>
            <div className="add-btn-task-div">
              <label className="add-btn-task-title">Task Title</label>
              <input
                className = "add-btn-title-input"
                type="text"
                required
                placeholder="Enter your task"
                value = {newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            
            </div>
            <div className="add-btn-task-div">
             <label className="add-btn-task-title">Task Description (Optional)</label>
             <textarea
              className="add-btn-description-input"
              placeholder = "Enter the description of your task"
              value={newTaskDescription}
              onChange={(e)=>setNewTaskDescription(e.target.value)}
             />
            </div>
            <div className="add-btn-deadline-task">
              <label className="add-btn-task-title deadline-title">Task Deadline:</label>
              <input 
                className="add-btn-deadline-input"
                type="date"
                required
                value={newTaskDeadlineDate}
                onChange={(e)=>setNewTaskDeadlineDate(e.target.value)}
              />
              <input 
                className="add-btn-deadline-input"
                type="time"
                required
                value={newTaskDeadlineTime}
                onChange={(e)=>setNewTaskDeadlineTime(e.target.value)}
              />
            </div>
              <hr className="divider"/>
            <div className="add-btn-create-btn-div">
              <button type="submit" className="add-btn-create-task-btn">Save Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ):"";
}

export default EditBtn