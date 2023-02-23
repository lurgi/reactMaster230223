import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    max-width: 400px;
    margin: 0 auto;
`;

const Header = styled.header`
    display: flex;
    justify-content: center;
    padding: 10px;
`;

const CoinsList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 10px;
`;

const Coin = styled.li`
    display: flex;
    align-items: center;
    background-color: whitesmoke;
    padding: 14px 20px;
    margin: 3px 0px;
    width: 80%;
    border-radius: 10px;
`;

const Title = styled.h1`
    color : ${props=>props.theme.accentColor};
    font-weight: 700;
    font-size: 25px;
`;

const Loading = styled.div`
    text-align: center;
`;

const Img = styled.img`
    height: 20px;
    width: 20px;
    margin-right: 8px;
`;

interface Icoins{
    "id":string,
    "name":string,
    "symbol":string,
    "rank": number,
    "is_new":boolean ,
    "is_active":boolean ,
    "type":string,
}


function Coins(){
    const [coins,setCoins] = useState<Icoins[]>();
    const [loading, setLoading] = useState(true);
    const location = useLocation()
    console.log(location)
    useEffect((()=>{
        (async() =>{
            const response = await fetch("https://api.coinpaprika.com/v1/coins")
            const json = await response.json();
            setCoins(json.slice(0,100))
            setLoading(false)
        })()
    }),[]);
    
    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {loading ? <Loading>Loading...</Loading> :<CoinsList>
                {coins?.map(coin => <Coin>
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}></Img>
                    <Link to={`/${coin.id}`} state={`${coin.name}`}>{coin.name} &rarr;</Link>
                    </Coin>)}
            </CoinsList> }  
        </Container> 
    );
}

export default Coins