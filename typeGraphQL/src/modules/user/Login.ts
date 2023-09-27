import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import bcrypt from "bcryptjs";
import  { prisma }  from "../../prismaObj";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LoginResolver {
    
    @Mutation(() => User, { nullable: true })
    async Login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        
        if (!user) {
            return null;
        }  
        
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return null;
        }

        ctx.req.session!.userId = user.id;

        return user;
    }
}