import { IoLocationOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import { Group, Text } from "@mantine/core";
import { Tour } from "@/types/globals";
interface Props {
  tour: Tour;
}

const TourPageInfo = ({ tour }: Props) => {
  return (
    <Group gap={10}>
      <Group gap={5}>
        <IoLocationOutline size={20} color="gray" />
        <Text size="md" c="dimmed">
          {tour.location}
        </Text>
      </Group>
      <Group>
        <BsClock size={20} />
        <Text size="md">{tour.duration}</Text>
      </Group>

      <Group>
        {tour.tags.map((tag, idx) => (
          <Text key={idx} size="md">
            {tag}
          </Text>
        ))}
      </Group>
    </Group>
  );
};
export default TourPageInfo;
