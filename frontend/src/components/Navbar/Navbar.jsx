import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import {Logo} from "./Logo.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'

export default function NavbarComponent() {
  const navigate = useNavigate();
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

  const handleLogout = async() => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/user/logout', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      toast.success(res.data.message);
      navigate('/login');
    } catch (error) {
      console.log("Something went wrong while logging out user", error);
    }
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
        isActive={activeItem === "Requests"}
        >
          <Link 
          color="foreground" 
          to="/friend-requests"
          onClick={()=>handleActiveItem("Requests")}
          >
            Requests
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
        <NavbarItem>
          <button 
          className="bg-black text-white pt-2 pb-2 pl-4 pr-4 rounded-md hover:bg-gray-800"
          onClick={handleLogout}>
            Logout
          </button>
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
