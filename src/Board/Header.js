import { SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import LogOut from "../Authorization/LogOut";
import ChangePassword from "../Authorization/СhangePassword";
import s from "./Header.module.css";

const Header = () => {
  let login = useSelector((state) => state.dataUser.email);
  let [visiblePass, setVisiblePass] = useState(false);
  let [visibleLogOut, setVisibleLogOut] = useState(false);

  return (
    <div className={s.header}>
      <div className={s.boxMenu}>
        <div className={s.menu}>
          <Menu
            style={{ width: 150 }}
            mode="inline"
            triggerSubMenuAction="click"
            inlineIndent="10"
          >
            <SubMenu
              style={{ zIndex: "0" }}
              title={
                <span>
                  <SettingOutlined />
                  <span>Settings</span>
                </span>
              }
            >
              <Menu.Item
                onClick={() => {
                  setVisiblePass(true);
                }}
              >
                Change password
                <ChangePassword visible={visiblePass} setVisible={setVisiblePass} />
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  setVisibleLogOut(true);
                }}
              >
                Log Out
                <LogOut visible={visibleLogOut} setVisible={setVisibleLogOut} />
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
      <div className={s.boxLogin}>
        <div className={s.login}>{login}</div>
      </div>
    </div>
  );
};

export default Header;
