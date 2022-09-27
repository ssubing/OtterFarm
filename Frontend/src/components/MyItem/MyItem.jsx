import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./MyItem.css";

const items = [
  {
    url: require("../../assets/images/items/Head/01_01_01_01.png"),
    name: "head01",
  },
  {
    url: require("../../assets/images/items/Head/01_01_06_01.png"),
    name: "head02",
  },
  {
    url: require("../../assets/images/items/Head/01_01_08_03.png"),
    name: "head03",
  },
  {
    url: require("../../assets/images/items/Head/01_01_09_01.png"),
    name: "head04",
  },
  {
    url: require("../../assets/images/items/Head/01_01_10_02.png"),
    name: "head05",
  },
  {
    url: require("../../assets/images/items/Head/01_02_01_01.png"),
    name: "head06",
  },
  {
    url: require("../../assets/images/items/Head/01_02_02_01.png"),
    name: "head07",
  },
  {
    url: require("../../assets/images/items/Head/01_02_03_01.png"),
    name: "head08",
  },
];

function MyItem({ itemsPerPage, setUrl }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );

    setItemOffset(newOffset);
  };

  return (
    <div className="inventory">
      <div className="items">
        {items.map((item) => (
          <img
            className="parts"
            src={item.url}
            onClick={() => setUrl(item.url)}
            alt=""
          />
        ))}
      </div>
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
