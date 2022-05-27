import React, { createContext, useContext, useState } from "react";
import { useProjects } from '../hooks/index'


export const ProjectsContext = createContext();
export const ProjectsProvider = ({ children }) => {
    const { projects, setProjects } = useProjects();
    const [showSidebar, setShowSidebar] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    return(
        <ProjectsContext.Provider 
            value={{ 
                projects, 
                setProjects, 
                showSidebar, 
                setShowSidebar,
                darkMode,
                setDarkMode,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export const useProjectsValue = () => useContext(ProjectsContext);