import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { document } from "../data/document";

const MainView = (props) => {

    const [workNotes,setWorkNotes] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [email, setEmail] = useState('');

    const [newIncident, setNewIncident] = useState('');
    const [newAttempt, setNewAttempt] = useState('First');
    const [newSkype, setNewSkype] = useState('N/A');
    const [newVoice, setNewVoice] = useState('N/A');
    const [newEmail, setNewEmail] = useState('N/A');
    const [newWorkNotes, setNewWorkNotes] = useState('');
    const [newAdditionalNotes, setNewAdditionalNotes] = useState('');

    const workNotesRef = useRef(null);
    const additionalNotesRef = useRef(null);
    const emailRef = useRef(null);

    useEffect(() => {
        if(!workNotes) {setWorkNotes(document.data.workNotes)}
        if(!additionalNotes) {setAdditionalNotes(document.data.additionalNotes)}
        if(!email) {setEmail(document.data.email)}
    }, []);

    const styles = {
        labels: {
            class: "work-notes__actions--labels",
            inputDescriptions: [
                "Please enter the incident number e.g. INC9999999",
                "Please enter the contact attempt",
                "Please enter the skype work notes",
                "Please enter the voice work notes",
                "Please enter the email work notes"
            ],
            areaDescriptions:[
                "Please enter the body of the work notes",
                "Please enter the additional notes"
            ]
        },
        inputs: {
            class: "work-notes__actions--inputs",
            type: "text",
            ids: [
                {
                    id: "incident",
                    setter: setNewIncident,
                    getter: newIncident
                },
                {
                    id: "contact-attempt",
                    setter: setNewAttempt,
                    getter: newAttempt
                },
                {
                    id: "skype",
                    setter: setNewSkype,
                    getter: newSkype
                },
                {
                    id: "voice",
                    setter: setNewVoice,
                    getter: newVoice
                },
                {
                    id: "email",
                    setter: setNewEmail,
                    getter: newEmail
                }
            ]
        },
        textAreas: {
            class: "work-notes__actions--inputs",
            ids: [
                {
                    id: "work-notes",
                    setter: setNewWorkNotes,
                    getter: newWorkNotes
                },
                {
                    id: "additional-notes",
                    setter: setNewAdditionalNotes,
                    getter: newAdditionalNotes
                }
            ]
        }
    };


    const populateInputs = () => {
        let inputs = [];

        for(let i = 0; i < styles.inputs.ids.length; i++){
            inputs.push(
                <li key={styles.inputs.ids.id}>
                    <label className={styles.labels.class} htmlFor={styles.inputs.ids[i].id}>{styles.labels.inputDescriptions[i]}</label>
                    <input className={styles.inputs.class} id={styles.inputs.ids[i].id} type={styles.inputs.type}
                           onChange={event => styles.inputs.ids[i].setter(event.target.value)}
                           value={styles.inputs.ids[i].getter}/>
                </li>
            )
        }

        return inputs;
    };

    const populateTextarea = () => {
        let textareas = [];

        for(let i = 0; i < styles.textAreas.ids.length; i++){
            textareas.push(
                <li key={styles.textAreas.ids.id}>
                    <label className={styles.labels.class} htmlFor={styles.textAreas.ids[i].id}>{styles.labels.areaDescriptions[i]}</label>
                    <textarea className={styles.textAreas.class} id={styles.textAreas.ids[i]}
                           onChange={event => styles.textAreas.ids[i].setter(event.target.value)}
                           value={styles.textAreas.ids[i].getter}/>
                </li>
            )
        }

        return textareas;
    };

    const updateWorkNotes = (event) => {
        event.preventDefault();
        setWorkNotes(workNotes
            .replace("$WHICH$", newAttempt)
            .replace("$SKYPE$", newSkype)
            .replace("$VOICE$", newVoice)
            .replace("$WORKNOTES$", newWorkNotes)
            .replace("$EMAIL$", newEmail));

        setAdditionalNotes(additionalNotes
            .replace("$ADDITIONALNOTES$", newAdditionalNotes));
    };

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
                    {populateInputs()}
                    {populateTextarea()}
                    <li>
                        <button onClick={event => updateWorkNotes(event)}>Replace</button>
                        <button>Copy</button>
                    </li>
                </ul>
            </form>
            {/*<a href={dataStr} download={'scene.json'} target="_blank">asdf</a>*/}

            <a id="downloadAnchorElem" style={{display: 'none'}}></a>


            <div className="displays">
                <div className="notes-column">
                    <div className="notes-column__work-notes">
                        <textarea onChange={e => setWorkNotes(e.target.value)} value={workNotes}
                                  name="" id="" cols="30" rows="10" ref={workNotesRef}>
                        </textarea>
                    </div>
                    <div className="notes-column__additional-notes">
                        <textarea name="" id="" cols="30" rows="10" value={additionalNotes} ref={additionalNotesRef}
                        onChange={event => setAdditionalNotes(event.target.value)}>
                        </textarea>
                    </div>
                </div>
                <div className="email">
                    <textarea name="" id="" cols="30" rows="10" value={email} ref={emailRef}
                    onChange={event => setEmail(event.target.value)}>
                    </textarea>
                </div>
            </div>
        </main>
    );
};

export default MainView;