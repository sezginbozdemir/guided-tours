"use client";
import { Text } from "@mantine/core";
import { useEffect, useState } from "react";

interface Props {
  description: string;
}

const TourDescription = ({ description }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return <Text dangerouslySetInnerHTML={{ __html: description }} />;
};
export default TourDescription;
