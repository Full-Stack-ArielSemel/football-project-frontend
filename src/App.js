import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./Componnents/Login";
import LiveScores from "./Componnents/LiveScores";
import DashBoard from "./Componnents/DashBoard";
import Actions from "./Componnents/Actions";
import LiveTable from "./Componnents/LiveTable";
import GeneralTable from "./Componnents/GeneralTable";


function App() {

  return (
    <div className="App">

        <BrowserRouter>
            <Routes>
                <Route path={"/dashboard"} element={<DashBoard/>}>
                    <Route path={"actions"} element={<Actions/>}/>
                    <Route path={"logout"} element={<Login/>}/>
                    <Route path={"live-scores"} element={<LiveScores/>}/>
                    <Route path={"live-table"} element={<LiveTable/>}/>
                    <Route path={"general-table"} element={<GeneralTable/>}/>
                </Route>
                <Route path={"/"} element={<Login/>}/>
                <Route path={"/login"} element={<Login/>}/>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
