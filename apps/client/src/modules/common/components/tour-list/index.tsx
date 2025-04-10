"use client";
import { useState, useRef } from "react";
import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import { Stack } from "@mantine/core";
import TourLineItem from "./lineItem";
import { Pagination, Group } from "@mantine/core";

interface Props {
  tours: Tour[];
  location?: string;
}

const TourList: React.FC<Props> = ({ tours, location }) => {
  const [activePage, setActivePage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const filteredTours = location
    ? tours.filter(
        (tour) => tour.location?.toLowerCase() === location.toLowerCase()
      )
    : tours;

  const toursPerPage = 8;

  const totalPages = Math.ceil(filteredTours.length / toursPerPage);

  const indexOfLastTour = activePage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Stack w="100%">
      <Stack ref={listRef} gap={20}>
        {currentTours.map((tour, index) => (
          <TourLineItem key={index} tour={tour} />
        ))}
      </Stack>

      {totalPages > 1 && (
        <Group justify="center" mt="2rem">
          <Pagination
            total={totalPages}
            value={activePage}
            onChange={handlePageChange}
            withEdges
          />
        </Group>
      )}
    </Stack>
  );
};

export default TourList;
