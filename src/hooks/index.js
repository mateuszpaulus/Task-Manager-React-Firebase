import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { constantsProjects } from '../constants/constants';

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', '048ByaC97FbY5CQ47');

    unsubscribe =
      selectedProject && !constantsProjects(selectedProject)
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject === 'FORTODAY'
        ? (unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')))
        : selectedProject === 'INPROGRESS' || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        ...task.data(),
        id: task.id
      }));

      setTasks(
        selectedProject === 'ONLYWEEK'
          ? newTasks.filter((task) => {
              return (
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') >= 1 &&
                task.archived !== true
              );
            })
          : selectedProject === 'THISMONTH'
          ? newTasks.filter((task) => {
              return (
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'months') <= 1 &&
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') >= 7 &&
                task.archived !== true
              );
            })
          : newTasks.filter((task) => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

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
      .orderBy('date')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
