import { Flex } from "antd";

const Navigation = () => {
  return (
    <div className="w-full fixed top-0 left-0 z-50 border-b border-stone-200 bg-white">
      <Flex align="center" className="h-16 w-page mx-auto font-bold text-lg">
        Home
      </Flex>
    </div>
  );
};

export default Navigation;
