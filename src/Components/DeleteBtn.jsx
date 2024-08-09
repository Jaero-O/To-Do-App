import React from 'react'

function DeleteBtn(props) {
    const DeleteTasks=()=>{
        props.setTrigger(false);
        props.onSubmit(props.index);
    }

    return (props.trigger) ? (
    <div className="add-btn-bg">
        <div className="add-btn-ui">
            <div className="delete-all-btn-ui">
                <h1 className="do-you-wish-to-delete-all">Do you wish to delete this task?</h1>
                <div className="yes-no-choices">
                    <button className="check-task-btn yes-no-btn" onClick={DeleteTasks}>
                        Yes
                    </button>
                    <button className="check-task-btn yes-no-btn" onClick={()=>props.setTrigger(false)}>
                        No
                    </button>
                </div>
            </div>
        </div>
    </div>
  ) : ""
}

export default DeleteBtn
