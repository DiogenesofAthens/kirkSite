import { generateYaml } from '../app/actions/generate-yaml';

// We can't easily execute this without mocking 'ai' and 'process.env',
// but we can check if the file compiles and functions export correctly.
console.log("generateYaml is a function:", typeof generateYaml === 'function');
