import {
  Badge,
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Track the current route
  const [active, setActive] = useState(location.pathname); // Initialize with the current route

  const handleClick = (path) => {
    setActive(path); // Update the active state when a link is clicked
  };

  const getLinkClasses = (path) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      active === path ? "text-blue-500" : "text-muted-foreground"
    } hover:text-primary`;

 