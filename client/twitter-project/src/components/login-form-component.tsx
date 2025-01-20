import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { BaseFormField } from "@/utils/base-form";
import { login } from "@/services/login-service";
import { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useUser } from "@/context/user-context";
import { useTweet } from "@/context/tweet-context";

const formSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export function LoginForm() {
  const { loadUser } = useUser();
  const { loadTweets } = useTweet();
  const navFunction = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    try {
      const loginSuccessful = await login(values, loadUser, loadTweets);

      if (loginSuccessful) {
        navFunction("/home");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-64 space-y-5 md:w-72 lg:w-80 xl:w-[30rem]"
      >
        <BaseFormField
          name="username"
          label="Username"
          placeholder="Enter your username"
          formControl={form.control}
        />

        <div className="flex flex-col space-y-2">
          <BaseFormField
            name="password"
            label="Password"
            placeholder="Enter your password"
            formControl={form.control}
            inputType={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="self-start text-zinc-400"
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </button>
        </div>

        <Button
          className="w-full font-semibold"
          variant={"secondary"}
          type="submit"
        >
          {isPending ? "Loading..." : "Login"}
        </Button>

        <span className="block text-sm text-zinc-300">
          Don't have an account?
          <Link to="/register" className="ml-2 text-blue-500">
            Register
          </Link>
        </span>
      </form>
    </Form>
  );
}
