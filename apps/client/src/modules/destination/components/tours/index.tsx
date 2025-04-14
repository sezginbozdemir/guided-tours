import { Box, Divider, Group, Stack, Title } from "@mantine/core";
import classes from "./index.module.css";
import { Location, Tour } from "@/types/globals";
import Image from "next/image";
import TourGrid from "@/modules/common/components/tour-grid";
import { HiArrowRight } from "react-icons/hi";
import BookButton from "@/modules/common/components/buttons/book-now";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  location: Location;
  tours: Tour[];
}

const DestinationTours = ({ tours, location }: Props) => {
  return (
    <Stack>
      <Box className={classes.imgBox}>
        <Image
          src={`${API_URL}${location.images[0]}`}
          fill
          alt={location.name}
        />
        <Title className={classes.locTitle} order={1} fw={500}>
          {location.name}
        </Title>
        <Box className={classes.overlay} />
      </Box>
      <Box className={classes.gridBox}>
        <Group justify="space-between" align="center" mb={10}>
          <Title className={classes.sliderHeader} order={3} fw={450}>
            Top {location.name} Tours <HiArrowRight size={18} />
          </Title>
          <Group>
            {[1, 2, 3].map((index) => (
              <BookButton key={index}>Some Filters</BookButton>
            ))}
          </Group>
        </Group>

        <Divider mb={30} />

        <TourGrid location={location.name} tours={tours} />
      </Box>
    </Stack>
  );
};
export default DestinationTours;
