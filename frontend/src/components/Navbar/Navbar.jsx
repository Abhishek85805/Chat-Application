import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import {Logo} from "./Logo.jsx";

export default function NavbarComponent() {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const [activeItem, setActiveItem] = useState("Chat");

  const handleActiveItem = (item) => {
    console.log(item);
    setActiveItem(item);
  }

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Logo />
          <p className="font-bold text-inherit">Logo</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Logo />
          <p className="font-bold text-inherit">Logo</p>
        </NavbarBrand>
        <NavbarItem
        isActive={activeItem === "Chat"}
        >
          <Link 
          color="foreground" 
          to="/"
          onClick={()=>handleActiveItem("Chat")}
          >
            Chat
          </Link>
        </NavbarItem>
        <NavbarItem
        isActive={activeItem === "Search"}
        >
          <Link 
          to="/search-friend" 
          aria-current="page" 
          color="warning"
          onClick={()=>handleActiveItem("Search")}
          >
            Search
          </Link>
        </NavbarItem>
        <NavbarItem
        isActive={activeItem === "Profile"}
        >
          <Link 
          color="foreground" 
          to="/profile"
          onClick={()=>handleActiveItem("Profile")}
          >
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link to="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" to="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              to="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
