import {useEffect, useState} from "react";
import Leagues from "./Leagues";
import Teams from "./Teams";
import '../styling/leagues.css';
import '../App.css';
import '../styling/livegames.css';


export default function Actions(){

    const[selectedLeague,setSelectedLeague] = useState(0);

    useEffect(()=> {
        const getValueFromLocalStorage = JSON.parse(window.localStorage.getItem("save"));
        if(getValueFromLocalStorage){
            setSelectedLeague(getValueFromLocalStorage)
        }
    },[])

    useEffect(()=>{
        window.localStorage.setItem("save",JSON.stringify(selectedLeague))
    },[selectedLeague])


    const backToLeagues=()=>{

        setSelectedLeague(0)
    }

    const changeSelectedLeague = (leagueID)=>{
        setSelectedLeague(leagueID)
    }

    return(
        <div>
            {
                selectedLeague === 0 ?
                    <Leagues leagueID={selectedLeague} changeLeague={changeSelectedLeague}/>
                    :
                    <Teams leagueID={selectedLeague} backToLeagues={backToLeagues}/>
            }
        </div>
    )
}