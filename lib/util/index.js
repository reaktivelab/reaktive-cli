export {
  TS,
  JS,
  TEMPLATES_PATH,
  CONFIG_FILE,
  PACKAGE_FILE,
  DEPENDENCY_FILE,
  PROCESS_EXIT_MESSAGE,
  ESLINT_SCRIPT,
  ESLINT_SCRIPT_FIX,
  STYLELINT_SCRIPT,
  STYLELINT_SCRIPT_FIX
} from './constants';

export {
  modifyJsonScripts,
  modifyProjectName,
  supplyEslintPackages,
  copyEslintFiles
} from './modifiers';

export {
  fileExists
} from './system';
