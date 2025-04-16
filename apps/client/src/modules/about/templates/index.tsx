"use client";
import { Container, Title, Text, Stack } from "@mantine/core";
import data from "./data.json";

const AboutTemplate = () => {
  return (
    <Stack>
      <Title order={1}>{data.title}</Title>
      {data.text.split("\n\n").map((paragraph, i) => (
        <Text key={i} size="md" c="dimmed">
          {paragraph}
        </Text>
      ))}
    </Stack>
  );
};

export default AboutTemplate;
