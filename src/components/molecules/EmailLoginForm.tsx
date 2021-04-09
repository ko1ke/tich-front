import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import TextInput from '../atoms/TextInput';
import Button from '@material-ui/core/Button';
import { fetchEmailUser } from '../../features/userSlice';
import { AuthProps } from '../../typings';
import {
  required,
  mustBeEmail,
  minLength,
  composeValidators,
} from '../../utils/validator';

const useStyles = makeStyles((theme) => ({
  fields: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2.5),
  },
}));

const EmailLoginForm: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = async (values: AuthProps) => {
    dispatch(fetchEmailUser(values));
  };

  return (
    <>
      <Typography component="h3" variant="h6" color="inherit" noWrap>
        Email login
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
            <div className={classes.fields}>
              <div>
                <Field<string>
                  validate={composeValidators(required, mustBeEmail)}
                  name="email"
                  component={TextInput}
                  placeholder="Email"
                />
              </div>
              <div>
                <Field<string>
                  validate={composeValidators(required, minLength(6))}
                  name="password"
                  type="password"
                  component={TextInput}
                  placeholder="Password"
                />
              </div>
            </div>
            <div className={classes.buttons}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting || pristine || !valid}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={form.reset as () => void}
                disabled={submitting || pristine}
              >
                Reset
              </Button>
            </div>
          </form>
        )}
      />
    </>
  );
};

export default EmailLoginForm;
