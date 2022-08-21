
import React,{useState,useEffect} from 'react';

//API
import {getCoin} from '../services/api'; 

//Component
import Loader from './Loader';
import Coin from './Coin';

//styles
import styles from './Landing.module.css';

const Landing = () => {

    const [coins,setCoins]=useState([]);
    const [search,setSearch]=useState("");
    
    useEffect(()=>{
        const fetchAPI=async()=>{
            const data=await getCoin();
            setCoins(data);
            //console.log(data);
        }
        fetchAPI();
    },[])
    
    const searchHandler=event=>{
        setSearch(event.target.value)
    }

    const searchedCoins=coins.filter(coin=>coin.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <input className={styles.input} type="text" placeholder='Search' value={search} onChange={searchHandler}/>
            {coins.length 
                ?
                    <div className={styles.coinContainer} >
                        {searchedCoins.map(coin=>                            
                            <Coin 
                                key={coin.id}
                                image={coin.image} 
                                name={coin.name}
                                symbol={coin.symbol}
                                price={coin.current_price}
                                priceChange={coin.price_change_percentage_24h}
                                marketCap={coin.market_cap}
                            />
                            )                        
                        }           
                    </div> 
                
                :
                    <Loader/>
            }            
        </>
    );
};

export default Landing;