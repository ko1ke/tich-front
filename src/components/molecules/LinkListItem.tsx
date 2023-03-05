import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

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
  const theme = useTheme();

  const StyledLink = styled(Link)({
    textDecorationLine: 'none',
    color: theme.palette.text.secondary,
    cursor: disabled ? 'default' : 'pointer',
  });

  return (
    <StyledLink to={disabled ? '#' : to}>
      <ListItem button disabled={disabled}>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </StyledLink>
  );
};

export default LinkListItem;
