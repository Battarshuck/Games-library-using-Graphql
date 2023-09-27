import React, {useState} from "react";
import {ADD_GAME} from "../../GraphQL/Mutations.js";
import {useMutation} from "@apollo/client";

const AddGame = () => {
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");

    const [addGame, {error}] = useMutation(ADD_GAME);
    const addGameSubmit = (e) => {
        addGame({
            variables: {
                game: {
                    title: title,
                    platform: [platform]
                }
            }
        })

        if(error)
        {
            console.log(error);
        }
    }
    return (
        <div>
            <h1>Add Game</h1>
                <form>  
                    <input type="text" placeholder="Title" onChange={e => {
                        setTitle(e.target.value);
                    }} />
                    <input type="text" placeholder="platform" onChange={e => {
                        setPlatform(e.target.value);
                    }} />
                    <button onClick={addGameSubmit}>Submit</button>
                </form>
        </div>
    )
}

export default AddGame;