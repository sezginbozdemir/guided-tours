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

const aboutHtml = `
  <h2>Introduction</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula tincidunt odio, a auctor tortor volutpat ut. Sed tempor eros eu libero hendrerit, ac malesuada elit tempor. Nulla facilisi.</p>

  <h3>History</h3>
  <p>Phasellus scelerisque lorem vitae eros mollis, et dictum justo condimentum. Cras laoreet enim ac ante hendrerit, ac aliquet sem elementum. Curabitur euismod, arcu in elementum suscipit, arcu turpis fermentum turpis, ac sollicitudin dolor purus ut libero.</p>

  <h3>Culture</h3>
  <p>Aenean euismod euismod lorem, sit amet pharetra ante mollis eget. Integer at posuere ligula. Nulla facilisi. Ut dapibus magna at erat tempor, at feugiat dui euismod.</p>

  <h4>Modern Era</h4>
  <p>Donec varius auctor dolor, at lacinia velit dapibus et. Maecenas vitae vestibulum nulla, in egestas eros. Quisque suscipit, metus id dapibus congue, magna felis auctor elit, vel feugiat libero sapien sit amet libero.</p>

  <h5>Tourism and Economy</h5>
  <p>Morbi pretium neque sit amet ipsum fermentum, in aliquet sapien eleifend. Donec facilisis nisl in arcu volutpat, ac suscipit nunc maximus. Curabitur vitae mauris orci. Sed non felis id nisi interdum luctus a eu lectus.</p>
`;

const AboutDestination = ({ location }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

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
        <Title order={1} fw={500} className={classes.header}>
          About {location.name}
        </Title>
        <Divider mb={10} />
        <Text c="dimmed" dangerouslySetInnerHTML={{ __html: aboutHtml }} />
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
