"use client";
import classes from "./index.module.css";
import { Box, Group } from "@mantine/core";
import Image from "next/image";
import { Tour } from "@/types/globals";
import { Carousel } from "@mantine/carousel";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface Props {
  tour: Tour;
}

const ImageGallery = ({ tour }: Props) => {
  return (
    <Group w="100%" h={400} gap={10}>
      <Box className={classes.box1}>
        <Image src={`${API_URL}${tour.images[0]}`} alt={tour.title} fill />
      </Box>
      <Box className={classes.box2}>
        <Carousel
          w="100%"
          h="100%"
          slideSize="100%"
          slidesToScroll={1}
          loop
          draggable
          classNames={{
            control: classes.control,
            container: classes.carouselContainer,
            viewport: classes.carouselViewport,
          }}
        >
          {tour.images.slice(1).map((img, idx) => (
            <Carousel.Slide key={idx}>
              <Image
                style={{ borderRadius: "1rem", objectFit: "cover" }}
                src={`${API_URL}${img}`}
                alt={tour.title}
                fill
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
    </Group>
  );
};
export default ImageGallery;
