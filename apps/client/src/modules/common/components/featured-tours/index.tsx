"use client";
import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import FeaturedCard from "./featuredCard";
import { Carousel, Embla } from "@mantine/carousel";
import { Box, Divider, Group, Progress, Stack, Title } from "@mantine/core";
import { HiArrowRight } from "react-icons/hi";
import BookButton from "../buttons/book-now";
import { useCallback, useEffect, useState } from "react";
interface Props {
  tours: Tour[];
  label?: string;
}

const FeaturedTours: React.FC<Props> = ({ tours, label }) => {
  const filteredTours = label
    ? tours.filter((tour) => tour.label?.toLowerCase() === label.toLowerCase())
    : tours;
  return (
    <>
      <Group mt={30} justify="space-between">
        <Title className={classes.title} order={3} fw={450}>
          {label} Tours <HiArrowRight size={18} />
        </Title>
        <BookButton text="See More" />
      </Group>
      <Divider mt={10} />
      <Carousel
        mt={30}
        mb={30}
        height={150}
        slideSize={{ base: "95%", xs: "80%", sm: "50%", md: "33.3333%" }}
        slideGap="sm"
        align="start"
        slidesToScroll={1}
        dragFree
        loop
      >
        {filteredTours.map((tour, index) => (
          <Carousel.Slide key={index}>
            <FeaturedCard tour={tour} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
};

export default FeaturedTours;
