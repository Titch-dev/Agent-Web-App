import React, { useState } from 'react';

function EditAgent(props){

    const [agent, setAgent] = useState(props);
    const {id, firstName, middleName, lastName, dob, heightInInches} = props;

    const handleChange = (evt) => {

        let editAgent = {...agent};

        editAgent[evt.target.name] = evt.target.value;

        setAgent(editAgent);
    }

    const editSave = (ev) => {
        ev.preventDefault();
        props.editAgent(agent);
    }
    
    return(
        <div>
            <form className="row" onSubmit={editSave}>
                <div className="col-6">
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name: </label>
                        <input type="text" className="form-control" id="firstName" name="firstName" placeholder={firstName} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="middleName" className="form-label">Middle Name: </label>
                        <input type="text" className="form-control" id="middleName" name="middleName" placeholder={middleName} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name: </label>
                        <input type="text" className="form-control" id="lastName" name="lastName" placeholder={lastName} onChange={handleChange}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">D.O.B: </label>
                        <input type="text" className="form-control" id="dob" name="dob" placeholder="YYYY-MM-DD" placeholder={dob} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="heightInInches" className="form-label">Height (inches): </label>
                        <input type="text" className="form-control" id="heightInInches" name="heightInInches" placeholder={heightInInches} onChange={handleChange}/>
                    </div>
                </div>
                <button className="col-2 button offset-8 btn btn-success" type="submit">Save Changes</button>
            </form>
        </div>
    )
}

export default EditAgent;