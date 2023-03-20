// Write your Cards component here

import React, { useEffect, useState } from "react";
import Card from '../components/SingleCard'
import axios from "axios";

const Cards = ({ searchString })=>{
    const [trend,setTrend] = useState(null)
    const findValue = (elem)=> elem.toLowerCase().includes(searchString.toLowerCase());
    const apiKey = "djgPtRU8w31i4OcMYm6Rt2PGQ0bp4Yev4JyEiryT"

    useEffect(()=>{
        const fetchTrend = async () =>{
            try{
                const options = {
                    method :'GET',
                    url :'https://yfapi.net/v1/finance/trending/US',
                    headers: {
                        'x-api-key' : apiKey
                    }
                };
                const response = await axios.request(options);
                setTrend(response.data.finance.result[0]);

            }catch(error){
                console.log(error);
            }
        }
        fetchTrend();
    }, [apiKey]);

    return (
        <>
            <div className="cards_title"><h2>Trending Indexes</h2></div>
            {
                trend ? (
                    <div className = "container-fluid">
                        <div className = "container-fluid">
                            <div className = "row text-center wrapper">
                                {
                                    trend.quotes.slice(0,10).map((stocks)=>{
                                        if(findValue(stocks.symbol)){
                                            return(
                                                <Card
                                                    key = {stocks.symbol}
                                                    symbol = {stocks.symbol}
                                                />
                                            )
                                        }
                                        else{
                                            return null
                                        }
                                    })
                                }
                                </div>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )
            }
        </>
    )
}

export default Cards;