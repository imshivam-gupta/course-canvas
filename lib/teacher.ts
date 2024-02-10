import { User } from "@prisma/client";

export const isTeacher = (user?: User | null) => {
    return user?.role === 'TEACHER';
}