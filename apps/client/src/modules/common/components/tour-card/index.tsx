"use client";
import { Image, Group, Card, Title, Stack } from "@mantine/core";
import classes from "./index.module.css";
import { Tour } from "@/types/globals";
import BookButton from "../buttons/book-now";
import TourBadge from "../badge";
import Link from "next/link";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  tour: Tour;
}

const TourCard: React.FC<Props> = ({ tour }) => {
  return (
    <Card className={classes.card}>
      <Link className={classes.imgBox} href={`/tours/${tour.id}`}>
        <Image
          src={`${API_URL}${tour.images[0]}`}
          alt={tour.title}
          height={250}
          fit="cover"
          fallbackSrc="/hero/hero-01.png"
        />
        {tour.label && (
          <TourBadge text={tour.label} className={classes.badge} />
        )}
      </Link>

      <Stack px={10} gap={0} h="100%" justify="space-between">
        <Link href={`/tours/${tour.id}`}>
          <Title mt={10} order={4}>
            {tour.title}
          </Title>
        </Link>

        <Stack>
          {tour.tags?.length > 0 && (
            <Group gap={10} mt="xs">
              {tour.tags.map((tag, idx) => (
                <TourBadge text={tag} key={idx} className={classes.tags} />
              ))}
            </Group>
          )}
          <Title order={3}>${tour.price}</Title>
          <BookButton />
        </Stack>
      </Stack>
    </Card>
  );
};

export default TourCard;
