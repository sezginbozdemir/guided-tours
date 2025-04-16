"use client";
import { Box, Container, Group, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Tour } from "@/types/globals";
import TourList from "@/modules/common/components/tour-list";
import classes from "./index.module.css";
import ToursBanner from "../components/tours-banner";
import Filters from "../components/filters";
import { useState } from "react";
import BookButton from "@/modules/common/components/buttons/book-now";
import { IoFilterSharp } from "react-icons/io5";

interface Props {
  tours: Tour[];
  location?: string;
}
export interface SelectedFilters {
  labels: string[];
  tags: string[];
  destinations: string[];
}

const ToursTemplate: React.FC<Props> = ({ tours, location }) => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    labels: [],
    tags: [],
    destinations: [],
  });
  const [opened, { open, close }] = useDisclosure(false);
  const filterTours = (tours: Tour[]) => {
    return tours.filter((tour) => {
      const matchesLabels =
        selectedFilters.labels.length === 0 ||
        selectedFilters.labels.some((label) => tour.label?.includes(label));

      const matchesTags =
        selectedFilters.tags.length === 0 ||
        selectedFilters.tags.some((tag) => tour.tags?.includes(tag));

      const matchesDestinations =
        selectedFilters.destinations.length === 0 ||
        selectedFilters.destinations.includes(tour.location);

      return matchesLabels && matchesTags && matchesDestinations;
    });
  };
  const filteredTours = filterTours(tours);

  return (
    <>
      <Drawer size="xs" opened={opened} onClose={close}>
        <Filters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          tours={tours}
        />
      </Drawer>

      <Container mt={20} size="xl" w="100%">
        <ToursBanner location={location} />
        <BookButton className={classes.button} onClick={open} mt={20}>
          Filters{""}
          <IoFilterSharp size={16} />
        </BookButton>
        <Group
          pos="relative"
          mt={20}
          mb={20}
          align="start"
          w="100%"
          h="100%"
          gap={5}
        >
          <Box className={classes.box}>
            <Filters
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              tours={tours}
            />
          </Box>
          <Box style={{ display: "flex", flex: 1 }}>
            <TourList tours={filteredTours} />
          </Box>
        </Group>
      </Container>
    </>
  );
};
export default ToursTemplate;
