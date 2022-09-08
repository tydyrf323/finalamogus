import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { pool } from "../../../src/database";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Usuario", name: "usrname" },
                password: { label: "Password", type: "password", name: "pwd" }
            },
            authorize: async (credentials) => {
                if (!credentials.usrname || !credentials.pwd) return null;
                const [rows] = await pool.query("SELECT * FROM users WHERE user = ? AND password = ?", [credentials.usrname, credentials.pwd]);
                if (rows.length !== 0) {
                    return { user: rows[0].user, password: rows[0].password, role: rows[0].role }
                }
                else{
                    return null;
                }
            }
        }
        )
    ],
    pages: {
        signIn: "/index",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token = user;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.user = token.user;
                session.password = token.password;
                session.role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        encryption: true
    }
})