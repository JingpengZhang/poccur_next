import { Flex } from "antd";
import dayjs from "dayjs";
import React from "react";
import { IoTimeOutline } from "react-icons/io5";

type Props = {
  timestamp: string;
  format?: string;
};

const TimeWithIcon: React.FC<Props> = ({
  timestamp,
  format = "YYYY-MM-DD",
}) => {
  return (
    <Flex align="center" gap={4} className=" mt-2">
      <IoTimeOutline />
      <span className="text-xs">{dayjs(timestamp).format(format)}</span>
    </Flex>
  );
};

export default TimeWithIcon;
