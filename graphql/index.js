import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const PORT = 4000;

import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
    Query: {
        games(){
            return db.games
        },
        game(_, {id}){
            return db.games.find(game => game.id === id)
        },
        reviews(){
            return db.reviews
        },
        review(_, {id}){
            return db.reviews.find(review => review.id === id)
        },
        authors(){
            return db.authors
        }, 
        author(_, {id}){
            return db.authors.find(author => author.id === id)
        } 
    },
    Game: {
        reviews(parent){
            return db.reviews.filter(review => review.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent){
            //using filter to return all reviews that match the author_id
            return db.reviews.filter(review => review.author_id === parent.id)
        }
    },
    Review: {
        author(parent){
            //using find to return the author that matches the author_id
            return db.authors.find(author => author.id === parent.author_id)
        },
        game(parent){
            //using find to return the game that matches the game_id
            return db.games.find(game => game.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(_, {id}){
            db.games = db.games.filter(game => game.id !== id)
            return db.games
        },
        addGame(_, {game}){
            const newGame = {
                ...game,
                id: Math.floor(Math.random() * 1000).toString()
            }
            db.games.push(newGame)
            return newGame
        },
        updateGame(_, {id, edits}){
            db.games = db.games.map(game => {
                if(game.id === id){
                    return {...game, ...edits}
                }

                return game
            })

            return db.games.find(game => game.id === id)
        }
    }
}

//setup server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: {port: PORT},
});

console.log(`🚀 Server ready at ${url}, port: ${PORT}`);