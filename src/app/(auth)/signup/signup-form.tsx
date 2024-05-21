"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signup } from "@/actions/auth/signup";

const formSchema = z
  .object({
    fullName: z
      .string()
      .min(2, {
        message: "Too short",
      })
      .max(50, {
        message: "Too long",
      }),
    email: z.string().min(2, {
      message: "Too short",
    }),
    password: z.string().min(8, {
      message: "Too short",
    }),
    confirmPassword: z.string().min(8, {
      message: "Too short",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mismatch",
    path: ["confirmPassword"],
  });

const SignupForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password, fullName } = values;
    console.log("----->values", values);
    await signup({ email, password, full_name: fullName });
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          {/* FullName Signup Input */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <div className="flex justify-between">
                  <FormLabel>Full Name</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="Moncef Moussaoui" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Email Signup Input */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <div className="flex justify-between">
                  <FormLabel>Email</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    placeholder="ka_moussaoui@esi.dz"
                    {...field}
                    type="email"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Passwrod Signup Input */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <div className="flex justify-between">
                  <FormLabel>Password</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Confir Passwrod Signup Input */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <div className="flex justify-between">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SignupForm;
