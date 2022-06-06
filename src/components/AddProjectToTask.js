import React from 'react';
import PropTypes from 'prop-types';

import { useProjectsContext } from '../context/projects-context';
import { useTasksContext } from '../context/tasks-context';

export const AddProjectToTask = ({ setProject, showProject, setShowProject }) => {
  const { projects } = useProjectsContext();
  const { showQuickAddTask } = useTasksContext();

  return (
    projects &&
    showProject && (
      <div
        className={showQuickAddTask ? 'project-totask project-totask__quick' : 'project-totask'}
        data-testid="project-totask-test">
        <ul className="project-totask__list">
          {projects.map((project) => (
            <li key={project.projectId} data-testid="project-totask-list">
              <div
                onClick={() => {
                  setProject(project.projectId);
                  setShowProject(false);
                }}
                onKeyDown={() => {
                  setProject(project.projectId);
                  setShowProject(false);
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

AddProjectToTask.propTypes = {
  setProject: PropTypes.func.isRequired,
  showProject: PropTypes.bool.isRequired,
  setShowProject: PropTypes.func.isRequired
};
