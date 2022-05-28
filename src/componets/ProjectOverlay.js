import React from 'react';
import { useProjectsValue } from '../context/projects-context';

export const ProjectOverlay = ({
    setProject,
    showProjectOverlay,
    setShowProjectOverlay,
    showQuickAddTask
}) => {
    const { projects } = useProjectsValue();

    return (
        projects && 
        showProjectOverlay && (
            <div className={showQuickAddTask ? 'project-overlay project-overlay__quick' :'project-overlay' }data-testid="project-overlay" >
                <ul className="project-overlay__list">
                    {projects.map((project) => (
                        <li
                            key={project.projectId}
                            data-testid="project-overlay-action"
                        >
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
                                tabIndex={0}
                            >
                                {project.name}
                            </div>
                        </li>

                    ))}
                </ul>
            </div>
        )
    )
}