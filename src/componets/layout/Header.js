import React, { useState } from "react"
import { FaMoon, FaPlus, FaBars } from 'react-icons/fa';
import { AddTask } from "../AddTask";
import { useProjectsValue } from '../../context/projects-context';
import { useSelectedProjectValue } from '../../context/selected-project-context';

export const Header = () => {
    
    const [shouldShowMain, setShouldShowMain] = useState(false);
    const [showQuickAddTask, setShowQuickAddTask] = useState(false);
    const { setSelectedProject, setActive } =  useSelectedProjectValue();
    const { 
        showSidebar, 
        setShowSidebar, 
        darkMode, 
        setDarkMode
    } = useProjectsValue();
    
    return (
        <header 
            data-testid="header"
            className={`header ${darkMode ? "darkmode" : ''}`}
        >
            <nav>
                <div className="navbar">
                    <ul>
                        <li 
                            className="navbar__toggle"
                            data-testid="navbar-toggle"
                        >
                            <button
                                type="button"    
                                onClick={() => {
                                    setShowSidebar(!showSidebar)
                                }}
                            >
                                <FaBars />
                            </button>
                        </li>
                        <li 
                            className="navbar__logo"
                            data-test-id="navbar-logo"
                        >

                            <button
                                type="button"
                                onClick={() => {
                                    setActive('nowadays');
                                    setSelectedProject('NOWADAYS')
                                }}
                            >
                                <img src="./images/logo.png" alt="Task manager" />
                            </button>
                        </li>       
                    </ul>
                </div>
                <div className="settings">
                    <ul>
                        <li 
                            data-testid="quick-add-tasks-action" 
                            className="settings__add"
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    setShowQuickAddTask(true);
                                    setShouldShowMain(true)
                                }}
                                onKeyDown={() => {
                                    setShowQuickAddTask(true);
                                    setShouldShowMain(true);
                                }}
                            >
                                <FaPlus />
                            </button>
                        </li>
                        <li 
                            data-testid="dark-mode-action" 
                            className="settings__darkmode "
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    setDarkMode(!darkMode)
                                }}
                                onKeyDown={() => {
                                    setDarkMode(!darkMode)
                                }}
                            >
                                <FaMoon />
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            
            <AddTask 
                showAddTaskMain={false}
                shouldShowMain={shouldShowMain}
                showQuickAddTask={showQuickAddTask}
                setShowQuickAddTask={setShowQuickAddTask}
            />
        </header>
    );
};