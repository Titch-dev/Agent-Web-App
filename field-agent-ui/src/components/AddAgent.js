import React, { useState } from 'react';

const DEFAULT_AGENT = {firstName: "", middleName: "", lastName: "", dob: "", heightInInches: ""};

function AddAgent(props){

    const [newAgent, setNewAgent] = useState(DEFAULT_AGENT);

    const addForm = document.getElementById("addForm");

    const handleChange = (evt) => {

        let nextAgent = {...newAgent};

        nextAgent[evt.target.name] = evt.target.value;

        setNewAgent(nextAgent);

    }

    const createNewAgent = (ev) => {
        ev.preventDefault();
        props.addAgent(newAgent);
        setNewAgent(DEFAULT_AGENT);
    }

    const displayForm = () => {
        if(addForm.classList.contains("d-none")){
            addForm.classList.remove("d-none");
        } else {
            addForm.classList.add("d-none");
        }
    }

    return(
        
        <div className="col-6 my-3">
            <div className="card">
                <div className="card-header text-center" onClick={displayForm}>
                    <h3>Add Agent</h3>
                </div>
                <div className="card-body d-none" id="addForm">
                    <form className="row" onSubmit={createNewAgent}>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name: </label>
                                <input type="text" className="form-control" id="firstName" name="firstName" value={newAgent.firstName} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="middleName" className="form-label">Middle Name: </label>
                                <input type="text" className="form-control" id="middleName" name="middleName" value={newAgent.middleName} onChange={handleChange} reqiured />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name: </label>
                                <input type="text" className="form-control" id="lastName" name="lastName" value={newAgent.lastName} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="dob" className="form-label">D.O.B: </label>
                                <input type="text" className="form-control" id="dob" name="dob" placeholder="YYYY-MM-DD" value={newAgent.dob} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="heightInInches" className="form-label">Height (inches): </label>
                                <input type="text" className="form-control" id="heightInInches" name="heightInInches" value={newAgent.heightInInches} onChange={handleChange} required />
                            </div>
                        </div>
                        <button className="col-2 button offset-8 btn btn-success" type="submit">Add Agent</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddAgent;