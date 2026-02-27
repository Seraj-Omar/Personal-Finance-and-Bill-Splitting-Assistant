import { UserProfile } from "@/src/types/profile";
import Input from "./Input";
import UpdateButton from "./UpdateButton";
import { useEffect, useState } from "react";

interface Props {
  user: UserProfile;
  onSubmit?: (data: Partial<UserProfile>) => void;
}

export default function PersonalInfoForm({ user, onSubmit }: Props) {
  const [form, setForm] = useState({
    firstName: user.fullName.split(" ")[0] || "",
    lastName: user.fullName.split(" ").slice(1).join(" ") || "",
    phone: user.phone ?? "",
  });
  useEffect(() => {
    setForm({
      firstName: user.fullName.split(" ")[0] || "",
      lastName: user.fullName.split(" ").slice(1).join(" ") || "",
      phone: user.phone ?? "",
    });
  }, [user]);

  const handleSubmit = () => {
    if (!onSubmit) return;

    onSubmit({
      fullName: `${form.firstName} ${form.lastName}`.trim(),
      phone: form.phone,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Input
        label="First Name*"
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />

      <Input
        label="Last Name*"
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />

      <div className="flex flex-col gap-6 lg:col-span-2">
        <Input label="Email*" value={user.email} disabled />

        <Input
          label="Phone Number*"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <div className="lg:col-span-2">
        <UpdateButton onClick={handleSubmit} />
      </div>
    </div>
  );
}
