import { Badge, Home, ShoppingCart } from "lucide-react";
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
      <Link to="/" className={getLinkClasses("/")} onClick={() => handleClick("/")}>
        <Home className="h-4 w-4" />
        Home
      </Link>

      <Link to="/orders" className={getLinkClasses("/orders")} onClick={() => handleClick("/orders")}>
        <ShoppingCart className="h-4 w-4" />
        Orders
        {/* Badge: Keep the original styling intact */}
        <div className="ml-auto">
          <Badge className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
            6
          </Badge>
        </div>
      </Link>

      <Link to="/products" className={getLinkClasses("/products")} onClick={() => handleClick("/products")}>
        <Package className="h-4 w-4" />
        Products
      </Link>

      <Link to="/customers" className={getLinkClasses("/customers")} onClick={() => handleClick("/customers")}>
        <Users className="h-4 w-4" />
        Customers
      </Link>

      <Link to="/analytics" className={getLinkClasses("/analytics")} onClick={() => handleClick("/analytics")}>
        <LineChart className="h-4 w-4" />
        Analytics
      </Link>
    </nav>
  );
};

export default Sidebar;
