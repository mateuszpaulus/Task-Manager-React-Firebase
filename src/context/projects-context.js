import React, { createContext, useContext, useState } from 'react';
import { useProjects } from '../hooks/index';
import PropTypes from 'prop-types';

export const ProjectsContext = createContext();
export const ProjectsProvider = ({ children }) => {
  const { projects, setProjects } = useProjects();

  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedProject, setSelectedProject] = useState('INPROGRESS');
  const [activeProject, setActiveProject] = useState('inprogress');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProjects,
        showSidebar,
        setShowSidebar,
        selectedProject,
        setSelectedProject,
        activeProject,
        setActiveProject,
        darkMode,
        setDarkMode
      }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsContext = () => useContext(ProjectsContext);

ProjectsProvider.propTypes = {
  children: PropTypes.node.isRequired
};
