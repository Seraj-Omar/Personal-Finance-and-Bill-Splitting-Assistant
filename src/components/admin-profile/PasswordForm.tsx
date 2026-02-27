import { useCurrencies } from "@/src/modules/auth/hooks/useCurrencies";
import Input from "../profile/Input";
import Select from "../profile/Select";
import UpdateButton from "../profile/UpdateButton";
import { useEffect, useState } from "react";

export default function PasswordForm({
  defaultCurrencyId,
  onChange,
  onUpdatePassword,
}: any) {
  const { data: currencies } = useCurrencies();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  
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
      {errorMsg && <div className="text-red-600 font-medium">{errorMsg}</div>}
      <div className="w-full lg:w-1/2">
        <UpdateButton onClick={handleFinalSubmit} />
      </div>
    </div>
  );
}
