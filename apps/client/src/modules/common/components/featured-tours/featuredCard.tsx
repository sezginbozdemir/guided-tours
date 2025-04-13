"use client";
import { Group, Title, Stack, Box } from "@mantine/core";
import Image from "next/image";
import classes from "./index.module.css";
import { Tour } from "@/types/globals";
import TourBadge from "../badge";
import Link from "next/link";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  tour: Tour;
}

const FeaturedCard: React.FC<Props> = ({ tour }) => {
  return (
    <Link href={`/tours/${tour.id}`} className={classes.card}>
      <Box className={classes.cardImgBox}>
        <Image src={`${API_URL}${tour.images[0]}`} alt={tour.title} fill />
      </Box>
      <Stack style={{ flex: 1 }} h="100%" justify="space-between">
        <Stack>
          <Title order={5}>{tour.title}</Title>

          {tour.tags?.length > 0 && (
            <Group>
              {tour.tags.slice(0, 2).map((tag, idx) => (
                <TourBadge text={tag} key={idx} className={classes.tags} />
              ))}
            </Group>
          )}
        </Stack>
        <Title order={3}>${tour.price}</Title>
      </Stack>
    </Link>
  );
};

export default FeaturedCard;
