import {useEffect, useState} from "react";
import '../App.css';
import axios from "axios";
import Cookies from "js-cookie";
import '../styling/leagues.css';
import '../styling/livegames.css';
import UserGames from "./UserGames";
import {isDisabled} from "@testing-library/user-event/dist/utils";

function Teams (props) {

    const [teamsByLeagueID , setTeamsByLeagueID] = useState([]);
    const [selectedHomeTeam , setSelectedHomeTeam] = useState("SELECT HOME TEAM");
    const [selectedAwayTeam , setSelectedAwayTeam] = useState("SELECT AWAY TEAM");
    const [LiveGames,setLiveGames] = useState([])
    const [LiveUserGames,setLiveUserGames] = useState([])
    const [logo, setLogo] = useState("")

    useEffect(()=> {
        getLogoByLeagueID();
        getTeams();
        getLiveGames();
        getLiveUserGames();
        const interval = setInterval(()=> {
            getLiveUserGames();
        },3000)
            return () => clearInterval(interval);
    },[]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getTeams(){
        await axios.get("http://localhost:8989/get-teams-by-league-id", {
            params: {
                leagueID: props.leagueID
            }
        }).then(res => {
            setTeamsByLeagueID(res.data)
        });
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getLiveUserGames(){
        await axios.get("http://localhost:8989/get-all-live-games-by-user-and-league_id",{
            params:{
                token:Cookies.get("token"),
                leagueID:props.leagueID
            }
        }).then(res=>{
            setLiveUserGames(res.data)
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getLiveGames(){
        await axios.get("http://localhost:8989/get-all-live-games-by-league_id",{
            params:{

                leagueID:props.leagueID
            }
        }).then(res=>{
            setLiveGames(res.data)
        });
    }

    async function getLogoByLeagueID(){
        await axios.get("http://localhost:8989/get-league-by-league-id",{
            params:{
                leagueID: props.leagueID
            }
        }).then(res =>{
            setLogo(res.data.logo)
        })

    }

    const runLiveBtn =() => {

        const findHomeTeam = teamsByLeagueID.find(item=>item.name===selectedHomeTeam);
        const homeID = findHomeTeam.id;
        const findAwayTeam = teamsByLeagueID.find(item=>item.name===selectedAwayTeam);
        const awayID = findAwayTeam.id;

        axios.post("http://localhost:8989/new-game",null,{
            params:{
                token:Cookies.get("token"),
                homeTeamID:homeID,
                awayTeamID:awayID,
                leagueID:props.leagueID
            }
        }).then(res=>{
            if(res.data.success){
                setLiveGames([...LiveGames,res.data.game])
                setLiveUserGames([...LiveUserGames,res.data.game])
            }
        })
        setSelectedHomeTeam("SELECT HOME TEAM")
        setSelectedAwayTeam("SELECT AWAY TEAM")

    }

    const checkingTeamLive=(teamID) => {

        const JsonTeam = LiveGames.find(item=>item.homeTeam.id===teamID || item.awayTeam.id===teamID);

        return JsonTeam!==undefined;
    }

    return(

        <div>
            <button className={"back-to-leagues"} onClick={()=>props.backToLeagues()}>BACK TO LEAGUES</button>

          <div className={"container"}>

            <div className={"choosingTeams"}>
                <img style={{width:"10%", marginTop:"15px"}} src={logo} alt={""}/>
                    <select value={selectedHomeTeam} onChange={(e)=>setSelectedHomeTeam(e.target.value)}>

                        <option style={{color:"darkgray"}} disabled value={"SELECT HOME TEAM"}>SELECT HOME TEAM</option>
                        {
                            teamsByLeagueID.map(team=>{
                                return(
                                    checkingTeamLive(team.id)?
                                        <option key={team.id} style={{color:"red"}} disabled value={team.name}>
                                           {team.name} LIVE NOW!</option>
                                        :
                                        <option key={team.id} style={{color:"green"}} disabled={false} value={team.name}>
                                           {team.name}</option>
                                )
                            })
                        }
                    </select>

                <h1 style={{fontFamily:"source-code-pro"}}>VS</h1>


                    <select value ={selectedAwayTeam} onChange={(e)=>setSelectedAwayTeam(e.target.value)}>

                        <option style={{color:"darkgray"}} disabled value={"SELECT AWAY TEAM"}>SELECT AWAY TEAM</option>
                        {
                            teamsByLeagueID.map(team=>{
                                return(

                                    checkingTeamLive(team.id)?

                                    <option key={team.id} style={{color:"red"}} disabled value={team.name}>
                                        {team.name} LIVE NOW!</option>
                                        :
                                    <option key={team.id} style={{color:"green"}} disabled={false} value={team.name}>
                                        {team.name}</option>
                                )
                            })
                        }
                    </select>


                <button onClick={runLiveBtn} className={"runLiveBtn"} disabled={selectedHomeTeam===selectedAwayTeam||
                            selectedHomeTeam==="SELECT HOME TEAM"||selectedAwayTeam==="SELECT AWAY TEAM"}>Run Live
                </button>

                    {
                        selectedHomeTeam === selectedAwayTeam &&
                            <div className={"sameTeams"}>you can't select two identical teams!</div>
                    }
            </div>


            <UserGames leagueID={props.leagueID} userLiveGames={LiveUserGames} setLiveUSerGames={setLiveUserGames}
                       LiveGames = {LiveGames} setLiveGames={setLiveGames}/>

        </div>

        </div>
    )
}

export default Teams;