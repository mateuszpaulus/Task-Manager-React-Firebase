import React, { createContext, useContext, useState} from "react";



export const SelectedProjectContext = createContext();
export const SelectedProjectProvider = ({ children }) => {
    const [selectedProject, setSelectedProject ] = useState('NOWADAYS');
    const [active, setActive] = useState('nowadays');
    return(
        <SelectedProjectContext.Provider 
            value={{selectedProject, setSelectedProject, active, setActive}}
        >
            {children}
        </SelectedProjectContext.Provider>
    );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);