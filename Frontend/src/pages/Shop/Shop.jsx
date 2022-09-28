import React, { useEffect, useState } from "react";
import "./Shop.css";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import shop from "../../api/shop";
import { useDispatch, useSelector } from "react-redux";
import { setNftList } from "../../store/modules/shop";

// tab
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// menu
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";

// components
import Navbar from "../../components/Navbar/Navbar";
import ShowSale from "../../components/Card/ShowSale";
import Like from "../../components/Card/Like";
import { List } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  tabRoot: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "inherit",
    boxShadow: "none",
  },
  tab: {
    color: "black",
    fontSize: "20px",
    fontFamily: "neo",
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
    justifyContent: "space-evenly",
  },
  root: {
    width: 345,
    padding: 30,
    backgroundColor: "#F3E9DC",
    borderRadius: "20px",
  },
  media: {
    height: 400,
    border: "2px solid",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
  },
}));

function Shop() {
  const classes = useStyles();
  const [order, setOrder] = useState("");
  const nftList = useSelector((state: any) => state.nftList);
  const dispatch = useDispatch();
  // const [nftList, setNftList] = useState([]);

  const handleOrder = (event) => {
    setOrder(event.target.value);
  };

  const [value, setValue] = useState(0);

  const handleTab = (event, newValue) => {
    setValue(newValue);
    // console.log(newValue);
    const params = {
      isDesc: false,
      order: "id",
      pageNo: 1,
      pageSize: 15,
      tab: "",
    };
    switch (newValue) {
      case 0:
        params.tab = "all";
        break;
      case 1:
        params.tab = "saled";
        break;
      case 2:
        params.tab = "unsaled";
        break;
      default:
        break;
    }
    shop
      .nftList(params)
      .then((result) => {
        dispatch(setNftList(result.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const params = {
      isDesc: false,
      order: "id",
      pageNo: 1,
      pageSize: 15,
      tab: "all",
    };
    shop
      .nftList(params)
      .then((result) => {
        dispatch(setNftList(result.data));
        // setNftList(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="shop">
        <div className="shop-title">수달샵</div>
        <div className="line"></div>
        <div className="wrap">
          {/* 왼쪽 탭 */}
          <div className={classes.tabRoot}>
            <AppBar position="static" className={classes.appbar}>
              <Tabs
                value={value}
                onChange={handleTab}
                aria-label="simple tabs example"
                TabIndicatorProps={{ style: { backgroundColor: "#C08552" } }}
              >
                <Tab className={classes.tab} label="전체" />
                <Tab className={classes.tab} label="분양중" />
                <Tab className={classes.tab} label="미분양" />
              </Tabs>
            </AppBar>
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
        {nftList.length > 0 ? (
          <Link to="/detail">
            <div className={classes.gridRoot}>
              <ImageList
                cellHeight={200}
                className={classes.gridList}
                spacing={10}
              >
                {nftList.map((data) => (
                  <ImageListItem
                    cols={1}
                    style={{
                      height: "auto",
                      width: "450px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Card className={classes.root}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={data.tokenURI}
                          title="avatar sample"
                        />
                        <CardContent className="card">
                          <div className="card-header">
                            <ShowSale isOnSale={data.saled}></ShowSale>
                            <Like likeCnt={data.likeCount}></Like>
                          </div>
                          <div className="card-body">
                            <div>{data.name}</div>
                            <div>{data.price} SSF ~</div>
                            <div className="line"></div>
                            <div className="owner">
                              <div>소유자</div>
                              <div>{data.userNickname}</div>
                            </div>
                          </div>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </Link>
        ) : (
          <div style={{ fontSize: "35px" }}>목록이 비었습니다.</div>
        )}
      </div>
    </div>
  );
}

export default Shop;
