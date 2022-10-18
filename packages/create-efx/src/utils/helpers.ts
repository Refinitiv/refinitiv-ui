import fs from 'fs';
import path from 'path';

const PROJECT_PREFIX = 'efx-';

/**
 * Get basename of target directory
 * @param targetDir target directory
 * @return basename
 */
const getProjectName = (targetDir: string | undefined) =>
  targetDir ? path.basename(path.resolve(targetDir)) : '';

/**
 * Add prefix to project name
 * @param projectName project name to format
 * @return formatted project name
 */
const formatProjectName = (projectName: string): string => {
  if (!projectName) {
    return PROJECT_PREFIX;
  }
  return projectName.startsWith(PROJECT_PREFIX) ? projectName : `${PROJECT_PREFIX}${projectName}`;
};

/**
 * Validate the project name
 * @param name name to validate
 * @return error message if the name is invalid
 */
const validateProjectName = (name: string) => {
  let error = '';

  if (!name) {
    error = 'Missing project name.';
  }

  else if ((/[A-Z]/).test(name)) {
    error = 'Project name must not contain uppercase ASCII characters.';
  }

  else if (name.startsWith('-')) {
    error = 'Project name should not start with a hyphen.';
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

  else if (!(/^[a-zA-Z]/).test(name)) {
    error = 'Project name should staring with characters.';
  }

  else if (!(/[a-zA-Z]$/).test(name)) {
    error = 'Project name should ending with characters.';
  }

  else if (!((/^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/).test(name))) {
    error = 'Invalid project name.';
  }

  return error;
};

/**
 * Check if the directory is empty
 * @param dir directory to check
 * @return true if directory is empty
 */
const isEmptyDir = (dir: string) => {
  const files = fs.readdirSync(dir);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
};

/**
 * Check if the directory is already exist
 * @param dir directory to check
 * @return true if directory is already exist
 */
const isDirExist = (dir: string) => fs.existsSync(dir) && !isEmptyDir(dir);

/**
 * Remove all the files in directory
 * @param dir directory to empty
 * @return {void}
 */
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
  getProjectName,
  formatProjectName,
  validateProjectName,
  emptyDir,
  isDirExist
};
