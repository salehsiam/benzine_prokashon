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

import { toast } from "sonner"; // or your toast library
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const LoginForm = () => {
  const { signInUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);
      navigate("/");
      toast.success("Logged in successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Login failed!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        role: "user",
        status: "active",
        image: user.photoURL,
        time: new Date().toISOString(),
      };

      const res = await axiosPublic.get(`/users/${user.email}`);
      if (!res.data) {
        await axiosPublic.post("/users", userData);
      }
    } catch (err) {
      console.error(err);
      // toast.error("Google login failed!");
    }
    // toast("Signed in with Google!");
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required" }}
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
              rules={{ required: "Password is required" }}
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

        {/* Divider */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-4">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-blue-400 py-2 px-4 rounded-lg border"
        >
          Login With Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
