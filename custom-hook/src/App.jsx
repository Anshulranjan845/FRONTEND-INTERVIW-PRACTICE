import './App.css'
import useLocaleStorage from './useLocaleStorage'

function App() {
  const [theme , setTheme] = useLocaleStorage("theme","dark");
  const [count , setCount] = useLocaleStorage("count",0);
  const [data , setData] = useLocaleStorage("name" , {name : "Anshul"})

  const handleTheme =()=>{
    if(theme === "dark"){
     setTheme("light");
    }
    else{
      setTheme("dark");
    }
  }
  return (
    <div className={` app ${theme === "dark" ? "darker":""}`}>
      <h2>Custom hook</h2>
      <h2>{theme}</h2>
      <h2>{count}</h2>
      {data.name.map((na)=>(<h2>{na}</h2>))}
      <button onClick={handleTheme}>setTheme</button>
      <button onClick={()=>setCount(count+1)}>setcount</button>
      <button onClick={()=>setData({name :[ "Naveen","azad"]})}>setname</button>
    </div>
  )
}

export default App
