"use client";
import { Box, Text, Flex, Title, Divider, Group } from "@mantine/core";
import Image from "next/image";
import classes from "./index.module.css";
import { Location, Tour } from "@/types/globals";
import TourSlider from "@/modules/common/components/tour-slider";
import { HiArrowRight } from "react-icons/hi";
import BookButton from "@/modules/common/components/buttons/book-now";
import { Carousel, CarouselSlide } from "@mantine/carousel";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  locations: Location[];
  tours: Tour[];
}

const PopularLocations = ({ locations, tours }: Props) => {
  const popularLocations = locations.filter((loc) => loc.popular);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Box mt={50}>
      {popularLocations.map((loc, idx) => (
        <Box mb={50} key={idx}>
          <Flex
            direction={{ base: "column", sm: "row" }}
            className={classes.group}
          >
            {/* Text Section */}
            <Box className={classes.boxOne}>
              <Group
                w={!isMobile ? "80%" : ""}
                justify="space-between"
                align="end"
              >
                <Title className={classes.locName} order={1} fw={500}>
                  {loc.name}
                </Title>
                <BookButton component="a" href={`/destinations/${loc.id}`}>
                  Visit Destination Page
                  <HiArrowRight style={{ marginLeft: "5px" }} size={15} />
                </BookButton>
              </Group>
              <Text w={!isMobile ? "80%" : ""} c="dimmed">
                {loc.description}
              </Text>
            </Box>

            {/* Image Section */}
            <Box className={classes.boxTwo}>
              <Carousel
                w="100%"
                height="100%"
                slideSize="100%"
                slidesToScroll={1}
                loop
                draggable
              >
                {loc.images.map((img, idx) => (
                  <CarouselSlide key={idx}>
                    <Image
                      style={{ borderRadius: "0.4rem", objectFit: "cover" }}
                      src={`${API_URL}${img}`}
                      alt={loc.name}
                      fill
                    />
                  </CarouselSlide>
                ))}
              </Carousel>
            </Box>
          </Flex>
          <Title className={classes.sliderHeader} mb={10} order={3} fw={450}>
            Top {loc.name} Tours <HiArrowRight size={18} />
          </Title>
          <Divider />
          <TourSlider location={loc.name} tours={tours} />
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <BookButton text="See More"></BookButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PopularLocations;
