export const mainProjects = [
  { key: 'INPROGRESS', name: 'InProgress' },
  { key: 'FORTODAY', name: 'ForToday' },
  { key: 'ONLYWEEK', name: 'OnlyWeek' }
];

export const getProjectTitle = (projects, projectId) =>
  projects.find((project) => project.projectId === projectId);

export const getConstantsTitle = (projects, key) => projects.find((project) => project.key === key);

export const constantsProjects = (selectedProject) =>
  mainProjects.find((project) => project.key === selectedProject);
