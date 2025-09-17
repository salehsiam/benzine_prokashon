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

import { toast } from "sonner";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const RegisterForm = () => {
  const { createUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      // Create Firebase Auth user
      const result = await createUser(data.email, data.password);
      const user = result.user;

      const userData = {
        name: data.name,
        email: data.email,
        role: "user",
        status: "active",
        image: user?.photoURL || "",
        time: new Date().toISOString(),
      };

      try {
        const res = await axiosPublic.get(`/users/${user.email}`);
        if (!res.data) {
          await axiosPublic.post("/users", userData);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          await axiosPublic.post("/users", userData);
        } else {
          throw err; // rethrow other errors
        }
      }

      toast.success("Registered successfully!");
      form.reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed!");
    }
  };

  // Google Signin
  const handleGoogle = async () => {
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Full name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
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

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              rules={{ required: "Confirm your password" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-2 px-4 rounded-lg"
            >
              Register
            </button>
          </form>
        </Form>

        <div className="relative text-center text-sm my-4 after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full bg-white text-blue-400 py-2 px-4 rounded-lg border"
        >
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
