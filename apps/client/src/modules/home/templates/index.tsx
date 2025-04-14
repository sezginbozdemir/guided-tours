import { Box, Container } from "@mantine/core";
import Hero from "../components/hero";
import { Location, Tour } from "@/types/globals";
import FeaturedTours from "@/modules/common/components/featured-tours";
import DestinationsSlider from "../components/destinations-slider";
import classes from "./index.module.css";
import PopularLocations from "../components/popular-locations";

interface Props {
  tours: Tour[];
  locations: Location[];
}

const HomeTemplate: React.FC<Props> = ({ tours, locations }) => {
  return (
    <>
      <Hero />
      <Container size="xl" w="100%">
        <Box className={classes.box}>
          <DestinationsSlider locations={locations} />
        </Box>
        <FeaturedTours label="Popular" tours={tours} />
        <PopularLocations tours={tours} locations={locations} />
      </Container>
    </>
  );
};
export default HomeTemplate;
