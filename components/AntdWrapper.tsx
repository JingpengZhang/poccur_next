"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";

const AntdWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }} locale={zhCN}>
        <App>{children}</App>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdWrapper;
