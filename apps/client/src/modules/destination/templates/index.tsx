import { Container, Divider, Stack, Title } from "@mantine/core";
import { Location, Tour } from "@/types/globals";
import DestinationTours from "../components/tours";
import AboutDestination from "../components/about";
import DestinationsSlider from "@/modules/home/components/destinations-slider";
import { HiArrowRight } from "react-icons/hi";
import classes from "./index.module.css";

interface Props {
  locations: Location[];
  location: Location;
  tours: Tour[];
}
const DestinationTemplate = ({ locations, tours, location }: Props) => {
  const filteredLocations = locations.filter((loc) => loc.id !== location.id);
  return (
    <Container mt={10} size="xl" w="100%">
      <DestinationTours tours={tours} location={location} />
      <AboutDestination location={location} />
      <Stack mb={50}>
        <Title className={classes.sliderHeader} order={3} fw={450}>
          Other Destinations <HiArrowRight size={18} />
        </Title>
        <Divider />

        <DestinationsSlider locations={filteredLocations} />
      </Stack>
    </Container>
  );
};
export default DestinationTemplate;
