import { useState, useEffect } from 'react';
import moment from "moment";
// import {firebaseApp} from '../firebase';
import {firebase} from '../firebase';
import { collatedTasksExist } from '../helpers/index';



// no props its regular function = secectedproject
export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        let unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .where('userId', '==', '048ByaC97FbY5CQ47');

        unsubscribe = 
            selectedProject && !collatedTasksExist(selectedProject)  
                ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject)) 
                : selectedProject === 'NOWADAYS'
                ? (unsubscribe = unsubscribe.where(
                    'date', 
                    '==', 
                    moment().format('DD/MM/YYYY')
                    ))
                : selectedProject === 'INPROGRESS' || selectedProject === 0
                ? (unsubscribe = unsubscribe.where('date', '==', ''))
                : unsubscribe;

        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }));

            setTasks(
                selectedProject === 'INCOMING'
                ? newTasks.filter( 
                    task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && 
                    task.archived !== true
                )
                : newTasks.filter(task => task.archived !== true)
            );

            setArchivedTasks(newTasks.filter(task => task.archived !== false ))
        })  

        return () => unsubscribe();   
    }, [selectedProject]);

    return { tasks, archivedTasks };
    
};

export const useProjects = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase
        .firestore()
        .collection('projects')
        .where('userId', '==', '048ByaC97FbY5CQ47')
        .orderBy('projectId')
        .get()
        .then(snapshot => {
            const allProjects = snapshot.docs.map(project => ({
                ...project.data(),
                docId: project.id,
            }));

            // zeby nie bylo nieskonczonego odswiezania rerender loop
            if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                setProjects(allProjects);
            }
        });
    }, [projects]);

    return { projects, setProjects };
};