import Chart from "react-apexcharts";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { transform } from "typescript";
import { fetchOHLCV } from "./api";

interface Idata{
    close: string, 
    high:  string,
    low : string,
    market_cap : number,
    open : string,
    time_close : number,
    time_open : number,
    volume : string,
}

interface IOutletChart{
    coinId : string;
}

export default function Charts(){
    const {coinId} = useOutletContext<IOutletChart>();
    const {isLoading, data} =useQuery<Idata[]>("",()=>fetchOHLCV(coinId))
    let ans = [];
    if(data!==undefined)
    for(let i = 0 ; i < data?.length; i++){
            const a =data && data[i] !==undefined ? new Date(data[i].time_open*1000) : null;
            const b =data && data[i] !==undefined ? [data[i].open, data[i].high, data[i].low, data[i].close] : null;
            let Obj = {x:a, y:b}
            ans.push(Obj);
    }
    console.log(ans)
    return (
        <>
            {isLoading ? "Loading..." : 
                <Chart
                    style={{
                        marginTop:20,
                    }}
                    type="candlestick"
                    options={{
                        tooltip:{
                            y:{
                                formatter:(value)=>`$ ${value}`
                            }
                        },
                        chart: {
                            type: 'candlestick',
                            height: 500,
                            toolbar : {
                                show : false,
                            }
                          },
                          title: {
                            text: undefined,
                            align: 'center'
                          },
                          xaxis: {
                            type: 'datetime',
                          },
                          yaxis: {
                            show: false,
                        }
                        
                    }}
                    series={[
                            {
                                data: ans
                            }
                          ]}
                />}
        </>
    );
}