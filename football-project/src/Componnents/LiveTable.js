
import {useEffect, useState} from "react";
import axios from "axios";
import {calculateTeamsStats} from "./CalculateTeamStats";
import "../styling/tables.css"

export default function LiveTable(){

    const [sortedLiveTable, setSortedLiveTable] = useState([]);
    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    async function fetchData() {
       await axios.get("http://localhost:8989/get-live-table-by-league-id",{
           params:{
               leagueID: JSON.parse(window.localStorage.getItem("save"))
           }
       }).then
        (response => {
            let currentResponse = response.data;
            let currentTeamStats = currentResponse.teamStats;
            let sortedTable=calculateTeamsStats(currentTeamStats);
            setSortedLiveTable(sortedTable)
        })
    }
    return(

        <div>

            {
                JSON.parse(window.localStorage.getItem("save")) === 0 ?
                    <h1 style={{color:"red",alignItems:"center",marginLeft:"380px"}}>FOR SHOWING TABLE INFO SELECTING LEAGUE IS REQUIRED!</h1>

                    :
                    <table>
                        <thead>
                        <tr>
                            <th>Pos</th>
                            <th style={{textAlign:"left",width:"17%"}}>Club Name</th>
                            <th>Played</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>Dif</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>Points</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedLiveTable.map((item,index) => (
                            <tr>
                                <td>{index+1}</td>
                                <td style={{textAlign:"left"}}> <img src={item.icon} alt={""} width={"25"}/><span style={{marginLeft:"7px"}}>{item.name}</span></td>
                                <td>{item.totalGames}</td>
                                <td>{item.goalsFor}</td>
                                <td>{item.goalsAgainst}</td>
                                <td>{item.goalsBalance}</td>
                                <td>{item.numberOfWins}</td>
                                <td>{item.numberOfDraws}</td>
                                <td>{item.numberOfLoses}</td>
                                <td style={{fontWeight:"bold",color:"WindowText"}}>{item.points}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            }
        </div>
    )
}
