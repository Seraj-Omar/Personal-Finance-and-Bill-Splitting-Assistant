import Input from "./Input";
import Select from "./Select";
export default function PersonalInfoForm() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Input label="First Name*" placeholder="Ghaydaa" disabled />
      <Input label="Last Name*" placeholder="Ahmed" disabled />

      <div className="flex flex-col gap-6 lg:col-span-2">
        <Input
          label="Email*"
          className="lg:col-span-2"
          placeholder="ghydaaahmed@gmail.com"
          disabled
        />

        <Input
          label="Phone Number*"
          className="lg:col-span-2"
          placeholder="+972598756526"
        />

        <Select label="Gender*" options={["Female", "Male"]} />
      </div>
    </div>
  );
}
