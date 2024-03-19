import Select from "react-select";

interface SchemaDropdownProps {
  options: any;
  value?: any;
  label?: string | undefined;
  onChange?: any;
  onRemove?: any;
}
const SchemaDropdown = ({
  options,
  value,
  onChange,
  label,
  onRemove,
}: SchemaDropdownProps) => {
  
  return (
    <Select
      value={value}
      options={options}
      onChange={onChange}
      placeholder="Add schema to segment"
    />
  );
};

export default SchemaDropdown;
