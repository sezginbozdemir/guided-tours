"use client";
import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import TourCard from "../tour-card";
import { Carousel } from "@mantine/carousel";

interface Props {
  tours: Tour[];
  label?: string;
}

const TourSlider: React.FC<Props> = ({ tours, label }) => {
  const filteredTours = label
    ? tours.filter((tour) => tour.label?.toLowerCase() === label.toLowerCase())
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
