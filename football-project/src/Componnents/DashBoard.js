import NavBar from "./NavBar";
import {Outlet} from "react-router-dom";


export default function DashBoard(){

    return(
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    )
}