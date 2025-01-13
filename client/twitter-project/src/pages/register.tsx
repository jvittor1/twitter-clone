import BaseComponent from "@/components/base-component";
import { RegisterForm } from "@/components/register-form-component";

interface RegisterProps {}
export default function Register(_props: RegisterProps) {
  return (
    <BaseComponent text="Register">
      <RegisterForm />
    </BaseComponent>
  );
}
