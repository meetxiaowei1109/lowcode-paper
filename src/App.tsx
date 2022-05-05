import { useState, useEffect } from "react";
import { Menu, Divider, Spin } from "antd";
import Pages from "./pages/pages";
import "antd/dist/antd.css";
import Ax from "./api/axios";

const schemaModel = {
  name: "尚伟维",
  formProps: {
    labelCol: {
      span: 2,
      offset: 0,
    },
    wrapperCol: {
      span: 16,
      offset: 0,
    },
    colon: true,
    labelAlign: "right",
    layout: "horizontal",
    scrollToFirstError: false,
    validateTrigger: "onChange",
    preserve: true,
    requiredMark: true,
  },
  schemaList: [
    {
      id: "1651469292529",
      type: "input",
      configs: {
        itemProps: {
          name: "inputaz5",
          label: "标题",
          rules: [
            {
              required: true,
              message: "请输入标题！",
            },
          ],
          noStyle: false,
          trigger: "onChange",
          hidden: false,
        },
        inputProps: {
          disabled: false,
          placeholder: "请输入",
          allowClear: false,
          bordered: true,
          id: "",
        },
        extra: {
          wordsLimit: null,
        },
      },
      currentItemValue: null,
      needDefineGetterProps: {},
    },
    {
      id: "1651469294336",
      type: "inputPassword",
      configs: {
        itemProps: {
          name: "inputPasswordfs6",
          label: "密码",
          rules: [
            {
              required: true,
              message: "请输入密码！",
            },
          ],
          noStyle: false,
          trigger: "onChange",
          hidden: false,
        },
        inputProps: {
          disabled: false,
          placeholder: "请输入",
          visibilityToggle: true,
        },
      },
      currentItemValue: null,
      needDefineGetterProps: {},
    },
    {
      id: "1651469295438",
      type: "input",
      configs: {
        itemProps: {
          name: "inputiac",
          label: "标题",
          rules: [
            {
              required: true,
              message: "请输入标题！",
            },
          ],
          noStyle: false,
          trigger: "onChange",
          hidden: false,
        },
        inputProps: {
          disabled: false,
          placeholder: "请输入",
          allowClear: false,
          bordered: true,
          id: "",
        },
        extra: {
          wordsLimit: null,
        },
      },
      currentItemValue: null,
      needDefineGetterProps: {},
    },
    {
      id: "1651469563655",
      type: "submit",
      configs: {
        itemProps: {
          label: "",
          wrapperCol: {
            offset: 8,
          },
          noStyle: false,
          hidden: false,
        },
        inputProps: {
          disabled: false,
          type: "primary",
          htmlType: "submit",
          block: false,
          danger: false,
          ghost: false,
        },
        extra: {
          childrenNode: "Submit",
        },
      },
      currentItemValue: null,
      needDefineGetterProps: {},
    },
  ],
};

function App() {
  const [menuKey, setMenuKey] = useState(["list"]);
  const [lists, setLists] = useState<any>([]);
  const [config, setConfig] = useState(schemaModel);
  const [loading, setLoading] = useState(false);
  const [defaultKey, setDefaultKey] = useState("1");
  const [query, setQuery] = useState({ id: "", ownUser: "" });

  const getPages = async () => {
    const data = await Ax("/users/getPages", { id: query.ownUser });
    if (Array.isArray(data) && data.length > 0) {
      setLists(data);
    }
  };

  const changeMenu = (id: any) => {
    setLoading(true);
    const item = lists.find((e: any) => e.id == id);
    try {
      if (item) {
        const leggo = JSON.parse(item.configJSON);
        setConfig(leggo);
      } else {
        setConfig(schemaModel);
      }
    } catch (e) {}
  };

  useEffect(() => {
    const query = Object.fromEntries(
      location.search
        .replace("?", "")
        .split("&")
        .map((e) => e.split("="))
    );
    setQuery(query);
  }, []);

  useEffect(() => {
    getPages();
  }, [query]);

  useEffect(() => {
    changeMenu(menuKey[0]);
  }, [menuKey]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [config]);

  useEffect(() => {
    changeMenu(query.id);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [lists]);

  return (
    <main className="main-page">
      <Menu
        onSelect={({ key }) => setMenuKey([key])}
        style={{ width: 256, height: "100vh" }}
        defaultSelectedKeys={[defaultKey]}
        defaultOpenKeys={["list"]}
        mode="inline"
      >
        <Menu.SubMenu key="list" title={<span>页面列表</span>}>
          {lists.map((e: any) => (
            <Menu.Item key={e.id}>{e.title}</Menu.Item>
          ))}
        </Menu.SubMenu>
      </Menu>
      <div className="main-content">
        <Divider orientation="left">
          <h3>表单</h3>
        </Divider>
        <Spin spinning={loading}>
          {loading ? null : <Pages config={config} />}
        </Spin>
      </div>
    </main>
  );
}

export default App;
