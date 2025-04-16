"use client";
import { Location } from "@/types/globals";
import classes from "./index.module.css";
import { Group, Stack, Title, Text, Box, Flex, Divider } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  location: Location;
}

const AboutDestination = ({ location }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  const vectorImages = [
    "/vectors/vectorOne.png",
    "/vectors/vectorTwo.png",
    "/vectors/vectorThree.png",
    "/vectors/vectorFour.png",
    "/vectors/vectorFive.png",
    "/vectors/vectorSix.png",
    "/vectors/vectorSeven.png",
    "/vectors/vectorEight.png",
    "/vectors/vectorNine.png",
    "/vectors/vectorTen.png",
    "/vectors/vectorEleven.png",
  ];
  const vectorIndex = Math.floor(Math.random() * vectorImages.length);
  const vectorImage = vectorImages[vectorIndex];
  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      align="center"
      w="100%"
      h="100%"
      mt={50}
      mb={50}
    >
      <Stack style={{ flex: 7 }} gap={0}>
        <Group mb={10}>
          <Title order={1} fw={500} className={classes.header}>
            About {location.name}
          </Title>
          <Image
            src={vectorImage}
            alt="vector"
            width={50}
            height={50}
            className={classes.vectorImg}
          />
        </Group>
        <Divider mb={10} />
        <Text c="dimmed" dangerouslySetInnerHTML={{ __html: location.about }} />
      </Stack>
      <Box className={classes.outerBox}>
        <Box className={classes.innerBox}>
          <Carousel
            h="100%"
            height="100%"
            slideSize="100%"
            slideGap="sm"
            slidesToScroll={1}
            loop
            draggable
          >
            {location.images.map((img, idx) => (
              <Carousel.Slide key={idx}>
                <Image src={`${API_URL}${img}`} alt={location.name} fill />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
      </Box>
    </Flex>
  );
};
export default AboutDestination;
