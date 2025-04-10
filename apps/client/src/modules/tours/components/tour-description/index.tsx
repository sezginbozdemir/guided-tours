import { Text } from "@mantine/core";

interface Props {
  description: string;
}
const TourDescription = ({ description }: Props) => {
  return <Text dangerouslySetInnerHTML={{ __html: description }} />;
};
export default TourDescription;
