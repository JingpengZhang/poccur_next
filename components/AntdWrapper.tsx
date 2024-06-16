"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";

const AntdWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }} locale={zhCN}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdWrapper;
