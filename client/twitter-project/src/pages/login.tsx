import BaseComponent from "@/components/base";
import { LoginForm } from "@/components/login-form";

interface LoginProps {}
export default function Login(_props: LoginProps) {
  return (
    <BaseComponent text="Login">
      <LoginForm />
    </BaseComponent>
  );
}
