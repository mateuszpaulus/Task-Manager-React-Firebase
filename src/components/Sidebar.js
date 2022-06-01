import React, { useState } from 'react';
import { FaChevronDown, FaRegCalendarAlt, FaRegCalendarTimes, FaRegCalendar } from 'react-icons/fa';
import { ProjectsList } from './ProjectsList';
import { AddProject } from './AddProject';
import { useProjectsContext } from '../context/projects-context';

export const Sidebar = () => {
  const [showProjectsList, setShowProjectsList] = useState(true);
  const { setSelectedProject, activeProject, setActiveProject, showSidebar } = useProjectsContext();

  return (
    <div className={showSidebar ? 'sidebar sidebar__show' : 'sidebar'} data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="inprogress"
          className={activeProject === 'inprogress' ? 'active ' : undefined}>
          <div
            data-testid="inbox-click"
            role="button"
            tabIndex={0}
            onClick={() => {
              setActiveProject('inprogress');
              setSelectedProject('INPROGRESS');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActiveProject('inprogress');
                setSelectedProject('INPROGRESS');
              }
            }}>
            <span>
              <FaRegCalendar />
            </span>
            <span>InProgress</span>
          </div>
        </li>
        <li data-testid="nowadays" className={activeProject === 'fortoday' ? 'active ' : undefined}>
          <div
            data-testid="fortoday-click"
            role="button"
            tabIndex={0}
            onClick={() => {
              setActiveProject('fortoday');
              setSelectedProject('FORTODAY');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActiveProject('ForToday');
                setSelectedProject('FORTODAY');
              }
            }}>
            <span>
              <FaRegCalendarTimes />
            </span>
            <span>ForToday</span>
          </div>
        </li>
        <li data-testid="onlyweek" className={activeProject === 'onlyweek' ? 'active ' : undefined}>
          <div
            data-testid="incoming-click"
            role="button"
            tabIndex={0}
            onClick={() => {
              setActiveProject('onlyweek');
              setSelectedProject('ONLYWEEK');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActiveProject('onlyweek');
                setSelectedProject('ONLYWEEK');
              }
            }}>
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>OnlyWeek</span>
          </div>
        </li>
      </ul>
      <div
        className="sidebar__middle"
        onClick={() => setShowProjectsList(!showProjectsList)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowProjectsList(!showProjectsList);
        }}
        role="button"
        tabIndex={0}>
        <span>
          <FaChevronDown className={!showProjectsList ? 'hidden-projects' : undefined} />
        </span>
        <h2>Projects</h2>
      </div>

      <ul className="sidebar__projects">{showProjectsList && <ProjectsList />}</ul>

      {showProjectsList && <AddProject />}
    </div>
  );
};