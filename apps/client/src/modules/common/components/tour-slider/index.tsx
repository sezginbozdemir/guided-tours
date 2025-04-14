"use client";
import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import TourCard from "../tour-card";
import { Carousel } from "@mantine/carousel";

interface Props {
  tours: Tour[];
  label?: string;
  location?: string;
}

const TourSlider: React.FC<Props> = ({ location, tours, label }) => {
  const filteredTours = label
    ? tours.filter((tour) => tour.label?.toLowerCase() === label.toLowerCase())
    : location
      ? tours.filter(
          (tour) => tour.location.toLowerCase() === location.toLowerCase()
        )
      : tours;
  return (
    <Carousel
      mt={30}
      mb={30}
      height={500}
      slideSize="25%"
      slideGap="sm"
      align="start"
      slidesToScroll={2}
      loop
      draggable
      withIndicators
      classNames={{
        control: classes.control,
        indicators: classes.indicators,
        indicator: classes.indicator,
      }}
    >
      {filteredTours.map((tour, index) => (
        <Carousel.Slide key={index}>
          <TourCard tour={tour} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default TourSlider;
