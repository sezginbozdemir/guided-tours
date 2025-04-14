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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla]);

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
        slideSize="33.333333%"
        slideGap="sm"
        align="start"
        slidesToScroll={1}
        dragFree
        loop
        getEmblaApi={setEmbla}
      >
        {filteredTours.map((tour, index) => (
          <Carousel.Slide key={index}>
            <FeaturedCard tour={tour} />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Box className={classes.progress}>
        <Progress
          color="gray"
          value={scrollProgress}
          size="5px"
          w="100%"
          maw={150}
        />
      </Box>
    </>
  );
};

export default FeaturedTours;
