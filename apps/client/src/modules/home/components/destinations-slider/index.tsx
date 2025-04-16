"use client";
import { Carousel } from "@mantine/carousel";
import classes from "./index.module.css";
import DestinationCard from "./destinationCard";
import { Location } from "@/types/globals";
interface Props {
  locations: Location[];
}
const DestinationsSlider = ({ locations }: Props) => {
  return (
    <Carousel
      height={200}
      slideSize={{ base: "50%", xs: "33.333333%", sm: "20%" }}
      slideGap="sm"
      align="start"
      slidesToScroll={2}
      loop
      draggable
      classNames={{ control: classes.control, viewport: classes.carousel }}
    >
      {locations.map((loc, idx) => (
        <Carousel.Slide key={idx}>
          <DestinationCard location={loc} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
export default DestinationsSlider;
