"use client";
import { useState, useRef } from "react";
import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import { Box, Stack } from "@mantine/core";
import TourLineItem from "./lineItem";
import { Pagination, Group } from "@mantine/core";

interface Props {
  tours: Tour[];
}

const TourList: React.FC<Props> = ({ tours }) => {
  const [activePage, setActivePage] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const toursPerPage = 8;

  const totalPages = Math.ceil(tours.length / toursPerPage);

  const indexOfLastTour = activePage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
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
    </>
  );
};

export default TourList;
