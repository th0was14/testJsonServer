import React from "react";
import ReactDOM, { render } from "react-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button
} from "reactstrap";
import { Route, BrowserRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Home } from "../page/Home";
import { Main } from "../page/Main";
import { NavRoute } from "./typings";
import { PlayerClash } from "../page/PlayerClash";

export class Layout extends React.Component {
  public state = {
    isOpen: false
  };
  private navLink: NavRoute[] = [
    { id: "home", label: "Home", path: "/", component: Home, exact: true },
    { id: "main", label: "Main", path: "/main", component: Main },
    {
      id: "player",
      label: "Player Clash",
      path: "/playerClash/:playerId",
      component: PlayerClash
    }
  ];
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  public toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  private displayLinks = (navRoutes: NavRoute[]) => {
    return navRoutes.map(({ id, label, path, component, exact }) => (
      <NavItem key={id}>
        <LinkContainer to={path}>
          <Button color="link" onClick={this.toggle}>
            {label}
          </Button>
        </LinkContainer>
      </NavItem>
    ));
  };

  private configRoutes = (navRoutes: NavRoute[]) => {
    return navRoutes.map(({ id, path, component, exact }) => (
      <Route key={id} exact={exact} path={path} component={component} />
    ));
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Test RoyalApi</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.displayLinks(this.navLink)}
              </Nav>
            </Collapse>
          </Navbar>
          <hr />
          <ToastContainer />
          {this.configRoutes(this.navLink)}
        </div>
      </BrowserRouter>
    );
  }
}