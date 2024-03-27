import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
//https://jsonplaceholder.typicode.com/photos?_page=${index}&_limit=9

function App() {
  const loaderref = useRef();
  const [data , setData] = useState([]);
  const [page , setPage] = useState(2);
  const [loading , setLoading] = useState(false)

 

  const fetchedData = async (index)=>{
    let url_photos = `https://jsonplaceholder.typicode.com/photos?_page=${index}&_limit=8`
     const data = await fetch(url_photos);
     const json = await data.json();
     return json
  }

  const getData = useCallback(async ()=>{
    if(loading) return;
    setLoading(true);
    const data = await fetchedData(page);
    setData((prevData)=>[...prevData , ...data]);
    setTimeout(()=>{
       setLoading(false);
    },1000)
    setPage((prevPage)=>prevPage+1);
     
  },[loading,page])
  useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
      const target = entries[0];
      if(target.isIntersecting){
        getData();
      }
     
       
      })
  if(loaderref.current){
    observer.observe(loaderref.current);
  }
  return()=>{
    if(loaderref.current){
      observer.unobserve(loaderref.current);
    }}
  },[getData])
  const fetchFirstPage = async ()=>{
     const FirstData = await fetchedData(1);
     setData(FirstData);
  }

    useEffect(()=>{
      fetchFirstPage();
    },[]);
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center mb-2 ">Infinte Scroll</h1>

      <div className="flex flex-wrap px-2 mx-2">
         {
          data?.map(dta=><img key={dta?.id} alt={dta.title} src={dta?.thumbnailUrl} />)
         }
      </div>
      <div ref={loaderref}>
      {loading && <h2 className="text-2xl items-center text-gray-400 translate-x-6">Loading ....</h2>}
      </div>
    </>
  );
}

export default App;
