import React from "react";
import "./sidemenu.scoped.css";

function DrawerMenu() {
  return (
    <aside className="app-sidebar sidebar-scroll ps ps--active-y">
      <div className="main-sidebar-header">
        <a className=" desktop-logo logo-dark" href="#">
          <img
            src={require("../kryptondesk.png")}
            className="main-logo"
            alt="logo"
          />
        </a>
      </div>
      <div className="main-sidebar-body circle-animation ">
        <ul className="side-menu circle">
          <li>
            <h3 className="">Dashboard</h3>
          </li>
          <li className="slide">
            <a className="side-menu__item" href="index">
              <i className="side-menu__icon ti-desktop" />
              <span className="side-menu__label">Dashboard</span>
            </a>
          </li>
          <li>
            <h3>Users Activities</h3>
          </li>
          <li className="slide">
            <a className="side-menu__item" data-toggle="slide" href="#">
              <i className="side-menu__icon fa fa-shopping-cart" />
              <span className="side-menu__label">Account</span>
              <i className="angle fe fe-chevron-down" />
            </a>
          </li>
          <li className="slide">
            <a className="side-menu__item" href="accounts">
              <i className="far fa-arrow-alt-circle-right"> </i>
              <span className="side-menu__label">Send</span>
            </a>
          </li>
          <li className="slide">
            <a className="side-menu__item" href="accounts">
              <i className="far fa-arrow-alt-circle-right" />
              <span className="side-menu__label">Receive</span>
            </a>
          </li>
          <li>
            <h3>Preferences</h3>
          </li>
          <li className="slide">
            <a className="side-menu__item" data-toggle="slide" href="#">
              <i className="side-menu__icon ti-money" />
              <span className="side-menu__label">Supported Currency (USD)</span>
            </a>
          </li>
          <li>
            <h3>Settings</h3>
          </li>
          <li className="slide">
            <a className="side-menu__item" data-toggle="slide" href="#">
              <i className="side-menu__icon ti-user" />
              <span className="side-menu__label">PROFILE</span>
              <i className="angle fe fe-chevron-down" />
            </a>
            <ul className="slide-menu">
              <li>
                <a className="slide-item" href="profile">
                  My Profile
                </a>
              </li>
            </ul>
            <ul className="slide-menu">
              <li>
                <a className="slide-item" href="profile?#kyc">
                  Kyc
                </a>
              </li>
            </ul>
          </li>
          <li className="slide">
            <a className="side-menu__item" data-toggle="slide" href="#">
              <span className="side-menu__label">anthony erics </span>
            </a>
          </li>
          <li className="slide">
            <a className="side-menu__item" data-toggle="slide" href="#">
              <span className="side-menu__label">
                anthonyerics84@gmail.com (Verified)
              </span>
            </a>
          </li>
          <li>
            <h3>Security</h3>
          </li>
          <li className="slide is-expanded">
            <a className="side-menu__item" data-toggle="slide" href="#">
              <i className="side-menu__icon ti-settings" />
              <span className="side-menu__label">Security</span>
              <i className="angle fe fe-chevron-down" />
            </a>
            <ul className="slide-menu">
              <li>
                <a className="slide-item" href="profile?#password">
                  Change Password
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default DrawerMenu;
