import { AVAILABILITY_STATUS } from "@/types";
import clsx from "clsx";
import { View } from "react-native";
import { Text } from "react-native";

const availabilityConfig = {
  AVAILABLE: {
    label: "Available",
    textColor: "text-green-700",
    bgColor: "bg-green-200",
  },
  BUSY: {
    label: "Busy",
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-200",
  },
  UNAVAILABLE: {
    label: "Unavailable",
    textColor: "text-red-700",
    bgColor: "bg-red-200",
  },
};

export default function AvailabilityStatus({
  availability,
}: {
  availability: AVAILABILITY_STATUS;
}) {
  const status = availabilityConfig[availability];
  return (
    <View
      className={clsx(
        "flex-row items-center gap-2 px-5 py-2.5 rounded-full shadow-card",
        status.bgColor,
      )}
    >
      <View
        className={clsx(
          "w-4 h-4 rounded-full",
          status.label === "Busy"
            ? "bg-yellow-500"
            : status.label === "Available"
              ? "bg-green-500"
              : "bg-red-500",
        )}
      />
      <Text className={clsx("font-semibold text-green-900", status.textColor)}>
        {status.label}
      </Text>
    </View>
  );
}
