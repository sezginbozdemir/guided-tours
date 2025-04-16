import { Tour } from "@/types/globals";
import classes from "./index.module.css";
import {
  Checkbox,
  Stack,
  Title,
  Divider,
  ScrollArea,
  Group,
} from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { SelectedFilters } from "../../templates";
import { CgScrollV } from "react-icons/cg";

interface Props {
  tours: Tour[];
  selectedFilters: SelectedFilters;
  setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
}

const Filters = ({ tours, selectedFilters, setSelectedFilters }: Props) => {
  const labels = Array.from(new Set(tours.flatMap((tour) => tour.label || [])));
  const tags = Array.from(new Set(tours.flatMap((tour) => tour.tags || [])));
  const destinations = Array.from(
    new Set(tours.flatMap((tour) => tour.location || []))
  );

  const toggleSelection = (
    category: "labels" | "tags" | "destinations",
    value: string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={5}>Filter by label</Title>
        <CgScrollV size={16} />
      </Group>
      <ScrollArea h={200}>
        <Stack gap={8}>
          {labels.map((label) => (
            <Checkbox
              key={label}
              label={label}
              checked={selectedFilters.labels.includes(label)}
              onChange={() => toggleSelection("labels", label)}
            />
          ))}
        </Stack>
      </ScrollArea>
      <Divider my="sm" />
      <Group justify="space-between" align="center">
        <Title order={5}>Filter by tag</Title>
        <CgScrollV size={16} />
      </Group>
      <ScrollArea h={200}>
        <Stack gap={8}>
          {tags.map((tag) => (
            <Checkbox
              key={tag}
              label={tag}
              checked={selectedFilters.tags.includes(tag)}
              onChange={() => toggleSelection("tags", tag)}
            />
          ))}
        </Stack>
      </ScrollArea>
      {destinations.length > 1 && (
        <>
          <Divider my="sm" />
          <Group justify="space-between" align="center">
            <Title order={5}>Filter by destination</Title>
            <CgScrollV size={16} />
          </Group>
          <ScrollArea h={200}>
            <Stack gap={8}>
              {destinations.map((dest) => (
                <Checkbox
                  key={dest}
                  label={dest}
                  checked={selectedFilters.destinations.includes(dest)}
                  onChange={() => toggleSelection("destinations", dest)}
                />
              ))}
            </Stack>
          </ScrollArea>
        </>
      )}
    </Stack>
  );
};

export default Filters;
