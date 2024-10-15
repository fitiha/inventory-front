import { Badge, Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Assuming you're using react-router-dom

const Sidebar = () => {
  const location = useLocation(); 
  const [active, setActive] = useState(location.pathname); 

  const handleClick = (path) => {
    setActive(path); 
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
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          6
        </Badge>
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
