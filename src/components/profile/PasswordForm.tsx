import Input from "./Input";
import Select from "./Select";
import { useCurrencies } from "@/src/modules/auth/hooks/useCurrencies";

export default function PasswordForm({defaultCurrencyId, onChange}:any) {
  const { data: currencies } = useCurrencies();
  const selectedCurrency = currencies?.data.find(
    (curr: any) => curr.id === defaultCurrencyId
  );
  const currencyOptions = currencies?.data.map((c: any) => ({
    id: c.id,
    label: `${c.code} - ${c.name}`
  })) || [];

  const handleCurrencyChange = (id: string) => {
    // 2. Wrap the ID in the object the API expects
    onChange({ defaultCurrencyId: id });
  };
  console.log("US:", selectedCurrency);
  return (
    <div className="flex flex-col gap-6">
      <Input label="Change Password" type="password" placeholder="********" />
      <Input label="Confirm Password" type="password" placeholder="********" />
      <Select
        label="Virtual currency"
        defaultValue={defaultCurrencyId} // Use value for controlled component
        options={currencyOptions}
        onChange={handleCurrencyChange}
      />
    </div>
  );
}
