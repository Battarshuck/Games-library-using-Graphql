import React, {useEffect, useState} from "react";
import {useQuery, gql} from "@apollo/client";
import {LOAD_GAMES} from "../../GraphQL/Queries.js";

const GetGames = () => {
    const {loading, error, data} = useQuery(LOAD_GAMES);
    const [games, setGames] = useState([]);
    useEffect(() => {
        console.log(data);
        if(data)
        {
            setGames(data.games);
        }
            
    }, [data]);

    return (
        <div>
            {games.map((game) => (
                <div key={game.id}> {game.title} </div>
                ))}
        </div>
    );
}

export default GetGames;