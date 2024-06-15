"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";

const AntdWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdWrapper;
