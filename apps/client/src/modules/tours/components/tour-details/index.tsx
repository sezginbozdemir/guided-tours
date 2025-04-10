"use client";

import { Paper, Title, List, Group } from "@mantine/core";
import { FiCheck } from "react-icons/fi";
import classes from "./index.module.css";

interface Props {
  tourDetails: Record<string, string[]>;
}

const TourDetails = ({ tourDetails }: Props) => {
  return (
    <Group className={classes.group}>
      {Object.entries(tourDetails).map(([key, values]) => (
        <Paper
          className={classes.paper}
          key={key}
          shadow="sm"
          p="md"
          radius="md"
          withBorder
        >
          <Title style={{ textTransform: "capitalize" }} mb={20} order={4}>
            {key}
          </Title>
          <List size="sm" icon={<FiCheck size={20} />}>
            {values.map((value, index) => (
              <List.Item key={index}>{value}</List.Item>
            ))}
          </List>
        </Paper>
      ))}
    </Group>
  );
};

export default TourDetails;
