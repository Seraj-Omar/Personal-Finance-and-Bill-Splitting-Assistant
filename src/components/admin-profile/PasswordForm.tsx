import Input from "../profile/Input";
import Select from "../profile/Select";

export default function PasswordForm() {
  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Change Password"
        type="password"
        placeholder="********"
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="********"
      />
      
    </div>
  );
}
