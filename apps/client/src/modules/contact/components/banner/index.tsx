import { Box, Stack, Text, Title } from "@mantine/core";
import classes from "./index.module.css";
import Image from "next/image";

const ContactBanner = () => {
  return (
    <Box className={classes.imgBox}>
      <Image src="/hero/hero-01.png" fill alt="contact" />
      <Stack className={classes.locStack} gap={0}>
        <Title className={classes.locTitle} order={1} fw={500}>
          Contact us
        </Title>
        <Text w="80%" className={classes.locText} size="lg" fw={500}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
        </Text>
      </Stack>
      <Box className={classes.overlay} />
    </Box>
  );
};
export default ContactBanner;
