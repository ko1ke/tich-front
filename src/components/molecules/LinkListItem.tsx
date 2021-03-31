import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: theme.palette.text.secondary,
    },
  })
);

export interface LinkListItemProps {
  children: React.ReactNode;
  to: string;
  title: string;
}

const LinkListItem: React.FC<LinkListItemProps> = ({ children, to, title }) => {
  const classes = useStyles();

  return (
    <Link to={to} className={classes.link}>
      <ListItem button>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </Link>
  );
};

export default LinkListItem;
