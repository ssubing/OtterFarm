import React from "react";

import Navbar from "../../components/Navbar/Navbar";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import sudal from '../../assets/images/sudal.png'

import OnSale from "../../components/NFTInfo/OnSale";

import "./AvatarDetail.css"

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
          <div>분양중</div>
          <div>32</div>
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

const avatarInfo = {
  owner: '이선민',
  address: '0x123515adfasdfbaf44ea907c797788d8dbf',
  start: '2022-09-01 12:00',
  end: '2022-09-04 12:00',
  likeCnt: '20',
  isSale: true
}

function AvatarDetail() {
  return (
    <div>
      <Navbar/>
      <div className="content">
        <MediaCard/>
        <div>
          <OnSale {...avatarInfo}/>
        </div>
      </div>
    </div>
  );
}

export default AvatarDetail;
