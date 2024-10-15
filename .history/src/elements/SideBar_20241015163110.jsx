import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";
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

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link
        to="/"
        className={getLinkClasses("/")}
        onClick={() => handleClick("/")}
      >
        <Home className="h-4 w-4" />
        Home
      </Link>

      {/* <Link
        to="/inventory"
        className={getLinkClasses("/inventory")}
        onClick={() => handleClick("/inventory")}
      >
        <ShoppingCart className="h-4 w-4" />
        Inventory
      </Link> */}

      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link
        to="/products"
        className={getLinkClasses("/products")}
        onClick={() => handleClick("/products")}
      >
        <Package className="h-4 w-4" />
        Products
      </Link>

      <Link
        to="/customers"
        className={getLinkClasses("/customers")}
        onClick={() => handleClick("/customers")}
      >
        <Users className="h-4 w-4" />
        Customers
      </Link>

      <Link
        to="/analytics"
        className={getLinkClasses("/analytics")}
        onClick={() => handleClick("/analytics")}
      >
        <LineChart className="h-4 w-4" />
        Analytics
      </Link>
    </nav>
  );
};

export default Sidebar;
