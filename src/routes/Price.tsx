import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 10px;
    width: 85%;
`;

const Column = styled.div`
    background-color: ${props=>props.theme.bgColor2};
    color: ${props=>props.theme.textColor};
    border-radius: 15px;
    margin-bottom: 5px;
    padding : 6px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 12px;
`;

export default function Price (){
    const {state} = useLocation();
    const newArr = Object.entries(state.priceData);
    console.log(newArr, newArr[2][0])

    return (
        <Container>
            {newArr.map((element)=> <Column key={element[0]}>
                    <div>{element[0]} </div>
                    <div>{element[1]+""}</div>
                </Column>)}
        </Container>
    );
}