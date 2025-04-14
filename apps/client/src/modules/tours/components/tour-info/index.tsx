import { IoLocationOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import { Group, Stack, Text, Title } from "@mantine/core";
import { Tour } from "@/types/globals";
import TourBadge from "@/modules/common/components/badge";
interface Props {
  tour: Tour;
}

const TourPageInfo = ({ tour }: Props) => {
  return (
    <Stack gap={0} mt={10}>
      <Title order={1} fw={400}>
        {tour.title}
      </Title>
      <Group my={10} gap={10}>
        <Group gap={5}>
          <IoLocationOutline size={20} color="gray" />
          <Text size="md" c="dimmed">
            {tour.location}
          </Text>
        </Group>
        <Group gap={5}>
          <BsClock size={20} color="gray" />
          <Text size="md" c="dimmed">
            {tour.duration}
          </Text>
        </Group>

        <Group>
          {tour.tags.map((tag, idx) => (
            <TourBadge text={tag} key={idx} />
          ))}
        </Group>
      </Group>
    </Stack>
  );
};
export default TourPageInfo;
