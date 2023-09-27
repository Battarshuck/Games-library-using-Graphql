import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import  { prisma }  from "../../prismaObj";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";


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

        const hashedPassword = await bcrypt.hash(password, 12);
        
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })
        
        return user;
    }
}