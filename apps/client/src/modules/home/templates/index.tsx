import { Box, Container, Stack, Title } from "@mantine/core";
import Hero from "../components/hero";
import { Location, Tour } from "@/types/globals";
import TourSlider from "@/modules/common/components/tour-slider";
import TourGrid from "@/modules/common/components/tour-grid";
import FeaturedTours from "@/modules/common/components/featured-tours";
import DestinationsSlider from "../components/destinations-slider";
import classes from "./index.module.css";

interface Props {
  tours: Tour[];
  locations: Location[];
}
const destinations = ["Turkey", "Istanbul"];

const HomeTemplate: React.FC<Props> = ({ tours, locations }) => {
  return (
    <>
      <Hero />
      <Container size="xl" w="100%">
        <Box className={classes.box}>
          <DestinationsSlider locations={locations} />
        </Box>
        <FeaturedTours tours={tours} />
        <TourSlider tours={tours} />
        <TourGrid tours={tours} />

        {destinations.map((loc, idx) => (
          <Stack key={idx}>
            <Title order={3}>
              {loc}
              {""} Tours
            </Title>
            <TourGrid location={loc} tours={tours} />
          </Stack>
        ))}
      </Container>
    </>
  );
};
export default HomeTemplate;
