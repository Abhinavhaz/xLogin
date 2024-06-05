import React from "react"
import axios from 'axios'
import "../App.css"
import { useEffect,useState } from "react"
function Xstates(){
const[countries, setCountries] = useState([])
const[states, setStates] = useState([])
const[city, setCity] = useState([])


const[Selectcountry, setSelectCountry] = useState("")
const[selectStates, setSelectStates] = useState("")
const[selectcity, setSelectcity] = useState("")



const fetchCountry=async()=>{

    try {
        let res =await axios.get (' https://crio-location-selector.onrender.com/countries')
        setCountries(res.data)
        
    } catch (error) {
        console.log('err', error)
    }
}



const fetchState = async()=>{
    try {
        let res = await axios.get(`https://crio-location-selector.onrender.com/country=${Selectcountry}/states `)
setStates(res.data)
setSelectStates("")
setCity([])
setSelectcity("")
    } catch (error) {
        console.log("err",error)
    }
}


const fetchcity= async()=>{
    try {
       let res = await axios.get(` https://crio-location-selector.onrender.com/country=${Selectcountry}/state=${selectStates}/cities`) 
       setCity(res.data)
       setSelectcity("")
    } catch (error) {
        console.log("err",error)
        
    }
}



useEffect(()=>{
    fetchCountry()
},[])

useEffect(()=>{
    fetchState()
},[Selectcountry])

useEffect(()=>{
    fetchcity()
},[selectStates])


    return(
        <div >

            <div>
        <h1>Select Location</h1>
        <select value={Selectcountry}
        
        onChange={(e)=>setSelectCountry(e.target.value)}
        >
<option value="" disabled>
    Select Countries
</option>


{countries.map((country)=>(
    <option key={country} value={country}>
        {country}
    </option>
))}
        </select>


        <select value={selectStates}
        
        onChange={(e)=>setSelectStates(e.target.value)}
        >
<option value="" disabled>
    Select States
</option>


{states.map((state)=>(
    <option key={state} value={state}>
        {state}
    </option>
))}
        </select>




        <select value={selectcity}
        
        onChange={(e)=>setSelectcity(e.target.value)}
        >
<option value="" disabled>
    Select City
</option>


{city.map((cities)=>(
    <option key={cities} value={cities}>
        {cities}
    </option>
))}
        </select>



        {selectcity &&(
  
<h2>
          You selected {selectcity}, {selectStates}, {Selectcountry}
        </h2>
           
        )}

</div>


        </div>
    )


}
export default Xstates


