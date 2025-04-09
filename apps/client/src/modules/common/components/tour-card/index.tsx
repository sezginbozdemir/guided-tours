"use client";
import {
  Box,
  Image,
  Text,
  Badge,
  Group,
  Card,
  Title,
  Stack,
  Button,
} from "@mantine/core";
import classes from "./index.module.css";
import { Tour } from "@/types/globals";

interface Props {
  tour: Tour;
}

const TourCard: React.FC<Props> = ({ tour }) => {
  return (
    <Card className={classes.card}>
      <Card.Section>
        <Image
          src={tour.images[0]}
          alt={tour.title}
          height={150}
          fit="cover"
          fallbackSrc="/hero/hero-01.png"
        />
      </Card.Section>
      <Stack gap={30} justify="space-between">
        <Stack gap={0} mt={10}>
          <Title order={4}>{tour.title}</Title>
          {tour.tags?.length > 0 && (
            <Group mt="xs">
              {tour.tags.map((tag, idx) => (
                <Badge key={idx} className={classes.tags}>
                  {tag}
                </Badge>
              ))}
            </Group>
          )}
        </Stack>

        <Stack>
          <Title order={3}>${tour.price}</Title>
          <Button>Book Now</Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default TourCard;
