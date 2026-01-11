import { forwardRef } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from "react-native";

type Variant = "default" | "secondary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<any, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      children,
      style,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => [
          styles.base,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && styles.fullWidth,
          isDisabled && styles.disabled,
          pressed && !isDisabled && styles.pressed,
          style as ViewStyle,
        ]}
        disabled={isDisabled}
        {...props}
      >
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator
              color={getLoaderColor(variant)}
              style={styles.loader}
            />
          ) : (
            <>
              {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
              <Text
                style={[
                  styles.text,
                  textVariantStyles[variant],
                  textSizeStyles[size],
                ]}
              >
                {children}
              </Text>
              {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
            </>
          )}
        </View>
      </Pressable>
    );
  }
);

Button.displayName = "Button";

const getLoaderColor = (variant: Variant): string => {
  switch (variant) {
    case "default":
    case "destructive":
      return "#ffffff";
    default:
      return "#0f172a";
  }
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "600",
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  loader: {
    marginRight: 0,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

/* ---------- Variants ---------- */

const variantStyles: Record<Variant, ViewStyle> = {
  default: {
    backgroundColor: "#2563eb",
  },
  secondary: {
    backgroundColor: "#e5e7eb",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  destructive: {
    backgroundColor: "#ef4444",
  },
};

const textVariantStyles: Record<Variant, TextStyle> = {
  default: {
    color: "#ffffff",
  },
  secondary: {
    color: "#0f172a",
  },
  outline: {
    color: "#0f172a",
  },
  ghost: {
    color: "#0f172a",
  },
  destructive: {
    color: "#ffffff",
  },
};

/* ---------- Sizes ---------- */

const sizeStyles: Record<Size, ViewStyle> = {
  sm: {
    height: 40,
    paddingHorizontal: 16,
  },
  md: {
    height: 48,
    paddingHorizontal: 20,
  },
  lg: {
    height: 56,
    paddingHorizontal: 24,
  },
};

const textSizeStyles: Record<Size, TextStyle> = {
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
  },
  lg: {
    fontSize: 18,
  },
};
