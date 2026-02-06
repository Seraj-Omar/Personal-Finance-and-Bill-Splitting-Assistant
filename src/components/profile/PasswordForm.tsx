import Input from "./Input";
import Select from "./Select";

export default function PasswordForm() {
  return (
    <div className="flex flex-col gap-6">
      <Input label="Change Password" type="password" placeholder="********" />
      <Input label="Confirm Password" type="password" placeholder="********" />
      <Select
        label="Virtual currency"
        options={["USD - US Dollar", "EUR - Euro"]}
      />
    </div>
  );
}
