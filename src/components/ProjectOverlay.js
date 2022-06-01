import React from 'react';
import PropTypes from 'prop-types';

import { useProjectsContext } from '../context/projects-context';
import { useTasksContext } from '../context/tasks-context';

export const ProjectOverlay = ({ setProject, showProjectOverlay, setShowProjectOverlay }) => {
  const { projects } = useProjectsContext();
  const { showQuickAddTask } = useTasksContext();

  return (
    projects &&
    showProjectOverlay && (
      <div
        className={
          showQuickAddTask === true ? 'project-overlay project-overlay__quick' : 'project-overlay'
        }
        data-testid="project-overlay">
        <ul className="project-overlay__list">
          {projects.map((project) => (
            <li key={project.projectId} data-testid="project-overlay-action">
              <div
                onClick={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
                onKeyDown={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
                role="button"
                tabIndex={0}>
                {project.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

ProjectOverlay.propTypes = {
  setProject: PropTypes.func.isRequired,
  showProjectOverlay: PropTypes.bool.isRequired,
  setShowProjectOverlay: PropTypes.func.isRequired
};
