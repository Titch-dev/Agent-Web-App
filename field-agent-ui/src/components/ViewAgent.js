import React from 'react';

function ViewAgent(props){

    const {id, firstName, middleName, lastName, dob, heightInInches} = props;

    return(
        <div>
            <div className="row">
                <div className="col">
                    <h4>First name: {firstName}</h4>
                    <h4>Middle name: {middleName}</h4>
                    <h4>Last name: {lastName}</h4>
                </div>
                <div className="col">
                    <h4>D.O.B: {dob}</h4>
                    <h4>Height (inches): {heightInInches}</h4>
                </div>
            </div> 
        </div>
    )
}

export default ViewAgent;