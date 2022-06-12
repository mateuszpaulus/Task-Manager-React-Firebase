export const mainProjects = [
  { key: 'INPROGRESS', name: 'InProgress' },
  { key: 'TOMORROW', name: 'Tomorrow' },
  { key: 'ONLYWEEK', name: 'OnlyWeek' },
  { key: 'THISMONTH', name: 'ThisMonth' }
];

export const getProjectTitle = (projects, projectId) =>
  projects.find((project) => project.projectId === projectId);

export const getConstantsTitle = (projects, key) => projects.find((project) => project.key === key);

export const constantsProjects = (selectedProject) =>
  mainProjects.find((project) => project.key === selectedProject);
