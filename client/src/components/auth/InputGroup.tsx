import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { InputGroupProps } from "@/types";

const InputGroup = ({ label, errorObject, ...props }: InputGroupProps) => {
  return (
    <div className="space-y-1">
      <Label className="font-light">{label}</Label>
      <Input
        className={`md:text-md ${errorObject && "border-destructive"}`}
        {...props}
      />
      {errorObject && (
        <p className="text-destructive font-semibold">{errorObject.message}</p>
      )}
    </div>
  );
};

export default InputGroup;
