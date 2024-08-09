import React, { useState, useEffect } from 'react';
import './App.css';
import lexmeetlogo from "./images/lexmeetlogo.png"
import PopupAddBtn from './Components/PopupAddBtn';
import ExternalLinks from './Components/ExternalLinks';
import DeleteAllBtn from './Components/DeleteAllBtn';
import EditBtn from './Components/EditBtn';
import DeleteBtn from './Components/DeleteBtn';
import OpenTaskBtn from './Components/OpenTaskBtn';

function App() {
  const [addBtnTrigger, setAddBtnTrigger] = useState(false);
  const [deleteAllBtnTrigger, setDeleteAllBtnTrigger] = useState(false);
  const [deleteBtnTrigger, setDeleteBtnTrigger] = useState(false);
  const [deleteTaskIndex, setDeleteTaskIndex] = useState('');
  const [editBtnTrigger, setEditBtnTrigger] = useState(false);
  const [listOfTask, setListOfTask] = useState([]);
  const [taskAllDone, setTaskAllDone] = useState(false);
  const [editTask, setEditTask] = useState([]);
  const [editTaskIndex, setEditTaskIndex] = useState('');
  const [openTaskTrigger, setOpenTaskTrigger] = useState(false);
  const [openTask, setOpenTask] = useState([]);
  const [selected, setSelected] = useState('All Tasks'); // Initial selected button

  const handleButtonClick = (type) => {
    setSelected(type);
  };

  const editTaskOpen = (task, index) => {
    setEditTask(task);
    setEditTaskIndex(index);
    setEditBtnTrigger(true);
  };

  const UpdateEditedTask = (updatedTask) => {
    let updatedListOfTask = listOfTask.map((task, i) =>
      i === editTaskIndex ? updatedTask : task
    );
    setListOfTask(updatedListOfTask);
    localStorage.setItem('todolist', JSON.stringify(updatedListOfTask));
  };

  const handleDeleteTask = (index) => {
    let reducedListOfTask = [...listOfTask];
    reducedListOfTask.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedListOfTask));
    setListOfTask(reducedListOfTask);
  };

  const getNewTask = (newTask) => {
    let updatedListOfTask = [...listOfTask];
    updatedListOfTask.push(newTask);
    setListOfTask(updatedListOfTask);
    localStorage.setItem('todolist', JSON.stringify(updatedListOfTask));
  };

  useEffect(() => {
    let savedToDoList = JSON.parse(localStorage.getItem('todolist'));
    if (savedToDoList) {
      setListOfTask(savedToDoList);
    }
  }, []);

  const handleCheckTask = (index) => {
    let updatedListOfTask = listOfTask.map((task, i) =>
      i === index ? { ...task, ifDone: !task.ifDone } : task
    );
    setListOfTask(updatedListOfTask);
    localStorage.setItem('todolist', JSON.stringify(updatedListOfTask));
    const allDone = updatedListOfTask.every((task) => task.ifDone === true);
    setTaskAllDone(allDone);
  };

  const handleCheckAllTask = () => {
    if (listOfTask.length === 0) {
      alert('Your task list is empty!');
    } else {
      let updatedListOfTask = listOfTask.map((task) => ({
        ...task,
        ifDone: !taskAllDone,
      }));
      setListOfTask(updatedListOfTask);
      localStorage.setItem('todolist', JSON.stringify(updatedListOfTask));
      setTaskAllDone(!taskAllDone);
    }
  };

  const handleCheckButtonState = (ifDone) => {
    let prefix = 'check-task-btn';

    if (ifDone) {
      return prefix + '-true';
    } else {
      return prefix + '-false';
    }
  };

  const currentStateTask = (ifDone) => {
    let prefix = 'current-state-task';

    if (ifDone) {
      return prefix + '-true';
    } else {
      return prefix + '-false';
    }
  };

  const checkAllState = (taskAllDone) => {
    let prefix = 'button-header delete-all-btn';

    if (taskAllDone) {
      return prefix + '-true';
    } else {
      return prefix + '-false';
    }
  };

  function formatDeadlineTime(time) {
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour, 10);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  }

  // Filter tasks based on the selected button
  const filteredTasks = listOfTask.filter((task) => {
    if (selected === 'Completed Tasks') return task.ifDone === true;
    if (selected === 'Pending Tasks') return task.ifDone === false;
    return true; // All Tasks
  });

  return (
    <div className="App">
      <ExternalLinks />
      <PopupAddBtn onSubmit={getNewTask} trigger={addBtnTrigger} setTrigger={setAddBtnTrigger} />
      <DeleteAllBtn
        onSubmit={(emptyListOfTask) => setListOfTask(emptyListOfTask)}
        listOfTask={listOfTask}
        trigger={deleteAllBtnTrigger}
        setTrigger={setDeleteAllBtnTrigger}
      />
      <EditBtn
        onSubmit={UpdateEditedTask}
        trigger={editBtnTrigger}
        task={editTask}
        setTrigger={setEditBtnTrigger}
      />
      <DeleteBtn
        onSubmit={handleDeleteTask}
        trigger={deleteBtnTrigger}
        index={deleteTaskIndex}
        setTrigger={setDeleteBtnTrigger}
      />
      <OpenTaskBtn
        trigger={openTaskTrigger}
        task={openTask}
        setTrigger={setOpenTaskTrigger}
      />
      <div className="header-app">
        <h1 className="title-app"></h1>
      </div>
      <hr className="divider" />
      <div className="buttons-header-app">
        <div className="title-app">
          <span className="material-symbols-outlined title-icon">sweep</span>
          <h1 className="title-app text">To-Do List</h1>
        </div>
        <div>
          <button className="button-header add-btn" onClick={() => setAddBtnTrigger(true)}>
            <span className="material-symbols-outlined header-button">add</span>
            Add Task
          </button>
          <button className={checkAllState(taskAllDone)} onClick={handleCheckAllTask}>
            <span className="material-symbols-outlined header-button">checklist</span>
          </button>
          <button
            className="button-header delete-all-btn"
            onClick={() => setDeleteAllBtnTrigger(true)}
          >
            <span className="material-symbols-outlined header-button">delete_sweep</span>
            Delete All Task
          </button>
        </div>
      </div>
      <hr className="divider" />
      <div className="body-interface">
        <div className="menu-type-tasks">
          <button
            className={`menu-type-task-btn ${selected === 'All Tasks' ? 'highlighted' : ''}`}
            onClick={() => handleButtonClick('All Tasks')}
          >
            All Tasks
          </button>
          <button
            className={`menu-type-task-btn ${selected === 'Completed Tasks' ? 'highlighted' : ''}`}
            onClick={() => handleButtonClick('Completed Tasks')}
          >
            Completed Tasks
          </button>
          <button
            className={`menu-type-task-btn ${selected === 'Pending Tasks' ? 'highlighted' : ''}`}
            onClick={() => handleButtonClick('Pending Tasks')}
          >
            Pending Tasks
          </button>
          <img className="lexmeet-logo" src = {lexmeetlogo}/>
          <h2 className="lexmeet-title">LexMeet</h2>
        </div>
        <div className="list-of-task-container">
          {filteredTasks.map((task, index) => (
            <div className="task-container-div" key={index}>
              <h1 className="block-design-task-container" />
              <button
                className="task-container"
                onClick={() => {
                  setOpenTaskTrigger(true);
                  setOpenTask(task);
                }}
              >
                <text className={currentStateTask(task.ifDone)} id="task-title">
                  {task.taskTitle}
                </text>
                <text className={currentStateTask(task.ifDone)}>
                  Created: {task.dateCreated}
                </text>
                <text className={currentStateTask(task.ifDone)}>
                  Deadline: {task.taskDeadlineDate} at {formatDeadlineTime(task.taskDeadlineTime)}
                </text>
              </button>
              <div className="check-delete-div">
                <button
                  type="button"
                  className={handleCheckButtonState(task.ifDone)}
                  onClick={() => handleCheckTask(index)}
                >
                  ✔️
                </button>
                <button
                  className="check-task-btn"
                  onClick={() => editTaskOpen(task, index)}
                >
                  ✏️Edit
                </button>
                <button
                  className="check-task-btn"
                  onClick={() => {
                    setDeleteTaskIndex(index);
                    setDeleteBtnTrigger(true);
                  }}
                >
                  🗑️Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
