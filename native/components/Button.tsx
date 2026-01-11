import { cn } from "@/utils/utils";
import { forwardRef } from "react";
import { Pressable, Text, PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<PressableProps, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      className,
      textClassName,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Pressable
        className={cn(
          "items-center justify-center rounded-xl active:opacity-90",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <Text
          className={cn(
            "font-semibold",
            textVariantStyles[variant],
            textSizeStyles[size],
            textClassName
          )}
        >
          {children}
        </Text>
      </Pressable>
    );
  }
);

Button.displayName = "Button";

/* ---------------- styles ---------------- */

const variantStyles = {
  default: "bg-primary",
  secondary: "bg-muted",
  outline: "border border-border bg-transparent",
  ghost: "bg-transparent",
};

const textVariantStyles = {
  default: "text-primary-foreground",
  secondary: "text-foreground",
  outline: "text-foreground",
  ghost: "text-foreground",
};

const sizeStyles = {
  sm: "h-10 px-4",
  md: "h-12 px-6",
  lg: "h-14 px-8",
};

const textSizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};
