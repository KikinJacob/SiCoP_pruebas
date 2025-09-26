import React, {createContext, useState, useContext} from 'react';

const RegistroProyectoContext = createContext();

export function useRegistroProyecto() {
    return useContext(RegistroProyectoContext);
}

export function RegistroProyectoProvider({ children }){
    const [proyecto, setProyecto] = useState({});

    const updateProyecto = (data) => {
        setProyecto((prev) => ({...prev, ...data}))
    };

    return (
        <RegistroProyectoContext.Provider value={{proyecto, updateProyecto}}>
            {children}
        </RegistroProyectoContext.Provider>
    );
}