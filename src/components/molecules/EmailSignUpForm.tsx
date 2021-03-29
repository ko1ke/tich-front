import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import TextInput from '../atoms/TextInput';
import Button from '@material-ui/core/Button';
import { createEmailUser } from '../../features/userSlice';
import { AuthProps } from '../../typings';

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
    padding: 20,
  },
}));

const EmailSignUpForm: React.FC = () => {
  const classes = useStyles();
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
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className={classes.fields}>
              <div>
                <Field<string>
                  name="email"
                  component={TextInput}
                  placeholder="email"
                />
              </div>
              <div>
                <Field<string>
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
                disabled={submitting || pristine}
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

export default EmailSignUpForm;
