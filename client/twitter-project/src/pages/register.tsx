import BaseComponent from "@/components/base";
import { RegisterForm } from "@/components/register-form";

interface RegisterProps {}
export default function Register(_props: RegisterProps) {
  return (
    <BaseComponent text="Register">
      <RegisterForm />
    </BaseComponent>
  );
}
