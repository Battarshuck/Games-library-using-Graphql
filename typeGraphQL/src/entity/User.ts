import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {

    @Field(() => ID)
    id: string;
    @Field()
    name: string;
    @Field()
    email: string;

    // @Field()
    // nameEmail(@Root() parent: User): string {
    //     return `${parent.name} ${parent.email}`;
    // }

    password: string;
}

