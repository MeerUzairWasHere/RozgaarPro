import { Text } from "react-native";

type RequiredLabelProps = {
  label: string;
};

const RequiredLabel = ({ label }: RequiredLabelProps) => {
  return (
    <>
      {label} <Text className="text-red-500">*</Text>
    </>
  );
};
export default RequiredLabel;
