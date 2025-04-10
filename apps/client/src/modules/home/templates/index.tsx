import { Container, Stack, Title } from "@mantine/core";
import Hero from "../components/hero";
import { Tour } from "@/types/globals";
import TourSlider from "@/modules/common/components/tour-slider";
import TourGrid from "@/modules/common/components/tour-grid";
import FeaturedTours from "@/modules/common/components/featured-tours";

interface Props {
  tours: Tour[];
}
const locations = ["Turkey", "Istanbul"];

const HomeTemplate: React.FC<Props> = ({ tours }) => {
  return (
    <>
      <Hero />
      <Container size="xl" w="100%">
        <FeaturedTours tours={tours} />
        <TourSlider tours={tours} />
        <TourGrid tours={tours} />

        {locations.map((loc, idx) => (
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
