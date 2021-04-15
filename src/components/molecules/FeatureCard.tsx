import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
  headWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    padding: theme.spacing(1) * 1.5,
  },
  headTypoWrapper: {
    paddingTop: theme.spacing(1) * 1.5,
    paddingBottom: theme.spacing(1) * 1.5,
    marginBottom: theme.spacing(0.5),
  },
  lead: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  list: {
    color: theme.palette.text.secondary,
  },
}));

const FeatureCard = (props) => {
  const { Icon, color, headline, lead, body } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.headWrapper}>
        <div
          className={classes.iconWrapper}
          style={{
            color: color,
            fill: color,
          }}
        >
          {Icon}
        </div>
        <div className={classes.headTypoWrapper}>
          <Typography variant="h5">{headline}</Typography>
        </div>
      </div>
      <Typography className={classes.lead} variant="subtitle1">
        {lead}
      </Typography>
      <List dense className={classes.list}>
        {body.map((b, i) => (
          <ListItem key={i}>
            <ArrowRightIcon />
            <ListItemText primary={b} />
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
};

// FeatureCard.propTypes = {
//   Icon: PropTypes.element.isRequired,
//   color: PropTypes.string.isRequired,
//   headline: PropTypes.string.isRequired,
//   lead: PropTypes.string.isRequired,
// };

export default FeatureCard;
