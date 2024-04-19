import { useEffect, useState } from "react"

const useDebounce =(input)=>{
   const [suggestion , setSuggestion] = useState([]);
     const fetchFood = async()=>{
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin','http://localhost:5177');

        const url = `https://api.frontendeval.com/fake/food/${input}`;
       const data = await fetch(url, {
        mode: 'no-cors',
        credentials: 'include',
        method: ['GET','POST'],
        headers: headers
    });
       const json = await data.json();
       console.log(json);
       setSuggestion(json);
     }

   useEffect(()=>{
    if(input.length>=2 && input){

        const timeout = setTimeout(()=>{
            fetchFood();
        },1000)

        clearTimeout(timeout);
    
    }
   },[input]);

   return suggestion
}

export default useDebounce;