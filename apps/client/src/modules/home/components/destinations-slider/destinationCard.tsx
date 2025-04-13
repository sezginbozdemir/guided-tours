import { Box, Title, Text, Stack } from "@mantine/core";
import classes from "./index.module.css";
import Image from "next/image";
import { Location } from "@/types/globals";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface Props {
  location: Location;
}

const DestinationCard = ({ location }: Props) => {
  return (
    <Box className={classes.card}>
      <Image src={`${API_URL}${location.images[0]}`} alt="Guided Tours" fill />
      <Box className={classes.overlay} />
      <Text className={classes.title} fw={800} size="30px">
        {location.name}
      </Text>
    </Box>
  );
};

export default DestinationCard;
