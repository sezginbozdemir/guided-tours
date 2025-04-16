import { Group } from "@mantine/core";
import ContactBanner from "../components/banner";
import ContactForm from "../components/form";
import Socials from "../components/socials";
import GuidedToursFAQ from "../components/accordion";

const ContactTemplate = () => {
  return (
    <>
      <ContactBanner />
      <Group mb={30} mt={30} w="100%" h="100%" align="center">
        <Socials />
        <ContactForm />
      </Group>
      <GuidedToursFAQ />
    </>
  );
};
export default ContactTemplate;
