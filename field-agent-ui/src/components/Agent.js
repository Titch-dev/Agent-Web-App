import React, { useState } from 'react';
import ViewAgent from './ViewAgent';
import EditAgent from './EditAgent';


function Agent(props){

    const [display, setDisplay] = useState('');

    const {id, firstName, middleName, lastName, dob, heightInInches} = props;

    const handleClick = (ev) => {    
        const cardBody = document.getElementById("card-" + id);

        if(ev.target.id === "viewBtn"){
            setDisplay("VIEW");
            if(cardBody.classList.contains("d-none")){
                cardBody.classList.remove("d-none");
            } else {
                cardBody.classList.add("d-none");
            }
        
        } else if(ev.target.id === "editBtn"){
            setDisplay("EDIT");
            if(cardBody.classList.contains("d-none")){
                cardBody.classList.remove("d-none");
            } else {
                cardBody.classList.add("d-none");
            }
        } else if(ev.target.id === "deleteBtn") {
            props.deleteAgent(id);
        }
    }

    const editAgent = (agent) => {
        const cardBody = document.getElementById("card-" + id);
        props.editAgent(agent);
        cardBody.classList.add("d-none");
    }

    let content;
    if(display === "VIEW"){
        content = (<ViewAgent id={id} firstName={firstName} middleName={middleName} lastName={lastName} dob={dob} heightInInches={heightInInches}/>)
    } else if(display === "EDIT"){
        content = (<EditAgent editAgent={editAgent} id={id} firstName={firstName} middleName={middleName} lastName={lastName} dob={dob} heightInInches={heightInInches}/>)
    }

    

    return(
        <div className="row mb-3">
            <div className="offset-1 col-10">
                <div className="card shadow">
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <h3>Agent {firstName} {lastName}</h3>
                            </div>
                            <div className="col-auto justify-content-end">
                                <button className="btn btn-primary mx-1" id="viewBtn" onClick={handleClick}>View</button>
                                <button className="btn btn-warning mx-1" id="editBtn" onClick={handleClick}>Edit</button>
                                <button className="btn btn-danger mx-1" id="deleteBtn" onClick={handleClick}>Delete</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body d-none" id={"card-" + id}>
                        {content}
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default Agent;