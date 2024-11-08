import { db } from "@/lib/db";
import {fetchFromAPI} from "@/lib/utils";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await fetchFromAPI(`/user/userByEmail?email=${email}`,"GET");
    console.log(user);
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};
