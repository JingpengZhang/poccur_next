import { useMemoizedFn } from "ahooks";
import { Menu, MenuProps } from "antd";
import { useRouter } from "next/navigation";

const SideMenu = () => {
  const router = useRouter();

  const adminPagePrefix = "/god";
  const menus: MenuProps["items"] = [
    {
      key: adminPagePrefix + "/write-article",
      label: "写博文",
    },
    {
      key: "/article",
      label: "博文管理",
      children: [
        {
          key: adminPagePrefix + "/category",
          label: "分类管理",
        },
      ],
    },
  ];

  // 菜单项点击回调
  const onMenuItemClick = useMemoizedFn(({ key }) => {
    router.push(key);
  });
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      items={menus}
      onClick={onMenuItemClick}
      style={{ height: "100%", borderRight: 0 }}
    />
  );
};

export default SideMenu;
