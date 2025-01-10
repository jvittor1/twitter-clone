import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";

import { Link, useNavigate } from "react-router-dom";
import { BaseFormField } from "@/utils/base-form";
import { login } from "@/services/login-service";

const formSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export function LoginForm() {
  const navFunction = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values, navFunction);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-5">
        <BaseFormField
          name="username"
          label="Username"
          placeholder="Enter your username"
          formControl={form.control}
        />

        <BaseFormField
          name="password"
          label="Password"
          placeholder="Enter your password"
          formControl={form.control}
          inputType="password"
        />

        <Button
          className="w-full font-semibold"
          variant={"secondary"}
          type="submit"
        >
          Login
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
