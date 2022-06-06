import React from 'react';
import { useProjectsContext } from '../context/projects-context';
import { SingleProject } from './SingleProject';

export const ProjectsList = () => {
  const { projects, setSelectedProject, activeProject, setActiveProject } = useProjectsContext();

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid="project-single-test"
        className={
          activeProject === project.projectId ? 'active sidebar__project' : 'sidebar__project'
        }
        role="button"
        tabIndex={0}
        onClick={() => {
          setActiveProject(project.projectId);
          setSelectedProject(project.projectId);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setActiveProject(project.projectId);
            setSelectedProject(project.projectId);
          }
        }}>
        <SingleProject project={project} />
      </li>
    ))
  );
};
