import ContactTemplate from "@/modules/contact/templates";
import { Container } from "@mantine/core";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guided Istanbul Tours",
  description: "Turkey Tours",
};

export default async function Contact() {
  return (
    <Container mt={20} size="xl" w="100%">
      <ContactTemplate />
    </Container>
  );
}
