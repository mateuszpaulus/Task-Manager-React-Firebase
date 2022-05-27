import React from 'react';
import { useProjectsValue, useSelectedProjectValue } from '../context/index';
import { IndividualProject } from './IndividualProject'; 


export const Projects = () => {
    const { setSelectedProject, active, setActive } = useSelectedProjectValue();
    const { projects } = useProjectsValue();
    
    return (
        projects &&
        projects.map((project) => (
            <li
                key={project.projectId}
                data-doc-id={project.docId}
                data-testid="project-action"
                className= {
                    active === project.projectId
                    ? 'active sidebar__project'
                    : 'sidebar__project'
                }
                role="button"
                tabIndex={0}
                onClick={() => {
                    setActive(project.projectId);
                    setSelectedProject(project.projectId)
                }}
                onKeyDown={() => {
                    setActive(project.projectId);
                    setSelectedProject(project.projectId)
                }}    
            > 
                <IndividualProject project={project}/>
            </li> 
        ))
    );
};