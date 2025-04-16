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
import Link from "next/link";

interface Props {
  locations: Location[];
  tours: Tour[];
}

const VECTOR_MAP = [
  "/vectors/vector-istanbul.png",
  "/vectors/vector-antalya.png",
  "/vectors/vector-efes.png",
  "/vectors/vector.png",
  "/vectors/vector-cappadoccia.png",
  "/vectors/vector-nemrut-2.png",
];

const PopularLocations = ({ locations, tours }: Props) => {
  const popularLocations = locations.filter((loc) => loc.popular);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Box mt={50}>
      {popularLocations.map((loc, idx) => {
        const vectorPath = VECTOR_MAP[idx];

        return (
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
                <Text style={{ zIndex: 2 }} w={!isMobile ? "80%" : ""}>
                  {loc.description}
                </Text>
                <Image
                  src={vectorPath}
                  alt="vector"
                  width={600}
                  height={430}
                  className={classes.vector}
                />
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
              Top {loc.name} Tours{" "}
              <Group gap={3} align="center">
                <Link href={`/tours?location=${loc.name.toLowerCase()}`}>
                  {!isMobile && (
                    <Text size="md" c="dimmed" fw={300}>
                      See more
                    </Text>
                  )}
                </Link>
                <HiArrowRight color="gray" size={18} />
              </Group>
            </Title>
            <Divider />
            <TourSlider location={loc.name} tours={tours} />
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <BookButton
                component="a"
                href={`/tours?location=${loc.name.toLowerCase()}`}
                text="See More"
              ></BookButton>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default PopularLocations;
