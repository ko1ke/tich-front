import React, { Fragment } from 'react';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

type Props = {
  Icon: React.ReactNode;
  color: string;
  headline: string;
  lead: string;
  body: string[];
};

const FeatureCard: React.FC<Props> = ({
  Icon,
  color,
  headline,
  lead,
  body,
}) => {
  const theme = useTheme();

  const IconWrapper = styled('div')({
    padding: theme.spacing(1.5),
    color: color,
    fill: color,
  });

  const TitleWrapper = styled('div')({
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
  });

  const HeaderWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  });

  return (
    <Fragment>
      <HeaderWrapper>
        <IconWrapper>{Icon}</IconWrapper>
        <TitleWrapper>
          <Typography variant="h5">{headline}</Typography>
        </TitleWrapper>
      </HeaderWrapper>
      <Typography
        sx={{ paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) }}
        variant="subtitle1"
      >
        {lead}
      </Typography>
      <List sx={{ color: theme.palette.text.secondary }} dense>
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

export default FeatureCard;
