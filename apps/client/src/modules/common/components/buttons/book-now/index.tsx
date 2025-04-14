"use client";
import { Button, ButtonProps, createPolymorphicComponent } from "@mantine/core";
import classes from "./index.module.css";
import React from "react";

interface BookButtonProps extends ButtonProps {
  text?: string;
  className?: string;
}

const _BookButton = ({
  text = "Book Now",
  className,
  children,
  ...others
}: BookButtonProps) => {
  const combinedClasses = className
    ? `${classes.button} ${className}`
    : classes.button;

  return (
    <Button className={combinedClasses} {...others}>
      {children ?? text}
    </Button>
  );
};

const BookButton = createPolymorphicComponent<"button", BookButtonProps>(
  _BookButton
);

export default BookButton;
