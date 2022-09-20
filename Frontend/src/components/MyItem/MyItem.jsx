import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./MyItem.css";
import Canvas from "../Canvas/Canvas";

const imageUrl = "../../assets/images/items";
const items = [
  {
    url: require("../../assets/images/items/blackperm.png"),
    name: "blackperm",
  },
  {
    url: require("../../assets/images/items/blueperm.png"),
    name: "blueperm",
  },
  {
    url: require("../../assets/images/items/redperm.png"),
    name: "redperm",
  },
  {
    url: require("../../assets/images/items/greenperm.png"),
    name: "greenperm",
  },
  {
    url: require("../../assets/images/items/cloth.png"),
    name: "cloth",
  },
  {
    url: require("../../assets/images/items/blueglasses.png"),
    name: "blueglasses",
  },
];
function Items({ currentItems, setUrl }) {
  return (
    <div className="boxes">
      {currentItems &&
        currentItems.map((item) => (
          <div className="oneBox" key={item.name}>
            <Canvas
              url={item.url}
              width={100}
              height={100}
              onClick={() => {
                setUrl(item.url);
              }}
            />
          </div>
        ))}
    </div>
  );
}
function MyItem({ itemsPerPage, settingUrl }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [url, setUrl] = useState();
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  useEffect(() => {
    settingUrl(url);
  });
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );

    setItemOffset(newOffset);
  };

  return (
    <div className="items">
      <Items currentItems={currentItems} setUrl={setUrl} />
      <ReactPaginate
        className="paginate"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default MyItem;
