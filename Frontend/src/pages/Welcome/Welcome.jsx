import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import sudal from '../../assets/images/sudal.png'

function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={sudal}
        alt="green iguana"
      />
      <CardContent>
        <div className="info">
          <span>분양중</span>
          <span>32</span>
        </div>
        <Typography gutterBottom variant="h5" component="div">
          수달(NFT) 정보
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
}

function Welcome() {
  return (
    <div>
      <Navbar />
      <MediaCard/>
    </div>
  );
}

export default Welcome;
