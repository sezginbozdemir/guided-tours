"use client";
import { useRef, useState } from "react";
import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import TourCard from "../tour-card";
import { Grid, Pagination, Box, Group } from "@mantine/core";

interface Props {
  tours: Tour[];
}

const TourGrid: React.FC<Props> = ({ tours }) => {
  const [activePage, setActivePage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const toursPerPage = 8;

  const totalPages = Math.ceil(tours.length / toursPerPage);

  const indexOfLastTour = activePage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Grid ref={gridRef} gutter="1.2rem">
        {currentTours.map((tour, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <TourCard tour={tour} />
          </Grid.Col>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Group justify="center" mt="5rem">
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

export default TourGrid;
