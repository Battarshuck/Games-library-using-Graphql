import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {

    //####################### CREATING ##############################

    // const user = await prisma.user.createMany({
    //     data: [
    //         {
    //             name: "mostafa",
    //             email: "mostafa@gmail.com",
    //             age: 22,
    //         },
    //         ]
    // })

    // const userPreference = await prisma.userPreference.findMany({
        
    // })
    // console.log(userPreference)

    //####################### READING ##############################

    // const user = await prisma.user.findMany({
    //     where: {
    //         name: "mostafa"
    //     },
    //     orderBy: {
    //         age: "desc"
    //     },
    //     select: {
    //         name: true,
    //         age: true,
    //         email: true,
    //         role: true,
    //         userPreference: true
    //     }
    // })

    // const user = await prisma.user.findMany({
    //     where: {
    //         name: { in: ["mostafa"] },
    //         age: { lt: 22 }
    //     }
    // })

    // const user = await prisma.user.findMany({
    //     where: {
    //         AND: [
    //             {email: {startsWith: "mostafa"}},
    //             {email: {endsWith: "@gmail.com"}},
    //         ]      
    //     }
    // })

    // many to many relationship
    // const user = await prisma.user.findMany({
    //     where: {
    //          writtenPosts: {
    //             every : {
    //                 title: { contains: "test" }
    //             }
    //          }    
    //     },
    //     include: {
    //         writtenPosts: true
    //     }
    // })

    //here one to many relationship
    //a post has one author, but an author can have many posts
    // const user = await prisma.post.findMany({
    //     where: {
    //         author: {
    //             is:{
    //                 age: 22
    //             }
    //         }
    //     }
    // })

    //####################### UPDATING ##############################

    // const user = await prisma.user.update({
    //     where: {
    //         //when using increment, we must use a unique field like the email here
    //         email: "mos@gmail.com",
    //     },
    //     data: {
    //         userPreference: {
    //             connect: {
    //                 id: "055d985e-9fe2-488f-a6c6-611afe50e816"
    //             }
    //         }
    //     }
    // })

    // const user = await prisma.user.findFirst({
    //     where: {
    //         email: "mos@gmail.com",
    //     },
    //     include: {
    //         userPreference: true
    //     }
    // })

    // const user = await prisma.user.update({
    //     where: {
    //         //when using increment, we must use a unique field like the email here
    //         email: "mos@gmail.com",
    //     },
    //     data: {
    //         userPreference: {
    //             disconnect: true
    //         }
    //     }
    // })

    //####################### DELETING ##############################

    const user = await prisma.user.delete({
        where: {
            //we must use a unique field like the email here
            //that is not the case with "de;eteMany" where we can use any field
            email: "mostafa3@gmail.com"
        }
    })

    //await prisma.user.deleteMany()
    
   console.log(user)
}

main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })