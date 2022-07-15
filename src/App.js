import './App.css';
import AllBreweries from './Components/AllBreweries'
import Header from './Components/Header'
import {useEffect, useState} from 'react'
function App() {
  const [windowWidth, setWindowWidth] = useState(0)
  const updateDimensions = () => {
    const width = window.innerWidth
    setWindowWidth(width)
  }

  useEffect(() => { 

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => 
    window.removeEventListener('resize',updateDimensions);
   }, [])

   let mobile
   if(windowWidth<=490){
     mobile = <AllBreweriesMobile />
   }


console.log(windowWidth)
  return (
    <>
    <Header />
    <AllBreweries width={windowWidth}/>
    </>
  );
}

export default App;
