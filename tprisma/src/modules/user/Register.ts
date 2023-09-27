import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "@generated/type-graphql/models/User"
import { RegisterInput } from "./register/RegisterInput";
import { prisma } from "../../prismaObj";


@Resolver()
export class RegisterResolver {
    @Query(() => String, { name: "lol"})
    async hello() {
        return "Hello World!";
    }

    // @FieldResolver()
    // async nameEmail(@Root() parent: User) {
    //     return `${parent.name} ${parent.email}`;
    // }

    @Mutation(() => User)
    async register(
        @Arg('input') {name, email, password}: RegisterInput 
    ) {
        
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })
        
        return user;
    }
}