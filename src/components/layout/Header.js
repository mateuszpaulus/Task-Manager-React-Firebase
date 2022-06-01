import React from 'react';
import { FaMoon, FaPlus, FaBars } from 'react-icons/fa';
import { useProjectsContext } from '../../context/projects-context';
import { useTasksContext } from '../../context/tasks-context';

export const Header = () => {
  const {
    showSidebar,
    setShowSidebar,
    setSelectedProject,
    setActiveProject,
    darkMode,
    setDarkMode
  } = useProjectsContext();
  const { showMainAddTask, setShowMainAddTask, showQuickAddTask, setShowQuickAddTask } =
    useTasksContext();

  return (
    <header data-testid="header" className="header">
      <nav>
        <div className="navbar">
          <ul>
            <li className="navbar__toggle">
              <button
                data-testid="navbar-toggle"
                type="button"
                onClick={() => {
                  setShowSidebar(!showSidebar);
                }}>
                <FaBars />
              </button>
            </li>
            <li className="navbar__logo">
              <button
                data-testid="navbar-logo"
                type="button"
                onClick={() => {
                  setActiveProject('nowadays');
                  setSelectedProject('NOWADAYS');
                }}>
                <img src="./images/logo.png" alt="Task manager" />
              </button>
            </li>
          </ul>
        </div>
        <div className="settings">
          <ul>
            <li className="settings__add">
              <button
                data-testid="quick-add-tasks"
                type="button"
                onClick={() => {
                  setShowQuickAddTask(!showQuickAddTask);
                  setShowMainAddTask(!showMainAddTask);
                }}>
                <FaPlus />
              </button>
            </li>
            <li className="settings__darkmode ">
              <button
                data-testid="dark-mode"
                type="button"
                onClick={() => {
                  setDarkMode(!darkMode);
                }}>
                <FaMoon />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
