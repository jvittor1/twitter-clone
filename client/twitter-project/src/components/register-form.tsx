import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { BaseFormField } from "@/utils/base-form";
import { register } from "@/services/register-service";
import { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";

const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
});

export function RegisterForm() {
  const navFunction = useNavigate();
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    register(values, navFunction).finally(() => {
      setIsPending(false);
    });
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
          name="email"
          label="Email"
          placeholder="Enter your email"
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
          className="flex w-full items-center justify-center font-semibold"
          variant={"secondary"}
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Registering..." : "Register"}
        </Button>

        <span className="block text-sm text-zinc-300">
          Already have an account?
          <Link to="/login" className="ml-2 text-blue-500">
            Login
          </Link>
        </span>
      </form>
    </Form>
  );
}
