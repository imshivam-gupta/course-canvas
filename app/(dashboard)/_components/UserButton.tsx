"use client";
import { signOut ,useSession} from "next-auth/react"

export const UserButton = () => {
    const { data: session } = useSession();
    if (!session?.user) {
        return null;
    }

    const handleSignOut = async() => {
        await signOut();
    };

    return (
        <div className="flex gap-x-2 ml-auto cursor-pointer" onClick={handleSignOut}>
            <img src={session.user.image as string} className="h-8 w-8 mr-2 rounded-full" />
        </div>
    );
};
