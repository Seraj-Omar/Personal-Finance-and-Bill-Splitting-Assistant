import { useEffect, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import { useCurrencies } from "@/src/modules/auth/hooks/useCurrencies";
import UpdateButton from "./UpdateButton";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { set } from "zod";

export default function PasswordForm({
  defaultCurrencyId,
  onChange,
  onUpdatePassword,
}: any) {
  const { data: currencies } = useCurrencies();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [tempCurrencyId, setTempCurrencyId] = useState(defaultCurrencyId);
  const [errorMsg, setErrorMsg] = useState("");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const selectedCurrency = currencies?.data.find(
    (curr: any) => curr.id === defaultCurrencyId,
  );
  const currencyOptions =
    currencies?.data.map((c: any) => ({
      id: c.id,
      label: `${c.code} - ${c.name}`,
    })) || [];

  useEffect(() => {
    setTempCurrencyId(defaultCurrencyId);
  }, [defaultCurrencyId]);

  const handleFinalSubmit = async () => {
    setErrorMsg("");
    const isChangingPassword =
      passwords.currentPassword ||
      passwords.newPassword ||
      passwords.confirmNewPassword;

    if (isChangingPassword) {
      if (
        !passwords.currentPassword ||
        !passwords.newPassword ||
        !passwords.confirmNewPassword
      ) {
        setErrorMsg("Please fill in all password fields");
        return;
      }
      if (passwords.newPassword !== passwords.confirmNewPassword) {
        setErrorMsg("Passwords do not match");
        return;
      }

      await onUpdatePassword(passwords);

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }

    if (tempCurrencyId !== defaultCurrencyId) {
      await onChange({ defaultCurrencyId: tempCurrencyId });
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Current Password"
        type="password"
        placeholder="********"
        value={passwords.currentPassword}
        onChange={(e: any) =>
          setPasswords({ ...passwords, currentPassword: e.target.value })
        }
      />
      <Input
        label="Change Password"
        type="password"
        placeholder="********"
        value={passwords.newPassword}
        onChange={(e: any) =>
          setPasswords({ ...passwords, newPassword: e.target.value })
        }
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="********"
        value={passwords.confirmNewPassword}
        onChange={(e: any) =>
          setPasswords({ ...passwords, confirmNewPassword: e.target.value })
        }
      />

      <Select
        label="Virtual currency"
        defaultValue={tempCurrencyId}
        options={currencyOptions}
        onChange={(id: string) => setTempCurrencyId(id)}
      />

      <div className="text-red-600">{errorMsg}</div>
      <div className="w-full lg:w-1/2">
        <UpdateButton onClick={handleFinalSubmit} />
      </div>
    </div>
  );
}
