import { Route, Routes } from "react-router";
import {BrowserRouter} from "react-router-dom"
import Charts from "./Chart";
import Coin from "./Coin";
import Coins from "./Coins";
import Price from "./Price";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Coins/>}/>
                <Route path="/:coinId" element={<Coin/>}>
                    <Route path="price" element={<Price/>}/>
                    <Route path="chart" element={<Charts/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router