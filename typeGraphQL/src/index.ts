import "reflect-metadata"
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import session from "express-session";
import { redis } from "./redis";
//import cors from "cors";
const RedisStore = require("connect-redis").default;


import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";


const main = async () => {
    
    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver],
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({req}: any) => ({req})
    });

    const app = Express();
    await apolloServer.start();


    app.use(
        session({
            store: new RedisStore({
                client: redis as any
            }),
            name: "qid",
            secret: "aslkdfjoiq12312",
            resave: false,
            saveUninitialized: false,
            cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
            },
        })
    );


    apolloServer.applyMiddleware({app});

    app.listen(4000, () => {
        console.log("Server started on http://localhost:4000/");
    })
}

main();