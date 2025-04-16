"use client";
import { Accordion, Box, Title } from "@mantine/core";
import classes from "./index.module.css";

const GuidedToursFAQ = () => {
  return (
    <Box className={classes.faqContainer}>
      <Title order={3} fw={500} mb="md">
        Frequently Asked Questions
      </Title>
      <Accordion
        variant="separated"
        radius="md"
        defaultValue="q1"
        classNames={{
          item: classes.accordionItem,
          control: classes.accordionControl,
        }}
      >
        <Accordion.Item value="q1">
          <Accordion.Control>
            What is included in a guided tour?
          </Accordion.Control>
          <Accordion.Panel>
            Our guided tours include transportation, an expert local guide,
            entry fees to scheduled attractions, and sometimes meals depending
            on the tour package.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="q2">
          <Accordion.Control>How do I book a tour?</Accordion.Control>
          <Accordion.Panel>
            You can book a tour directly through our website or contact our team
            for assistance. Online payment and confirmation are quick and easy.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="q3">
          <Accordion.Control>
            Are tours suitable for children?
          </Accordion.Control>
          <Accordion.Panel>
            Yes! Many of our tours are family-friendly and we offer options
            specifically tailored for travelers of all ages.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="q4">
          <Accordion.Control>
            What if I need to cancel my booking?
          </Accordion.Control>
          <Accordion.Panel>
            You can cancel your tour up to 48 hours in advance for a full
            refund. Cancellations made after this period may incur charges.
            Check our terms for more details.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
};

export default GuidedToursFAQ;
