import { Badge } from "@mantine/core";
import classes from "./index.module.css";

interface Props {
  text: string;
  className?: string;
}

const TourBadge = ({ text, className }: Props) => {
  const combinedClasses = className
    ? `${classes.badge} ${className}`
    : classes.badge;

  return <Badge className={combinedClasses}>{text}</Badge>;
};

export default TourBadge;
