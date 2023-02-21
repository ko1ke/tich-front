module.exports = [
  {
    type: 'select',
    name: 'atomic',
    message: 'select directory',
    choices: ['atoms', 'molecules', 'organisms', 'templates', 'pages'],
  },
  {
    type: 'select',
    name: 'files_required',
    message: 'select files required',
    choices: ['component', 'story', 'both'],
  },
  {
    type: 'input',
    name: 'component_name',
    message: 'input component name',
    validate: (input) => input !== '',
  },
];
