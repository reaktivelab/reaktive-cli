export const CONFIG_FILE = 'reaktive.json';
export const PACKAGE_FILE = 'package.json';
export const DEPENDENCY_FILE = 'dependencies.json';

export const TS = 'typescript';
export const JS = 'javascript'

export const ESLINT_SCRIPT = "eslint \"**/*.{js,jsx,ts,tsx}\" --ignore-pattern node_modules/";
export const ESLINT_SCRIPT_FIX = "eslint \"**/*.{js,jsx,ts,tsx}\" --ignore-pattern node_modules/ --fix";
export const STYLELINT_SCRIPT = "stylelint \"./src/app/**/**.scss\"";
export const STYLELINT_SCRIPT_FIX = "npx stylelint \"./src/app/**/**.scss\" --fix";

export const TEMPLATES_PATH = '../../templates';
