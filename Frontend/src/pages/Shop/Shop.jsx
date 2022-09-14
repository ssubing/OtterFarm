import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Shop.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import avatar from "../../assets/images/avatar.png";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import ShowSale from "../../components/Card/ShowSale";
import Like from "../../components/Card/Like";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  gridRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    // width: 500,
    // height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    // transform: "translateZ(0)",
  },
  root: {
    width: 345,
    padding: 30,
    backgroundColor: "#F3E9DC",
    borderRadius: "20px",
  },
  media: {
    height: 450,
    border: "2px solid",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
  },
}));

const datas = [
  {
    img: avatar,
    isOnSale: true,
    title: "벌크업 수달",
    price: "0.04",
    owner: "수빙수",
  },
  {
    img: avatar,
    isOnSale: false,
    title: "벌크업 수달",
    price: "0.04",
    owner: "수빙수",
  },
  {
    img: avatar,
    isOnSale: true,
    title: "벌크업 수달",
    price: "0.04",
    owner: "수빙수",
  },
  {
    img: avatar,
    isOnSale: true,
    title: "벌크업 수달",
    price: "0.04",
    owner: "수빙수",
  },
  {
    img: avatar,
    isOnSale: true,
    title: "벌크업 수달",
    price: "0.04",
    owner: "수빙수",
  },
];

function Shop() {
  const classes = useStyles();
  const [order, setOrder] = useState("");

  const handleOrder = (event) => {
    setOrder(event.target.value);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="shop">
        <div className="title">수달샵</div>
        <div className="line"></div>
        <div className="wrap">
          {/* 왼쪽 분양중, 미분양 탭 */}
          <div className="tab">
            <span style={{ fontWeight: "bold" }}>전체</span>
            <span>분양중</span>
            <span>미분양</span>
          </div>
          {/* 오른쪽 정렬 기준 */}
          <div className="menu">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                정렬
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={order}
                onChange={handleOrder}
                label="order"
              >
                <MenuItem value={10}>좋아요순</MenuItem>
                <MenuItem value={20}>높은 가격순</MenuItem>
                <MenuItem value={30}>최신 등록순</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {/* NFT 카드 */}
        <div className={classes.gridRoot}>
          <GridList cellHeight={200} className={classes.gridList} spacing={10}>
            {datas.map((data) => (
              <GridListTile
                cols={1}
                style={{
                  height: "auto",
                  width: "500px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={data.img}
                      title="avatar sample"
                    />
                    <CardContent className="card">
                      <div className="card-header">
                        <ShowSale isOnSale={data.isOnSale}></ShowSale>
                        <Like likeCnt={10}></Like>
                      </div>
                      <div className="card-body">
                        <div>{data.title}</div>
                        <div>{data.price} SSF ~</div>
                        <div className="line"></div>
                        <div className="owner">
                          <div>소유자</div>
                          <div>{data.owner}</div>
                        </div>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    </div>
  );
}

export default Shop;
