import { Button } from "@mantine/core";
import classes from "./index.module.css";

interface Props {
  text?: string;
  className?: string;
}

const BookButton = ({ text = "Book Now", className }: Props) => {
  const combinedClasses = className
    ? `${classes.button} ${className}`
    : classes.button;

  return <Button className={combinedClasses}>{text}</Button>;
};

export default BookButton;
