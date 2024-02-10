import { User } from "@prisma/client";

export const isTeacher = (user?: any) => {
    return user?.role === 'TEACHER';
}