import { useState } from "react";
import "./App.css";
import { items } from "./items";
import { useEffect } from "react";

function App() {
  const [filterData, setFilterData] = useState(items);
  const [activeFilter, setActiveFilter] = useState([]);
  const filters = ["Bags", "Watches", "Sports", "Sunglasses"];

  const handleFilter = (e) => {
    const filtered = e.target.id;
    if (activeFilter.includes(filtered)) {
      const newFilter = activeFilter.filter((el) => el !== filtered);
      setActiveFilter(newFilter);
    } else {
      setActiveFilter([...activeFilter, filtered]);
    }
  };

  const filteredData = () => {
    if (activeFilter.length) {
      const tempFilter = items.filter((ele)=>activeFilter.includes(ele.category));
      setFilterData(tempFilter);
    } else {
      setFilterData(items);
    }
  };

  useEffect(() => {
    filteredData();
  }, [activeFilter]);
  console.log(filterData);
  return (
    <div className="app">
      <h2>filter data</h2>
      <div className="btn-container" onClick={handleFilter}>
        {filters.map((ele, idx) => (
          <button key={idx} id={ele} className={activeFilter.includes(ele)?"selected":""}>
            {ele}
          </button>
        ))}
      </div>
      <div className="filter-container">
        {filterData?.map((product, idx) => (
          <div key={idx} className="filter-data">
            <p>{product.name}</p>
            <p className="filter-category">{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
