import React from 'react';
import { Container, Typography } from '@mui/material';
import FeatureCard from '../molecules/FeatureCard';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LabelIcon from '@mui/icons-material/Label';

const iconSize = 30;
const features = [
  {
    color: '#00C853',
    headline: 'Company News',
    lead: 'Read articles to study companies',
    body: [
      'articles not only financial news, but also personal views (from reddit and Hacker News)',
      'search articles by ticker symbols, and registered symbols in your portfolio',
      'share article by SNS (twitter, Facebook, reddit) easy',
    ],
    icon: <LocationCityIcon style={{ fontSize: iconSize }} />,
  },
  {
    color: '#6200EA',
    headline: 'Market News',
    lead: 'Read articles to overlook the market',
    body: [
      'search articles by single keyword',
      'share article by SNS (twitter, Facebook, reddit) easy',
    ],
    icon: <AttachMoneyIcon style={{ fontSize: iconSize }} />,
  },
  {
    color: '#F44336',
    headline: 'Favorite News',
    lead: 'Read articles you liked by clicking/tapping heart icons',
    body: [
      'search articles by single keyword',
      'share article by SNS (twitter, Facebook, reddit) easy',
    ],
    icon: <FavoriteIcon style={{ fontSize: iconSize }} />,
  },
  {
    color: '#0091EA',
    headline: 'Portfolio',
    lead: 'Register your stock information to analysis efficient',
    body: [
      'if you register something, can find news related to your registered companies in Company News. (Select "Your Favorites")',
      'hyperlinks to charts of MarketWatch',
    ],
    icon: <LabelIcon style={{ fontSize: iconSize }} />,
  },
];

const FeatureSection: React.FC = () => {
  return (
    <>
      <Typography variant="h3" align="center" component="h2">
        Features
      </Typography>
      <Container>
        {features.map((element, i) => (
          <FeatureCard
            key={i}
            Icon={element.icon}
            color={element.color}
            headline={element.headline}
            lead={element.lead}
            body={element.body}
          />
        ))}
      </Container>
    </>
  );
};

export default FeatureSection;
