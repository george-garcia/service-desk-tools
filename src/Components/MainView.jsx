import React from 'react';
import { useState, useEffect } from 'react';
import { document } from "../data/document";

const MainView = (props) => {

    const [workNotes,setWorkNotes] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [email, setEmail] = useState('');

    const [newIncident, setNewIncident] = useState('');
    const [newAttempt, setNewAttempt] = useState('');
    const [newSkype, setNewSkype] = useState('');
    const [newVoice, setNewVoice] = useState('');
    const [newWorkNotes, setNewWorkNotes] = useState('');
    const [newAdditionalNotes, setNewAdditionalNotes] = useState('');

    useEffect(() => {
        if(!workNotes) {setWorkNotes(document.data.workNotes)}
        if(!additionalNotes) {setAdditionalNotes(document.data.additionalNotes)}
        if(!email) {setEmail(document.data.email)}
    }, []);



    const updateWorkNotes = (event) => {
        event.preventDefault();
        setWorkNotes(workNotes
            .replace("$WHICH$", newAttempt)
            .replace("$SKYPE$", newSkype)
            .replace("$VOICE$", newVoice)
            .replace("$WORKNOTES$", newWorkNotes));
    };
ut

    function onChange(event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function(event) {
            // The file's text will be printed here
            console.log(event.target.result)
        };

        reader.readAsText(file);
    }

    const myJSON = JSON.stringify(document);

    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(document));
    // test.setAttribute("href", dataStr);
    // test.setAttribute("download", "scene.json");
    // test.click();

    return (
        <main className="section-main-view">
            <form action="" className="work-notes-inputs">
                <ul className="work-notes__actions">
                    <li>
                        <label className="work-notes__actions--labels" htmlFor="incident">Please enter the incident number e.g. INC9999999</label>
                        <input className="work-notes__actions--inputs" id="incident" type="text"
                               onChange={event => setNewIncident(event.target.value)} value={newIncident}/>
                    </li>

                    <li>
                        <label className="work-notes__actions--labels" htmlFor="contact-attempt">Please enter the contact attempt</label>
                        <input className="work-notes__actions--inputs" id="contact-attempt" type="text"
                               onChange={event => setNewAttempt(event.target.value)} value={newAttempt}/>
                    </li>

                    <li>
                        <label className="work-notes__actions--labels" htmlFor="skype">Please enter the skype work notes</label>
                        <input className="work-notes__actions--inputs" id="skype" type="text"
                               onChange={event => setNewSkype(event.target.value)} value={newSkype}/>
                    </li>

                    <li>
                        <label className="work-notes__actions--labels" htmlFor="voice">Please enter the voice work notes</label>
                        <input className="work-notes__actions--inputs" id="voice" type="text"
                               onChange={event => setNewVoice(event.target.value)} value={newVoice}/>
                    </li>

                    <li>
                        <label className="work-notes__actions--labels" htmlFor="work-notes">Please enter the work notes</label>
                        <textarea className="work-notes__actions--inputs" id="work-notes"
                               onChange={event => setNewWorkNotes(event.target.value)} value={newWorkNotes}/>
                    </li>
                    <li>
                        <button onClick={event => updateWorkNotes(event)}>Replace</button>
                    </li>
                </ul>
            </form>
            {/*<a href={dataStr} download={'scene.json'} target="_blank">asdf</a>*/}

            <a id="downloadAnchorElem" style={{display: 'none'}}></a>


            <div className="displays">
                <div className="notes-column">
                    <div className="notes-column__work-notes">
                        <textarea onChange={e => setWorkNotes(e.target.value)} value={workNotes} name="" id="" cols="30" rows="10">
                        </textarea>
                    </div>
                    <div className="notes-column__additional-notes">
                        <textarea name="" id="" cols="30" rows="10" value={additionalNotes}
                        onChange={event => setAdditionalNotes(event.target.value)}>
                        </textarea>
                    </div>
                </div>
                <div className="email">
                    <textarea name="" id="" cols="30" rows="10" value={email}
                    onChange={event => setEmail(event.target.value)}>
                    </textarea>
                </div>
            </div>
        </main>
    );
};

export default MainView;