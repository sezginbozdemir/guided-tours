import { Box, Title, Text, Container } from "@mantine/core";
import Hero from "../components/hero";
import { Tour } from "@/types/globals";
import TourSlider from "@/modules/common/components/tour-slider";
import TourGrid from "@/modules/common/components/tour-grid";
import TourList from "@/modules/common/components/tour-list";

interface HomeTemplateProps {
  tours: Tour[];
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({ tours }) => {
  return (
    <>
      <Hero />
      <Container size="xl" w="100%">
        <TourSlider tours={tours} />
        <TourGrid tours={tours} />
        <TourList tours={tours} />
      </Container>
    </>
  );
};
export default HomeTemplate;
