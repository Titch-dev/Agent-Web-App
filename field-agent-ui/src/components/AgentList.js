import React, { useState, useEffect } from 'react';
import Agent from './Agent';
import AddAgent from './AddAgent';


function AgentList(){

    const [agentList, setAgentList] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/api/agent")
            .then(response => {
                if(response.status !== 200){
                    return Promise.reject("Agent fetch failed :(")
                }
                return response.json();
            })
            .then(json => setAgentList(json))
            .catch(console.log);

    }, [])

    const addAgent = (newAgent) => {
        console.log(newAgent);

        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newAgent)
        };

        fetch("http://localhost:8080/api/agent", init)
            .then(response => {
                if (response.status !== 201) {
                    return Promise.reject("response is not OK");
                }
                return response.json();
            })
            .then(json => setAgentList([...agentList, json]))
            .catch(console.log);
    }

    const deleteAgent = (agentId) => {
        console.log(agentId);

        const init = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(agentId)
        };

        fetch("http://localhost:8080/api/agent/" + agentId, init)
            .then(response => {
                if (response.status !== 204) {
                    return Promise.reject("Agent not deleted");
                }
            })
            .then(setAgentList(agentList.filter(e => e.agentId !== agentId)))
            .catch(console.log);

    }

    const editAgent = (editAgent) => {

        const agentProps = {"agentId": editAgent.id,
                            "firstName": editAgent.firstName,
                            "middleName": editAgent.middleName,
                            "lastName": editAgent.lastName,
                            "dob": editAgent.dob,
                            "heightInInches": editAgent.heightInInches,
                            "agencies": []
        }

        const init = {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agentProps)
        };

        fetch("http://localhost:8080/api/agent/" + agentProps.agentId, init)
            .then(response => {
                if (response.status !== 204) {
                    return Promise.reject("Agent not edited");
                }
            })
            .then(setAgentList(agentList.map((val) => {
                return val.agentId == agentProps.agentId ? {
                    "agentId": val.agentId,
                    "firstName": agentProps.firstName,
                    "middleName": agentProps.middleName,
                    "lastName": agentProps.lastName,
                    "dob": agentProps.dob,
                    "heightInInches": agentProps.heightInInches,
                    "agencies": []
                } : val})))
            .catch(console.log);

    }

    return(
        <div style={{background: "#fff"}}>
            <div className="row justify-content-center">
                <AddAgent addAgent={addAgent}/>
            </div>
            {
                agentList.map(e => {return(<Agent editAgent={editAgent} deleteAgent={deleteAgent} id={e.agentId} firstName={e.firstName} middleName={e.middleName} lastName={e.lastName} dob={e.dob} heightInInches={e.heightInInches} />)} )
            }
        </div>
    );
}

export default AgentList;