import React from 'react';

function DeleteAllBtn(props) {

    const DeleteAllTasks = () => {
        if (props.listOfTask.length === 0) {
            props.setTrigger(false);
            alert("Your task list is empty!");
        } else {
            let emptyListOfTask = [];
            localStorage.setItem('todolist', JSON.stringify(emptyListOfTask));
            props.onSubmit(emptyListOfTask);
            props.setTrigger(false);
        }
    }

    return (props.trigger) ? (
        <div className="add-btn-bg">
            <div className="add-btn-ui">
                <div className="delete-all-btn-ui">
                    <h1 className="do-you-wish-to-delete-all">Do you wish to delete all tasks?</h1>
                    <div className="yes-no-choices">
                        <button className="check-task-btn yes-no-btn" onClick={DeleteAllTasks}>
                            Yes
                        </button>
                        <button className="check-task-btn yes-no-btn" onClick={() => props.setTrigger(false)}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : "";
}

export default DeleteAllBtn;
