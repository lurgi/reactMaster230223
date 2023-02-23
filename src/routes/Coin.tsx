import { useEffect, useState } from "react";
import { Link, Outlet, Route, Routes, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin : 0 auto;
`;

const Header = styled.header`
    display: flex;
    justify-content: center;
    padding: 10px;
`;

const Title = styled.h1`
    color : ${props=>props.theme.accentColor};
    font-weight: 500;
    font-size: 25px;
`;

const Loading = styled.div`
    text-align: center;
`;

const Coindetail = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: whitesmoke;
    padding: 10px 15px;
    width: 80vw;

`;

const Description = styled.div`
    font-size: 12px;
    margin-bottom: 10px;
`;

const PriceDetail = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const PriceDetailColumn = styled.div`
    font-size: 10px;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0,0,0,0.1);
    padding: 5px 0px;
    border-radius: 8px;
    &>span{
        margin-top: 2px;
    }
`;

const DetailButtons=styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;
const Linkdiv = styled.div<{isActive : boolean}>`
    width: 45%;
    text-align: center;
    background-color: whitesmoke;
    border-radius: 15px;
    padding: 5px 0px;
    font-size: 14px;
    color : ${props => props.isActive ? props.theme.textColor : 'rgba(128, 128, 128)' };
    font-weight: ${props => props.isActive ? 600 : 400};
    
`;


interface IInfoData{
    id : string,
    name : string,
    symbol : string,
    rank : number,
    is_new : boolean,
    is_active : boolean,
    type : string,
    logo : string,
    description : string, 
    message : string,
    open_source : boolean,
    started_at : string,
    development_status : string,
    hardware_wallet : boolean,
    proof_type : string,
    org_structure : string,
    hash_algorithm : string,
    first_data_at : string,
    last_data_at : string,
};

interface IPriceData{
    id : string,
    name : string,
    symbol : string,
    rank : string,
    circulating_supply : string,
    total_supply : string,
    max_supply : string,
    beta_value : string,
    first_data_at : string,
    last_updated : string,
    quotes : {
        USD : {
            ath_date : string,
            ath_price : number,
            market_cap : number,
            market_cap_change_24h : number,
            percent_change_1h : number,
            percent_change_1y : number,
            percent_change_6h : number,
            percent_change_7d : number,
            percent_change_12h : number,
            percent_change_15m : number,
            percent_change_24h : number,
            percent_change_30d : number,
            percent_change_30m : number,
            percent_from_price_ath : number,
            price : number,
            volume_24h : number,
            volume_24h_change_24h : number,
        }
    }
};


function Coin(){
    const {coinId} = useParams();
    const [loading, setLoading] = useState(true);
    const {state} = useLocation();
    const [info, setInfo] = useState<IInfoData>();
    const [price, setPrice] = useState<IPriceData>();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    useEffect(()=>{
        (async() =>{
            const infoData = await(
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
            console.log(infoData)
            setInfo(infoData)
            const priceData = await(
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json()
            console.log(priceData)
            setPrice(priceData)

            setLoading(false);
        })()
    },[coinId]);
    return (
    <Container>
        <Header>
            <Title>{state ? state : loading ? 'Loading...' : info?.name}</Title>
        </Header>
        {loading ? <Loading>Loading...</Loading> : 
            <Coindetail>
                <Description>{info?.description}</Description>
                <PriceDetail>
                    <PriceDetailColumn>
                            <div>ATH</div>
                            <span>{Number(price?.quotes.USD.ath_price).toFixed(2)}$</span>
                    </PriceDetailColumn>
                    <PriceDetailColumn>
                            <div>Price</div>
                            <span>{Number(price?.quotes.USD.price).toFixed(2)}$</span>
                    </PriceDetailColumn>
                    <PriceDetailColumn>
                            <div>Today Chnage</div>
                            <span>{Number(price?.quotes.USD.percent_change_24h).toFixed(2)}%</span>
                    </PriceDetailColumn>
                </PriceDetail>
            </Coindetail>
        }
            <DetailButtons>
                <Linkdiv isActive={priceMatch !== null}><Link to={`/${coinId}/price`}>Price</Link></Linkdiv>
                <Linkdiv isActive={chartMatch !== null}><Link to={`/${coinId}/chart`}>Chart</Link></Linkdiv>
            </DetailButtons>
        <Outlet/>
    </Container>
    );
}

export default Coin

function useRouteMatch() {
    throw new Error("Function not implemented.");
}
