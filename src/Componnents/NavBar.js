
import {NavLink, useNavigate} from "react-router-dom";
import {FaHome} from 'react-icons/fa';
import { MdOutlineAddToHomeScreen } from "react-icons/md";
import {IoIosFootball} from 'react-icons/io';
import {GiPodiumWinner , GiPodium} from 'react-icons/gi';
import '../App.css';
import Cookies from "js-cookie";
import {useEffect} from "react";


function NavBar() {

    const links = [
        {to:"actions",text:"Actions",icon:<FaHome/>},
        {to:"live-scores" , text:"Live Scores", icon: <IoIosFootball/>},
        {to:"live-table" , text:"Live Table", icon: <GiPodiumWinner/>},
        {to:"general-table" , text:"General Table", icon: <GiPodium/>},
        {to:"login" , text:"LogOut", icon: <MdOutlineAddToHomeScreen/>}
    ]

    const navigate = useNavigate();

    useEffect(()=>{
        const token = Cookies.get("token");
        if(token===undefined){
            navigate("/login");
        }
    },[navigate])

    const navBarStyles = ({isActive}) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal' ,
            color: isActive ? '#17202a':'#ecf0f1',
            transition: 'color 0.5s ease'
        }
    }

    const removeCookie = (e) =>{

        e.preventDefault();
        Cookies.remove("token");
        navigate("/login");
    }

    return(


        <div className={"navbar"}>

            {
                links.map((link)=>{
                    return(
                        <span className={"spanLink"}>
                            {
                                link.text==="LogOut"?
                                    <NavLink className={"navLink"} onClick={removeCookie} to={link.to} style={navBarStyles}>
                                    <span className={"icon"}>{link.icon}</span>{link.text}
                                    </NavLink>
                                    :
                                    <NavLink className={"navLink"} to={link.to} style={navBarStyles}>
                                      <span className={"icon"}>{link.icon}</span>{link.text}
                                    </NavLink>
                            }

                        </span>
                    )
                })
            }
            </div>

    )
}

export default NavBar;
