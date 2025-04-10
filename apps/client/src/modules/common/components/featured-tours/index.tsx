"use client";
import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import FeaturedCard from "./featuredCard";
import { Carousel } from "@mantine/carousel";
interface Props {
  tours: Tour[];
  label?: string;
}

const FeaturedTours: React.FC<Props> = ({ tours, label }) => {
  const filteredTours = label
    ? tours.filter((tour) => tour.label?.toLowerCase() === label.toLowerCase())
    : tours;
  return (
    <Carousel
      mt={30}
      mb={30}
      height={150}
      slideSize="33.333333%"
      slideGap="sm"
      align="start"
      slidesToScroll={3}
      dragFree
      loop
    >
      {filteredTours.map((tour, index) => (
        <Carousel.Slide key={index}>
          <FeaturedCard tour={tour} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default FeaturedTours;
