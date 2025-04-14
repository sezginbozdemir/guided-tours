import { Box, Text } from "@mantine/core";
import classes from "./index.module.css";
import Image from "next/image";
import { Location } from "@/types/globals";
import Link from "next/link";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface Props {
  location: Location;
}

const DestinationCard = ({ location }: Props) => {
  return (
    <Link href={`/destinations/${location.id}`} className={classes.card}>
      <Image src={`${API_URL}${location.images[0]}`} alt="Guided Tours" fill />
      <Box className={classes.overlay} />
      <Text className={classes.title} fw={800} size="30px">
        {location.name}
      </Text>
    </Link>
  );
};

export default DestinationCard;
