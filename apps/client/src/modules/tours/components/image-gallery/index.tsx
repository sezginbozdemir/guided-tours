"use client";
import classes from "./index.module.css";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { Box, Group, ActionIcon } from "@mantine/core";
import Image from "next/image";
import { Tour } from "@/types/globals";
import { useState } from "react";

interface Props {
  tour: Tour;
}

const ImageGallery = ({ tour }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1 >= tour.images.length ? 1 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 1 ? tour.images.length - 1 : prev - 1
    );
  };

  return (
    <Group h={500}>
      <Box className={classes.box1}>
        <Image src={tour.images[0]} alt={tour.title} fill />
      </Box>
      <Box className={classes.box2}>
        <Image src={tour.images[currentIndex]} alt={tour.title} fill />
        <ActionIcon
          variant="transparent"
          className={classes.leftButton}
          onClick={prevImage}
          aria-label="Previous Image"
        >
          <FaChevronCircleLeft color="white" size={60} />
        </ActionIcon>
        <ActionIcon
          variant="transparent"
          className={classes.rightButton}
          onClick={nextImage}
          aria-label="Next Image"
        >
          <FaChevronCircleRight color="white" size={60} />
        </ActionIcon>
      </Box>
    </Group>
  );
};
export default ImageGallery;
