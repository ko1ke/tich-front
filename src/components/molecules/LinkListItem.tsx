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
      cursor: (disabled) => (disabled ? 'default' : 'pointer'),
    },
  })
);

export interface LinkListItemProps {
  children: React.ReactNode;
  to: string;
  title: string;
  disabled?: boolean;
}

const LinkListItem: React.FC<LinkListItemProps> = ({
  children,
  to,
  title,
  disabled = false,
}) => {
  const classes = useStyles(disabled);

  return (
    <Link to={disabled ? '#' : to} className={classes.link}>
      <ListItem button disabled={disabled}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </Link>
  );
};

export default LinkListItem;
