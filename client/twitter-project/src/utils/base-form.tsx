import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl: Control<T>;
}

export const BaseFormField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  inputType,
  formControl,
}: FormFieldProps<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-zinc-300">{label}</FormLabel>
          <FormControl>
            <Input
              className="text-zinc-300"
              {...field}
              type={inputType || "text"}
              placeholder={placeholder}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
