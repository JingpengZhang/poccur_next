import { CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
} & React.PropsWithChildren;

const ModuleTitle: React.FC<Props> = ({ className, style, children }) => {
  return (
    <div
      style={style}
      className={`text-black font-bold text-lg pb-4 border-b border-stone-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default ModuleTitle;
