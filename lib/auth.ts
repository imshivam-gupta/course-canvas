import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { Prisma, PrismaClient } from "@prisma/client"
import ObjectId from "bson-objectid"
import {  AdapterAccount } from "next-auth/adapters"

export default function MyAdapter(prisma:PrismaClient, options = {}) {
    return {

        // Create User Method
        async createUser({id:_id,...data}:any) {
            console.log("Create user from adapter called");
            const return_val = prisma.user.create({data});
            return return_val;
        },

        // Get User Methods
        async getUser(id:any) {
            console.log("Get user from adapter called");
            return prisma.user.findUnique({where:{id}});
        },
        async getUserByEmail(email:string) {
            console.log("Get user by email from adapter called");
            return prisma.user.findUnique({where:{email}});
        },

        async getUserByAccount(provider_providerAccountId :any) {
            console.log("Get user by account from adapter called");
            const account = await prisma.account.findUnique({
                where: { provider_providerAccountId},
                select: { user: true },
            });
            return account?.user ?? null;
        },

        async updateUser({id,...data}:any) {
            console.log("Update user from adapter called");
            return prisma.user.update({where:{id},data});
        },

        async deleteUser(id:any) {
            console.log("Delete user from adapter called");
            return prisma.user.delete({where:{id}});
        },

        async linkAccount(data:any) {
            console.log("Link account from adapter called");
            return prisma.account.create({data}) as unknown as AdapterAccount;
        },

        async unlinkAccount(providerAccountId_provider :any) {
            console.log("Unlink account from adapter called");
            return prisma.account.delete({where:{providerAccountId_provider}}) as unknown as AdapterAccount;
        },

        async createSession({ sessionToken, userId, expires }:any) {
            console.log("Create session from adapter called");
            return prisma.session.create({data:{sessionToken,userId,expires}});
        },

        async getSessionAndUser(sessionToken:any) {
            console.log("Get session and user from adapter called");
            const userAndSession = await prisma.session.findUnique({
                where: { sessionToken },
                include: { user: true },
            });
            if (!userAndSession) return null;
            const { user, ...session } = userAndSession;
            return { user, session };
        },
        
        async updateSession(data:any) {
            console.log("Update session from adapter called");
            return prisma.session.update({where:{sessionToken:data.sessionToken},data});
        },
        async deleteSession(sessionToken:any) {
            console.log("Delete session from adapter called");
            return prisma.session.delete({where:{sessionToken}});
        },
        async createVerificationToken({ identifier, expires, token }:any) {
            console.log("create verification token called");
            const verificationToken = await prisma.verificationToken.create({ data: { identifier, expires, token } }) as any;
            if (verificationToken.id) delete verificationToken.id;
            return verificationToken;
        },
        async useVerificationToken(identifier_token:any) {
            try {
                const verificationToken = await prisma.verificationToken.delete({
                  where: { identifier_token },
                }) as any;
                if (verificationToken.id) delete verificationToken.id
                return verificationToken
              } catch (error) {
                if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
                  return null
                throw error
              }
        },
    }
  }

const prisma = new PrismaClient()

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 3000,
    },
    events: {
        async signout({ sessionToken }) {
            console.log("Signout event called");
            await prisma.session.delete({ where: { sessionToken } });
        }
    },
    pages: {
        // signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
        newUser: null,
    },
    adapter: MyAdapter(prisma) as any,
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async signIn({ user, account, profile }: any) {
            try {
                if (account.provider === "github") {
                    const { avatar_url } = profile as any;
                    const user_exist = await prisma.user.findUnique({
                        where: { email: user.email },
                    });
                    if(user_exist){
                        return true;
                    }
                    await prisma.user.upsert({
                        where: { email: user.email },
                        update: {
                            email: user.email,
                            name: user.name,
                            image: avatar_url,
                        },
                        create: {
                            id: new ObjectId(profile.id).toHexString(),
                            email: user.email,
                            name: user.name,
                            image: avatar_url,
                        },
                    });
                    
                    const userx = await prisma.user.findUnique({
                        where: { email: user.email },
                    }) as any;

                    await prisma.session.create({
                        data: {
                            sessionToken: userx.email,
                            userId: userx.email,
                            expires: new Date(),
                        },
                    });

                    await prisma.account.create({
                        data: {
                            userId: new ObjectId(userx.id).toHexString(),
                            type: account.type,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                        },
                    });
                }
                return true;
            } catch (error) {
                console.error("Error in signIn callback", error);
                return false;
            }
        },
        async session({ session,token, user }: any) {
            try {
                const userData = await prisma.user.findUnique({
                    where: { email: session.user.email },
                });
                session.user = userData;
                return session;
            } catch (error) {
                console.error("Error in session callback", error);
                return session;
            }
        },

    },
};