import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

const LoginForm = () => {
  const form = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // toast.success("Logged in successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        {/* <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p> */}
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-2 px-4 rounded-lg"
            >
              Login
            </button>
          </form>
        </Form>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-4">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <button className="w-full bg-white text-blue-400 py-2 px-4 rounded-lg border">
          Login With Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
