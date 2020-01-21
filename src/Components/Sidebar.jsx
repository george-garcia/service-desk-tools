import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const Sidebar = ({templates}) => {

    if(!templates["Default Template"]){
        return (
            <div>
                Loading...
            </div>
        );
    }


    const populateSidebar = () => {
        const links = [];

        // templates.map(template => {
        //     links.push(
        //         <li key={template.name}>
        //             <a href="#">{template.name}</a>
        //         </li>
        //     );
        // });


        for(let i in templates){
            links.push(
                    <li key={templates[i].name} className="sidebar-list--item">
                        <Link to={`/use/${templates[i].name}`} className="sidebar-list--link">{templates[i].name}</Link>
                    </li>
                );
        }
        return links;
    };

    // console.log(templates["Default Template"].additionalNotes);


    return (
        <nav className="section-sidebar">
            <ul className="sidebar-list">
                <li className="sidebar-list--item">
                    <Link to={`/createTemplate`} className="sidebar-list--link">Create Template</Link>
                </li>
                {populateSidebar()}
            </ul>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return { templates: state.templates };
};

export default connect(mapStateToProps)(Sidebar);