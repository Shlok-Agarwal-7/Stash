"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import OtpDialog from "./OtpDialog";
import { createAccount } from "@/lib/userActions/user.actions";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.email(),
    fullName:
      formType === "signup" ? z.string().min(2).max(50) : z.string().optional(),
  });
};

type FormType = "signin" | "signup";

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountID, setAccountID] = useState(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const user = await createAccount({
        fullName: values.fullName || "",
        email: values.email,
      });

      setAccountID(user.accountID);
    } catch (error) {
      setErrorMessage("Failed to create account,Please Try again");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="h1">{type === "signin" ? "Sign In" : "Sign Up"}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="shad-input"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {type === "signup" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className="shad-input"
                      placeholder="What should we call you?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button variant="primary" type="submit" disabled={isLoading}>
            {!isLoading && "Submit"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="Loading"
                width={20}
                height={20}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
        </form>
      </Form>
      <p className="body-1 text-danger-a0">{errorMessage}</p>

      <Link
        href={type === "signin" ? "/signup" : "/signin"}
        className="text-sm text-primary-a0 hover:underline"
      >
        {type === "signin"
          ? "Don't have an account? Sign Up"
          : "Already have an account? Sign In"}
      </Link>

      {/* {accountID && <OtpDialog email="shlok@gmail.com" />} */}
    </>
  );
};

export default AuthForm;
