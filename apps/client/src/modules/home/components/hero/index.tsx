"use client";
import { Box, Group, Stack, Title, Text } from "@mantine/core";
import classes from "./index.module.css";
import Image from "next/image";
import { useMediaQuery } from "@mantine/hooks";
const imgUrls = ["/hero/hero-01.png", "/hero/hero-02.png", "/hero/hero-03.png"];

const Hero = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Group style={{ position: "relative" }} h={450} mt={10} mb={30} gap={0}>
      <Box className={classes.overlay} />
      <Stack className={classes.float}>
        <Title order={1}>Lorem ipsum dolor sit amet consectetur.</Title>
        <Text size="lg" fw={400}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor.{" "}
        </Text>
      </Stack>
      {(isMobile ? [imgUrls[0]] : imgUrls).map((imgUrl, index) => (
        <Box key={index} className={classes.imgBox}>
          <Image src={imgUrl} alt="Istanbul Tours" fill />
        </Box>
      ))}
    </Group>
  );
};
export default Hero;
