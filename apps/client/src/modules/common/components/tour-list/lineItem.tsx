"use client";
import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import Image from "next/image";
import TourBadge from "../badge";
import { Group, Text, ActionIcon, Stack, Button } from "@mantine/core";
import { FaHeart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import Link from "next/link";
import BookButton from "../buttons/book-now";
import { FaCircleDot } from "react-icons/fa6";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  tour: Tour;
}

const TourLineItem: React.FC<Props> = ({ tour }) => {
  return (
    <Group className={classes.lineItem}>
      <Link href={`/tours/${tour.id}`} className={classes.imageContainer}>
        <Image
          src={`${API_URL}${tour.images[0]}`}
          alt={tour.title}
          fill
          className={classes.image}
        />
        {tour.label && (
          <TourBadge text={tour.label} className={classes.redBadge} />
        )}
      </Link>
      <Group className={classes.contentContainer}>
        <Stack h="100%" justify="space-between">
          <Group c="dimmed">
            <Group gap={5}>
              <IoLocationOutline size={16} color="gray" />
              <Text size="sm">{tour.location}</Text>
            </Group>
            <FaCircleDot size={8} />
            <Group gap={5}>
              <BsClock size={16} color="gray" />
              <Text size="sm">{tour.duration}</Text>
            </Group>
          </Group>
          <Stack gap={0}>
            <Link href={`/tours/${tour.id}`}>
              <Text size="xl" fw={700} className={classes.title}>
                {tour.title}
              </Text>
            </Link>
            <Text className={classes.description}>{tour.shortDescription}</Text>
          </Stack>
          <Group>
            {tour.tags.map((tag, idx) => (
              <TourBadge text={tag} key={idx} />
            ))}
          </Group>
          <Text size="xl" fw={700} c="blue">
            ${tour.price}
          </Text>
        </Stack>
        <Stack h="100%" align="end" justify="space-between">
          <ActionIcon variant="subtle">
            <FaHeart size={20} />
          </ActionIcon>
          <BookButton />
        </Stack>
      </Group>
    </Group>
  );
};

export default TourLineItem;
