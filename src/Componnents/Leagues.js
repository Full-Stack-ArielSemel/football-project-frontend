import {useEffect, useState} from "react";
import axios from "axios";
import '../styling/leagues.css';
import '../App.css';

export default function Leagues(props){

    const[leaguesByLeagueID,setLeaguesByLeagueID] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8989/get-all-leagues",{
            params:{
                leagueID:props.leagueID
            }
        }).then(res=>{
            setLeaguesByLeagueID(res.data)
        })
    },[props.leagueID])

    return (

        <div>

            <div className={"container-leagues"}>
                {
                    leaguesByLeagueID.map(item => {
                        return (
                            <div key={item.leagueId} className={"div-leagues"}
                                 onClick={()=>props.changeLeague(item.leagueId)}>
                                <img className={"img-leagues"} src={item.logo} alt={""}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}