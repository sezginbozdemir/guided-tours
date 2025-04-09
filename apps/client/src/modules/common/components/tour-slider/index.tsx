"use client";
import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import TourCard from "../tour-card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box } from "@mantine/core";

interface Props {
  tours: Tour[];
}

const TourSlider: React.FC<Props> = ({ tours }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 0,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 0,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={3000}
      transitionDuration={500}
      swipeable
      draggable
      showDots={true}
      itemClass={classes.slide}
      containerClass={classes.carouselContainer}
      removeArrowOnDeviceType={["mobile"]}
    >
      {tours.map((tour, index) => (
        <TourCard key={index} tour={tour} />
      ))}
    </Carousel>
  );
};

export default TourSlider;
