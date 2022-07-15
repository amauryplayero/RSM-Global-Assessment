import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Map from './Map'
import { idText } from 'typescript'
import Geocode from "react-geocode";

export default function AllBreweriesMobile(props) {
    const [allBreweries, setAllBreweries] = useState([])
const [selectedBrewerie, setSelectedBrewerie] = useState("")
const [address, setAddress] = useState([])

let windowWidth = props.width






useEffect(() => {
    getAllBreweries()
}, []);


const showDetails = (brewery)=>{
    
    axios.get(`https://api.openbrewerydb.org/breweries/search?query=${brewery.name}`).then(
        res=>{
        let response = res.data
        // filter to only NYC breweries
        let filtered = response.filter(e=>e.city===brewery.city)
        setSelectedBrewerie(filtered[0])
        }
    )

}

const getAllBreweries = () =>{
    axios.get('https://api.openbrewerydb.org/breweries?by_city=new_york&per_page=50').then(res=>{
    let breweriesArr = res.data
    setAllBreweries(breweriesArr)
    })}

    
let handleMappingBreweries = allBreweries.map((brewery,i)=>{
       return <button key={brewery.name} className="singleBrewerie"onClick={()=>showDetails(brewery)}>{brewery.name}</button>
    })

///////////Setting up latitudes if they dont exist. /////////


    let googleMap 

    if(selectedBrewerie===""){
        googleMap = ""

    }else if(selectedBrewerie.latitude===null){
        Geocode.setApiKey("AIzaSyBf5Z9QCm8ZVBbNAe3k1RFp6u1ufNs8FTY");
        Geocode.fromAddress(`${selectedBrewerie.city+' '+selectedBrewerie.street}`).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setSelectedBrewerie({...selectedBrewerie, latitude: lat, longitude: lng})
             
            },(error) =>{
              console.error(error)
            })
    } else {
    }

       


// If option hasn't been selected, show the "select brewerie" element. 
    let menuOrBrewerie
    if(selectedBrewerie===""){
        menuOrBrewerie = <fieldset className="breweriesContainer">
           
                                <legend id="legendForBreweriesContainer">Select a Brewerie</legend>
                                {handleMappingBreweries}
    
                         </fieldset>
    }else{
                    
        menuOrBrewerie = <>
        <div id="outerDivOfMap">
        <button onClick={()=>{setSelectedBrewerie('')}}>back</button>
                    <div className="detailsContainer">
                        <h1 id="breweryNameEl">{selectedBrewerie.name}</h1>
                        <p id="addressEl">{selectedBrewerie.street}</p>
                        <p id="locationLineEl">{selectedBrewerie.city}, {selectedBrewerie.state}, {selectedBrewerie.postal_code}</p>
                        
                
                        <p><a href={selectedBrewerie.website_url} target="_blank">{selectedBrewerie.website_url}</a></p>

                            <Map coordinates={{
                                latitude:selectedBrewerie.latitude,
                                longitude:selectedBrewerie.longitude,
                                windowWidth:windowWidth
                            }}/>
                        </div>
        </div>
                        </>
    }




  
  return (
    <>
    <div id="listAndDetailsContainer">
       

       {menuOrBrewerie}
    </div>
    </>
  )

}
