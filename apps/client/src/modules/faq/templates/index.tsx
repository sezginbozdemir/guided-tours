"use client";
import { Accordion, Container, Title, Stack } from "@mantine/core";
import faqData from "./data.json";

const FaqTemplate = () => {
  return (
    <Container size="md" py="xl">
      <Stack>
        <Title order={1}>Frequently Asked Questions</Title>
        <Accordion transitionDuration={200}>
          {faqData.map((item, i) => (
            <Accordion.Item key={i} value={item.question}>
              <Accordion.Control>
                <Title order={5} fw={500}>
                  {item.question}
                </Title>
              </Accordion.Control>
              <Accordion.Panel>{item.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Stack>
    </Container>
  );
};

export default FaqTemplate;
