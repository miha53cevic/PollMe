import { SessionOptions, getIronSession } from "iron-session";

export const sessionOptions: SessionOptions = {
    cookieName: "sid",
    password: "complex_password_at_least_32_characters_long",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false,
    },
};

export interface SessionData {
    username: string,
    isLoggedIn: boolean,
}

export const getSession = (cookies: any) => getIronSession<SessionData>(cookies, sessionOptions);