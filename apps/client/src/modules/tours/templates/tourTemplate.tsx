import { Anchor, Breadcrumbs, Container } from "@mantine/core";
import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import ImageGallery from "../components/image-gallery";
import TourPageInfo from "../components/tour-info";
import TourDetails from "../components/tour-details";
import TourDescription from "../components/tour-description";

interface Props {
  tour: Tour;
}

const TourTemplate: React.FC<Props> = ({ tour }) => {
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
    <Container size="xl" w="100%">
      <Breadcrumbs separator="/">{items}</Breadcrumbs>
      <TourPageInfo tour={tour} />
      <ImageGallery tour={tour} />
      <TourDetails tourDetails={tour.tourDetails} />
      <TourDescription description={tour.description} />
    </Container>
  );
};

export default TourTemplate;
