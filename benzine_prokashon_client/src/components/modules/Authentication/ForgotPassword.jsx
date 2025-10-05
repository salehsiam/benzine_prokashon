import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "../../ui/form";
import { toast } from "sonner";
import useAuth from "../../../Hooks/useAuth";
import logo from "./../../../assets/logo.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const form = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    try {
      await resetPassword(data.email);
      toast.success("Password reset email sent! Check your inbox.");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex justify-center gap-2 ">
        <Link to="/" className="flex items-center gap-2 font-medium">
          <img src={logo} alt="Benzine Logo" width={42} height={42} />
        </Link>
      </div>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4 text-center">Forgot Password</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Send Reset Email
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
