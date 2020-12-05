import { SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState } from "react";
import LogOut from "../Authorization/LogOut";
import ChangePassword from "../Authorization/СhangePassword";
import ArrayForm from "../ExtraComponents/Form/ArrayForm";
import s from "./Header.module.css";
import "./Header.css";
import classNames from "classnames";

const Header = () => {
  let [visiblePass, setVisiblePass] = useState(false);
  let [visibleLogOut, setVisibleLogOut] = useState(false);
  let [visibleArrayForm, setVisibleArrayForm] = useState(false);
  return (
    <>
      <div className={s.header}>
        <div className={s.boxMenu}>
          <div className={s.menu}>
            <Menu
              style={{ width: 150 }}
              className={classNames("headerMenuIcon")}
              mode="horizontal"
              triggerSubMenuAction="click"
              inlineIndent="10"
            >
              <SubMenu
                style={{ zIndex: "0", display: "block", margin: "0", paddingLeft: "5px" }}
                title={
                  <span>
                    <SettingOutlined />
                    <span>Settings</span>
                  </span>
                }
              >
                <Menu.Item onClick={() => setVisiblePass(true)}>
                  Change password
                </Menu.Item>

                <Menu.Item onClick={() => setVisibleArrayForm(true)}>
                  Form for all data
                </Menu.Item>

                <Menu.Item onClick={() => setVisibleLogOut(true)}>Log Out</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </div>
        <div className={s.boxLogin}></div>
      </div>
      <ChangePassword visible={visiblePass} setVisible={setVisiblePass} />
      <ArrayForm visible={visibleArrayForm} setVisible={setVisibleArrayForm} />
      <LogOut visible={visibleLogOut} setVisible={setVisibleLogOut} />
    </>
  );
};

export default Header;
