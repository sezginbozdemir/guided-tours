import { Anchor, Box, Breadcrumbs, Container, Group } from "@mantine/core";
import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import ImageGallery from "../components/image-gallery";
import TourPageInfo from "../components/tour-info";
import TourDetails from "../components/tour-details";
import TourDescription from "../components/tour-description";
import FeaturedTours from "@/modules/common/components/featured-tours";

interface Props {
  tour: Tour;
  tours: Tour[];
}

const TourTemplate: React.FC<Props> = ({ tours, tour }) => {
  const items = [
    { title: "Home", href: "/" },
    { title: "Tours", href: "/tours" },
    { title: tour.title, href: `/tours` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Container mb={50} size="xl" w="100%">
      <Breadcrumbs separator="/">{items}</Breadcrumbs>
      <TourPageInfo tour={tour} />
      <ImageGallery tour={tour} />
      <Group align="start" mt={20}>
        <Box style={{ flex: 8 }}>
          <TourDescription description={tour.description} />
        </Box>
        <Box style={{ flex: 4 }}>
          <TourDetails tour={tour} />
        </Box>
      </Group>
      <FeaturedTours tours={tours} label="Popular" />
    </Container>
  );
};

export default TourTemplate;
