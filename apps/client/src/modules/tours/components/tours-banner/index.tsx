import { Box, Stack, Text, Title } from "@mantine/core";
import classes from "./index.module.css";
import Image from "next/image";

interface Props {
  location?: string;
}

const ToursBanner = ({ location }: Props) => {
  return (
    <Box className={classes.imgBox}>
      <Image src="/hero/hero-02.png" fill alt="tours" />
      <Title className={classes.locTitle} order={1} fw={500}>
        {location ? location : ""} {""}Tours
      </Title>
      <Box className={classes.overlay} />
    </Box>
  );
};
export default ToursBanner;
