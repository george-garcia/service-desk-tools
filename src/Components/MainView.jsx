import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { document } from "../data/document";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { fetchAllTemplates, createTemplate } from "../actions";
import { connect } from 'react-redux';

const MainView = (props) => {

    props.fetchAllTemplates();

    const [state, setState] = useState({
        workNotesName: '',
        workNotes: '',
        additionalNotes: '',
        email: '',

        newIncident: '',
        newAttempt: '',
        newSkype: '',
        newVoice: '',
        newEmail: '',
        newWorkNotes: '',
        newAdditionalNotes: ''
    });

    // const workNotesRef = useRef(null);
    // const additionalNotesRef = useRef(null);
    // const emailRef = useRef(null);

    useEffect(() => {

        if(props.match.url === '/createTemplate'){
            if(!state.workNotes) {
                setState({ ...state,
                workNotes: document.data.workNotes,
                additionalNotes: document.data.additionalNotes,
                email: document.data.email});
            }
        }

        if(props.match.params.name !== undefined){
            setState({ ...state,
                workNotes: props.template.workNotes,
                additionalNotes: props.template.additionalNotes,
                email: props.template.email
            }) ;
        }

    }, [props.template]);


    const filterObject = (object) => {
        return object
            .replace("$WHICH$", state.newAttempt)
            .replace("$SKYPE$", state.newSkype)
            .replace("$VOICE$", state.newVoice)
            .replace("$WORKNOTES$", state.newWorkNotes)
            .replace("$EMAIL$", state.newEmail)
            .replace("$ADDITIONALNOTES$", state.newAdditionalNotes)
            .replace("$INCIDENT$", state.newIncident);
    };

    const updateWorkNotes = (event) => {
        event.preventDefault();
        setState({ ...state,
            workNotes: filterObject(state.workNotes),
            additionalNotes: filterObject(state.additionalNotes),
            email: filterObject(state.email)
        });
    };

    const saveWorkNotes = (event) => {
        props.createTemplate({
            data: {
                name: state.workNotesName,
                workNotes: state.workNotes,
                additionalNotes: state.additionalNotes,
                email: state.email
            }
        });
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

    console.log(props);


    const myJSON = JSON.stringify(document);

    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(document));

    const renderSaveEditOptions = () => {

        function returnHtml(readOnlyFlag, label){
            return (
                <div className="save-options" >
                    <label htmlFor="save-input" style={{display: 'block'}}>{label}</label>
                    <input id="save-input" type="text" readOnly={readOnlyFlag}
                           onChange={event => setState({
                               ...state, workNotesName: event.target.value } )}
                           value={state.workNotesName}/>

                    <button onClick={event => saveWorkNotes(event)}>Save</button>
                </div>
            );
        }

        if(props.match.url === '/createTemplate'){

            const label = "New Template Name:";

            return returnHtml(false, label);

        } else if(props.match.path === "/editTemplate/:name"){

            const label = "Edit Template Name";

            return returnHtml(true, label);
        }
    };


    return (
        <main className="section-main-view">
            <form action="" className="work-notes-inputs">
                <ul className="work-notes__actions">
                    <li>
                        <label className="work-notes__actions--inputs" htmlFor="incident">Please enter the incident number e.g. INC9999999</label>
                        <input className="work-notes__actions--inputs" id="incident" type="text"
                               onChange={event => setState({
                                   ...state, newIncident: event.target.value } )}
                               value={state.newIncident}/>
                    </li>
                    <li>
                        <label className="work-notes__actions--inputs" htmlFor="contact-attempt">Contact Attempt</label>
                        <input className="work-notes__actions--inputs" id="contact-attempt" type="text"
                               onChange={event => setState({
                                   ...state, newAttempt: event.target.value } )}
                               value={state.newAttempt}/>
                    </li>
                    <li>
                        <label className="work-notes__actions--inputs" htmlFor="skype">Skype Work Notes</label>
                        <input className="work-notes__actions--inputs" id="skype" type="text"
                               onChange={event => setState({
                                   ...state, newSkype: event.target.value } )}
                               value={state.newSkype}/>
                    </li>
                    <li>
                        <label className="work-notes__actions--inputs" htmlFor="voice">Voice Work Notes</label>
                        <input className="work-notes__actions--inputs" id="voice" type="text"
                               onChange={event => setState({
                                   ...state, newVoice: event.target.value } )}
                               value={state.newVoice}/>
                    </li>
                    <li>
                        <label className="work-notes__actions--inputs" htmlFor="email">Email Work Notes</label>
                        <input className="work-notes__actions--inputs" id="email" type="text"
                               onChange={event => setState({
                                   ...state, newEmail: event.target.value } )}
                               value={state.newEmail}/>
                    </li>
                    <li>
                        <label className="work-notes__actions--inputs" htmlFor="work-notes">Work Notes Body</label>
                        <textarea className="work-notes__actions--inputs" id="work-notes"
                               onChange={event => setState({
                                   ...state, newWorkNotes: event.target.value } )}
                               value={state.newWorkNotes}/>
                    </li>
                    <li>
                        <label className="work-notes__actions--inputs" htmlFor="additional-notes">Additional Notes</label>
                        <textarea className="work-notes__actions--inputs" id="additional-notes"
                               onChange={event => setState({
                                   ...state, newAdditionalNotes: event.target.value } )}
                               value={state.newAdditionalNotes}/>
                    </li>
                    <li>
                        <button onClick={event => updateWorkNotes(event)}>Replace</button>
                        <CopyToClipboard text={state.workNotes}>
                            <button onClick={event => event.preventDefault()}>Copy</button>
                        </CopyToClipboard>
                        <button onClick={event => saveWorkNotes(event)}>Save</button>

                    </li>
                </ul>
            </form>
            {/*<a href={dataStr} download={'scene.json'} target="_blank">asdf</a>*/}

            <a id="downloadAnchorElem" style={{display: 'none'}}></a>



            <div className="displays">

                <div className="notes-column">

                    {renderSaveEditOptions()}

                    <div className="notes-column__work-notes">
                        <textarea onChange={e => setState({ ...state, workNotes: e.target.value} )} value={state.workNotes}
                                  name="" id="" cols="30" rows="10">
                        </textarea>
                    </div>
                    <div className="notes-column__additional-notes">
                        <textarea name="" id="" cols="30" rows="10"
                                  onChange={e => setState({ ...state, additionalNotes: e.target.value} )} value={state.additionalNotes}>
                        </textarea>
                    </div>
                </div>
                <div className="email">
                    <textarea name="" id="" cols="30" rows="10"
                              onChange={e => setState({ ...state, email: e.target.value} )} value={state.email}>
                    </textarea>
                </div>
            </div>
        </main>
    );
};

const mapStateToProps = (state, prevProps) => {

    if(prevProps.match.params.name){
        return { template: state.templates[prevProps.match.params.name] };
    }
};

export default connect(mapStateToProps, { fetchAllTemplates, createTemplate })(MainView);