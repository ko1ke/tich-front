const emailReg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

export const required = (value) => (value ? undefined : 'Required');
export const mustBeEmail = (value) =>
  emailReg.test(value) ? undefined : 'Must be a Email format';
export const minLength = (min: number) => (value) =>
  value.length >= min ? undefined : `Should be ${min} characters at least`;
export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
