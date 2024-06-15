import { Breadcrumb as AntBreadcrumb } from "antd";
import React, { CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
};

const Breadcrumb: React.FC<Props> = ({ className, style }) => {
  return <AntBreadcrumb className={className} style={style} />;
};

export default Breadcrumb;
