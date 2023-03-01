import React from 'react';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import TextInput from '../atoms/TextInput';
import Button from '@mui/material/Button';
import { createEmailUser } from '../../features/userSlice';
import { AuthProps } from '../../typings';
import {
  required,
  mustBeEmail,
  minLength,
  composeValidators,
} from '../../utils/validator';
import { styled } from '@mui/system';

const EmailSignUpForm: React.FC = () => {
  const ButtonsWrapper = styled('div')(({ theme }) => ({
    '& > *': {
      margin: theme.spacing(1.75),
    },
    marginTop: theme.spacing(1.75),
    marginBottom: theme.spacing(1.75),
  }));

  const FieldsWrapper = styled('div')(({ theme }) => ({
    '& > *': {
      margin: theme.spacing(1),
    },
  }));

  const dispatch = useDispatch();

  const onSubmit = async (values: AuthProps) => {
    dispatch(createEmailUser(values));
  };

  return (
    <>
      <Typography component="h3" variant="h6" color="inherit" noWrap>
        Email SignUp
      </Typography>
      <Form
        onSubmit={onSubmit}
        initialValues={{ email: '', password: '' }}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          valid,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <FieldsWrapper>
              <div>
                <Field<string>
                  validate={composeValidators(required, mustBeEmail)}
                  name="email"
                  component={TextInput}
                  placeholder="Email"
                  variant="standard"
                />
              </div>
              <div>
                <Field<string>
                  validate={composeValidators(required, minLength(6))}
                  name="password"
                  type="password"
                  component={TextInput}
                  placeholder="Password"
                  variant="standard"
                />
              </div>
            </FieldsWrapper>
            <ButtonsWrapper>
              <span>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting || pristine || !valid}
                >
                  Submit
                </Button>
              </span>
              <span>
                <Button
                  variant="contained"
                  onClick={form.reset as () => void}
                  disabled={submitting || pristine}
                >
                  Reset
                </Button>
              </span>
            </ButtonsWrapper>
          </form>
        )}
      />
    </>
  );
};

export default EmailSignUpForm;
