import fs from 'fs';
import path from 'path';

const PROJECT_PREFIX = 'efx-';

/**
 * Remove backslash
 * @param targetDir - target directory name
 * @returns trimmed directory name 
 */
const formatTargetDir = (targetDir: string) => {
  if (!targetDir) {
    return '';
  }
  return targetDir.trim().replace(/\/+$/g, '');
};

const formatProjectName = (projectName: string): string => {
  if (!projectName) {
    return PROJECT_PREFIX;
  }
  return projectName.startsWith(PROJECT_PREFIX) ? projectName : `${PROJECT_PREFIX}${projectName}`;
};

const validateProjectName = (name: string) => {
  let error = '';

  if (!name) {
    error = 'Missing project name.';
  }

  else if ((/[A-Z]/).test(name)) {
    error = 'Project name must not contain uppercase ASCII characters.';
  }

  else if (name.endsWith('-')) {
    error = 'Project name should not end with a hyphen.';
  }
  
  else if ((/\./).test(name)) {
    error = 'Project name should not contain a dot character as it would need to be escaped in a CSS selector.';
  }
  
  else if ((/[^\u0020-\u007E]/).test(name)) {
    error = 'Project name should not contain non-ASCII characters.';
  }
  
  else if ((/--/).test(name)) {
    error = 'Project name should not contain consecutive hyphens.';
  }
  
  else if ((/[^a-z\d]{2}/i).test(name)) {
    error = 'Project name should not contain consecutive non-alpha characters.';
  }

  return error;
};

const isEmptyDir = (path: string) => {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
};

const emptyDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
};

export {
  formatTargetDir,
  formatProjectName,
  validateProjectName,
  isEmptyDir,
  emptyDir
};

