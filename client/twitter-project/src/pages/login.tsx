import BaseComponent from "@/components/base-component";
import { LoginForm } from "@/components/login-form-component";

interface LoginProps {}
export default function Login(_props: LoginProps) {
  return (
    <BaseComponent text="Login">
      <LoginForm />
    </BaseComponent>
  );
}
