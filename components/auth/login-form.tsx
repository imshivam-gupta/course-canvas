"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { LoginSchema } from "@/schemas";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {IconBrandGithub, IconBrandGoogle} from "@tabler/icons-react";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider!"
    : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
      <div
          className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black">
        <h2 className="font-bold text-xl text-neutral-200">
          Welcome to Course Canvas
        </h2>
        <p className="text-sm max-w-sm mt-2 text-neutral-300">
          Login to Course Canvas to access all premium features
        </p>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                // className=""
                className="my-8"
            >
                <div className="space-y-8">
                    {showTwoFactor && (
                        <FormField
                            control={form.control}
                            name="code"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Two Factor Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="123456"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    )}
                    {!showTwoFactor && (
                        <>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <LabelInputContainer>
                                            <Label htmlFor="email">Email</Label>
                                            <Input {...field} disabled={isPending} id="email"
                                                   placeholder="john.doe@example.com" type="email"/>
                                        </LabelInputContainer>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <LabelInputContainer>
                                            <Label htmlFor="password">Password</Label>
                                            <Input {...field} disabled={isPending} id="password" placeholder="******"
                                                   type="password"/>
                                        </LabelInputContainer>

                                        <Button
                                            size="sm"
                                            variant="link"
                                            asChild
                                            className="px-0 font-normal text-white hover:font-semibold"
                                        >
                                            <Link href="/auth/reset">
                                                Forgot password?
                                            </Link>
                                        </Button>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                </div>
                <FormError message={error || urlError}/>
                <FormSuccess message={success}/>
                {/*<Button*/}
                {/*    disabled={isPending}*/}
                {/*    type="submit"*/}
                {/*    className="w-full mt-4"*/}
                {/*>*/}
                {/*  {showTwoFactor ? "Confirm" : "Login"}*/}
                {/*</Button>*/}
                <button
                    className="bg-gradient-to-br mt-4 relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium  shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    disabled={isPending}
                >
                    Login &rarr;
                    <BottomGradient/>
                </button>

                <div
                    className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full"/>

                <div className="flex flex-col space-y-4">
                    <button
                        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="submit"
                    >
                        <IconBrandGithub className="h-4 w-4 text-neutral-300"/>
                        <span className="text-neutral-300 text-sm">
              GitHub
            </span>
                        <BottomGradient/>
                    </button>
                    <button
                        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="submit"
                    >
                        <IconBrandGoogle className="h-4 w-4 text-neutral-300"/>
                        <span className="text-neutral-300 text-sm">
              Google
            </span>
                        <BottomGradient/>
                    </button>
                </div>
            </form>
        </Form>
      </div>
);
};

const BottomGradient = () => {
    return (
        <>
        <span
            className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"/>
            <span
                className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"/>
        </>
    );
};

const LabelInputContainer = ({
    children,
        className,
}: {
    children: React.ReactNode;
    className ? : string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};