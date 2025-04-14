"use client";
import { useState } from "react";
import {
  Box,
  Accordion,
  Title,
  Text,
  Stack,
  Group,
  Divider,
  Button,
  Tooltip,
} from "@mantine/core";
import {
  FiChevronDown,
  FiChevronRight,
  FiInfo,
  FiCalendar,
} from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import classes from "./index.module.css";
import { Tour } from "@/types/globals";

interface Props {
  tour: Tour;
}

const TourDetails = ({ tour }: Props) => {
  const [activeItem, setActiveItem] = useState<string | null>(
    Object.keys(tour.tourDetails)[0]
  );

  return (
    <Box className={classes.container} p="md">
      <Group mb="md" justify="space-between" align="center">
        <Group align="center">
          <FiInfo size={24} className={classes.infoIcon} />
          <Title order={3}>Tour Details</Title>
        </Group>
        <Title order={3}>From {tour.price} $</Title>
      </Group>
      <Divider />
      <Accordion
        value={activeItem}
        onChange={setActiveItem}
        variant="filled"
        radius="md"
        className={classes.accordion}
        chevron={<GoPlus />}
      >
        {Object.entries(tour.tourDetails).map(([key, values]) => (
          <Accordion.Item key={key} value={key} className={classes.item}>
            <Accordion.Control
              icon={
                activeItem === key ? (
                  <FiChevronDown size={15} />
                ) : (
                  <FiChevronRight size={15} />
                )
              }
              className={classes.control}
            >
              <Text fw={500} size="md" style={{ textTransform: "capitalize" }}>
                {key}
              </Text>
            </Accordion.Control>
            <Accordion.Panel className={classes.panel}>
              <Stack gap="xs">
                {values.map((value, index) => (
                  <Group key={index} gap="sm">
                    <Box className={classes.bullet} />
                    <Text size="md" fw={400}>
                      {value}
                    </Text>
                  </Group>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      <Divider my="md" />
      <Tooltip label="Book this amazing tour now!" position="top">
        <Button
          size="lg"
          radius="md"
          leftSection={<FiCalendar size={20} />}
          className={classes.bookButton}
          fullWidth
        >
          Book Now
        </Button>
      </Tooltip>
    </Box>
  );
};

export default TourDetails;
