'use server';
import {cookies} from "next/headers";

export const createToken = async (token) => {
    await cookies().set('token', token)
}