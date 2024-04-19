import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  //const url = 'https://www.reddit.com/r/aww/top/.json?t=all';.

  const [image, setImage] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchImage = async () => {
    const url = "https://www.reddit.com/r/aww/top/.json?t=all";
    const data = await fetch(url);
    const json = await data.json();

    const serveImg = json?.data?.children;
    const filterList = serveImg
      .filter((ele) => ele?.data?.url_overridden_by_dest.includes(".jpg"))
      .map((item) => item?.data?.url_overridden_by_dest);

    setImage(filterList);
  };
  const handleClick = (click) => {
    if (click === "left") {
      if (index == 0) {
        setIndex(image.length - 1);
      } else {
        setIndex(index - 1);
      }
    }
    if (click === "right") {
      if (index == image.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      handleClick("right");
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [index]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  return (
    <div className="app">
      <button onClick={() => handleClick("left")}>{"<"}</button>

      <img src={image[index]} alt="random image" />

      <button onClick={() => handleClick("right")} className="right-btn">
        {">"}
      </button>
    </div>
  );
}

export default App;
