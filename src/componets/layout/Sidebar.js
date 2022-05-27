import React, { useState } from 'react';
import { 
    FaChevronDown, 
    FaInbox, 
    FaRegCalendarAlt, 
    FaRegCalendar 
} from 'react-icons/fa';
import { Projects } from '../Projects'
import { useSelectedProjectValue } from '../../context';
import { AddProject } from '../AddProject';
import { useProjectsValue } from "../../context";


export const Sidebar = () => { 
    const { setSelectedProject, active, setActive } = useSelectedProjectValue();
    const [showProjects, setShowProjects] = useState(true);
    const { showSidebar, setShowSidebar } = useProjectsValue();

    
    return (
        <div  
            className={`sidebar ${showSidebar ? ' sidebar__show' : ''}`} 
            data-testid="sidebar"
            
        >
            <ul className="sidebar__generic">
                <li
                    data-testid="inprogress"
                    className={active === 'inprogress' ? 'active ' : undefined}
                >
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            setActive('inprogress')
                            setSelectedProject('INPROGRESS')
                        }}
                        onKeyDown={() => {
                            setActive('inprogress')
                            setSelectedProject('INPROGRESS')
                        }}
                    >
                        <span>
                            <FaInbox/> 
                        </span>
                        <span>Inprogress</span>
                    </div>
                </li>
                <li
                    data-testid="nowadays"
                    className={active === 'nowadays' ? 'active ' : undefined}
                    >
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            setActive('nowadays')
                            setSelectedProject('NOWADAYS')
                        }}
                        onKeyDown={() => {
                            setActive('nowadays')
                            setSelectedProject('NOWADAYS')
                        }}
                    
                    >
                        <span>
                            <FaRegCalendar/> 
                        </span>
                        <span>Nowadays</span>

                    </div>
                </li>
                <li
                    data-testid="incoming"
                    className={active === 'incoming' ? 'active ' : undefined}
                >
                    <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        setActive('incoming')
                        setSelectedProject('INCOMING')
                    }}
                    onKeyDown={() => {
                        setActive('incoming')
                        setSelectedProject('INCOMING')
                    }}
                    
                    >
                        <span>
                            <FaRegCalendarAlt/> 
                        </span>
                        <span>Incoming</span>
                    </div>
                </li>
            </ul>
            <div 
                className="sidebar__middle" 
                onClick={() => setShowProjects(!showProjects)}
                onKeyDown={() => setShowProjects(!showProjects)}
                role="button"
                tabIndex={0}
            >
                <span>
                    <FaChevronDown 
                        className={!showProjects ? 'hidden-projects' : undefined}
                    />
                </span>
                <h2>Projects</h2>
            </div>

            <ul className="sidebar__projects">{showProjects && <Projects /> }</ul>
            
            {showProjects && <AddProject />}
        </div>
    );
};
