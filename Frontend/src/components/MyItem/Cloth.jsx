import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./MyItem.css";

const imageUrl = "../../assets/images/items/Cloth/";
const items = [
  {
    url: require("../../assets/images/items/Cloth/05_01_01_01.png"),
    name: "cloth01",
  },
  {
    url: require("../../assets/images/items/Cloth/05_01_02_02.png"),
    name: "cloth02",
  },
  {
    url: require("../../assets/images/items/Cloth/05_01_03_02.png"),
    name: "cloth03",
  },
  {
    url: require("../../assets/images/items/Cloth/05_01_04_01.png"),
    name: "cloth04",
  },
  {
    url: require("../../assets/images/items/Cloth/05_01_05_02.png"),
    name: "cloth05",
  },
  {
    url: require("../../assets/images/items/Cloth/05_01_07_03.png"),
    name: "cloth06",
  },
  {
    url: require("../../assets/images/items/Cloth/05_01_08_03.png"),
    name: "cloth07",
  },
  {
    url: require("../../assets/images/items/Cloth/05_02_01_01.png"),
    name: "cloth08",
  },
  {
    url: require("../../assets/images/items/Cloth/05_02_02_01.png"),
    name: "cloth09",
  },
];

function Cloth({ itemsPerPage, setUrl }) {
  const [currentItems, setCurrentItems] = useState(items);
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
        {currentItems.map((item) => (
          <img
            className="parts"
            key={item.name}
            src={item.url}
            onClick={() => setUrl(item.url)}
          />
        ))}
      </div>
      <ReactPaginate
        className="paginate"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={8}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Cloth;
