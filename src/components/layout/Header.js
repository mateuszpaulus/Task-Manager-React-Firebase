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
        <div className="set">
          <ul>
            <li className="set__sidebar">
              <button
                data-testid="set-sidebar"
                type="button"
                onClick={() => {
                  setShowSidebar(!showSidebar);
                }}>
                <FaBars />
              </button>
            </li>
            <li className="set__logo">
              <button
                data-testid="set-logo"
                type="button"
                onClick={() => {
                  setActiveProject('fortoday');
                  setSelectedProject('FORTODAY');
                }}>
                <img src="./images/logo.png" alt="Task manager" />
              </button>
            </li>
          </ul>
        </div>
        <div className="add">
          <ul>
            <li className="add__tasks">
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
            <li className="add__darkmode ">
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
