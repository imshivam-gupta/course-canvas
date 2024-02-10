"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Problem Name is required",
  }),
});

const CreatePage = () => {
  const { data: session } = useSession();

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: ""
      },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        const response = await axios.post("/api/editors", { ...values, teacherId: session?.user.id });
        router.push(`/teacher/editors/${response.data.id}`);
        toast.success("Problem created");
      } catch {
        toast.error("Something went wrong");
      }
    }

    return (
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        <div>
          <h1 className="text-2xl">
            Enter the problem name
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Problem Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Two Sum'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What is this problem called?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link href="/">
                  <Button
                    type="button"
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );

}

export default CreatePage;