import {
  Text,
  Group,
  Divider,
  Anchor,
  Container,
  Title,
  Stack,
} from "@mantine/core";
import { FaCcVisa, FaCcMastercard, FaTripadvisor } from "react-icons/fa";
import classes from "./index.module.css";

const Footer = () => {
  return (
    <Container size="xl">
      <Group gap={40} align="start">
        <Stack>
          <Title order={2}>LOGO</Title>
          <Text>Address: 1234 Your Street, City, Country</Text>
          <Text>Phone: +1 (234) 567-890</Text>
          <Text>Email: info@example.com</Text>
          <Group>
            <FaCcVisa size={40} />
            <FaCcMastercard size={40} />
            <FaTripadvisor size={40} />
          </Group>
        </Stack>
        <Stack>
          <Title order={3} mb={10}>
            Links
          </Title>
          <Anchor href="/" size="sm">
            Home
          </Anchor>
          <Anchor href="/tours" size="sm">
            Tours
          </Anchor>
          <Anchor href="/contact" size="sm">
            Contact
          </Anchor>
        </Stack>
      </Group>

      <Divider my="md" />
      <Group justify="space-between">
        <Text size="sm">&copy; 2025 All Rights Reserved.</Text>
        <Group>
          <Anchor href="/terms" size="sm">
            Terms & Conditions
          </Anchor>
          <Text>•</Text>
          <Anchor href="/privacy" size="sm">
            Privacy Policy
          </Anchor>
        </Group>
      </Group>
    </Container>
  );
};

export default Footer;
