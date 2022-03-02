import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarButtons } from '../helpers/SidebarButtons';

const Sidebar = props => {

    const navigate = useNavigate();

    return (
        <div className='sidebar'>
            <ul className='sidebarList'>
                {SidebarButtons.map((value, key) => {
                    return (
                        <li 
                            className='row'
                            key={key}
                            onClick={() => {
                                navigate(value.link);
                            }}>
                            <div id="icon">{value.icon}</div>
                            <div id="title">{value.title}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};


export default Sidebar;