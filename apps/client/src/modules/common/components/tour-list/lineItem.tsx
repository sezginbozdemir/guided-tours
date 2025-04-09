"use client";
import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import Image from "next/image";
import TourBadge from "../badge";
import { Box, Group, Text, ActionIcon, Stack, Button } from "@mantine/core";
import { FaHeart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import Link from "next/link";

interface Props {
  tour: Tour;
}

const TourLineItem: React.FC<Props> = ({ tour }) => {
  return (
    <Group className={classes.lineItem}>
      <Box className={classes.imageContainer}>
        <Image
          src={tour.images[0]}
          alt={tour.title}
          fill
          className={classes.image}
        />
        <TourBadge text="Popular" className={classes.redBadge} />
      </Box>
      <Group className={classes.contentContainer}>
        <Stack>
          <Group gap={5}>
            <IoLocationOutline size={16} color="gray" />
            <Text size="sm" c="dimmed">
              {tour.location}
            </Text>
          </Group>
          <Stack gap={0}>
            <Link href="/">
              <Text size="xl" fw={700} className={classes.title}>
                {tour.title}
              </Text>
            </Link>
            <Text className={classes.description}>{tour.shortDescription}</Text>
          </Stack>
          <Group>
            <BsClock size={16} />
            <Text size="sm">{tour.duration}</Text>
          </Group>
          <Group>
            {tour.tags.map((tag, idx) => (
              <Text key={idx} size="md">
                {tag}
              </Text>
            ))}
          </Group>
        </Stack>
        <Stack h="100%" align="end" justify="space-between">
          <ActionIcon variant="subtle">
            <FaHeart size={20} />
          </ActionIcon>
          <Stack align="end" mt={5}>
            <Text size="xl" fw={700} c="blue">
              ${tour.price}
            </Text>
            <Button>Book Now</Button>
          </Stack>
        </Stack>
      </Group>
    </Group>
  );
};

export default TourLineItem;
