import "reflect-metadata";
import { ApolloServer } from "apollo-server";

import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";

import { PrismaClient } from "@prisma/client";

import { RegisterResolver } from "./modules/user/Register";

const PORT = 4000;

const main = async () => {
    const prisma = new PrismaClient();
    
    const schema = await buildSchema({
        resolvers: [...resolvers, RegisterResolver],
        validate: false,
    });

    //setup server
    const server = new ApolloServer({
        schema,
        context: async () => ({ prisma })
    });

    // const { url } = await startStandaloneServer(server, {
    //     context: async () => ({ prisma }),
    //     listen: {port: PORT},
    // });
    const { url } = await server.listen(PORT);
    console.log(`🚀 Server ready port: ${url}`);
}

main();