"use client";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { ExtendedUser } from "@/next-auth";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from '@/hooks/use-current-user';
import {  buttonVariants } from '../ui/button';
import { signOut } from 'next-auth/react';
import { LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserInfoProps {
    user?: ExtendedUser;
    label: string;
};

const UserInfo = ({
    user,
    label,
}: UserInfoProps) => {
    return (
        <Card className="w-[600px] rounded-none shadow-none border-none">
            <CardHeader className='pt-0'>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        ID
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Name
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Email
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Role
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.role}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Two Factor Authentication
                    </p>
                    <Badge
                        variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
                    >
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}

export const UserModal = ({
}) => {
    const user = useCurrentUser();
    const Comp = "button";

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <div className="flex gap-x-2 ml-auto cursor-pointer">
                    <img src={user.image as string} className="h-8 w-8 mr-2 rounded-full" />
                </div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="DialogContent fixed left-[50%] top-[50%] z-50 grid w-full max-w-[650px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-2 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full">
                    <Dialog.Description>
                        <Dialog.Close asChild className='ml-auto flex flex-row justify-end px-6 pt-2'>

                            <button className="IconButton" aria-label="Close">
                                <Cross2Icon className='w-4 h-4' />
                            </button>
                        </Dialog.Close>
                        <UserInfo user={user} label="User Settings" />

                        <div className='ml-auto mb-2 flex flex-row justify-end px-6 pt-2 gap-x-4' >


                            <Comp
                                className={cn(buttonVariants({ variant: "outline", size: "sm", className: "p-2 cursor-pointer" }))}
                            >
                                <Settings className='w-4 h-4 my-auto mr-2' />
                                Manage Account
                            </Comp>

                            <Comp
                                className={cn(buttonVariants({ variant: "destructive", size: "sm", className: "p-2 cursor-pointer" }))}
                                onClick={() => signOut()}
                            >
                                <LogOut className='w-4 h-4 my-auto mr-2' />
                                Signout
                            </Comp>
                        </div>
                    </Dialog.Description>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};