
import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); 
  const [active, setActive] = useState(location.pathname); 


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

      <Link
        to="/inventory"
        className={getLinkClasses("/inventory")}
        onClick={() => handleClick("/inventory")}
      >
        <ShoppingCart className="h-4 w-4" />
        Inventory
      </Link>

      {isInventoryOpen && (
        <div className="ml-4 mt-2 space-y-2">
          <Link
            to="/inventory/products"
            className={getLinkClasses("/inventory/products")}
          >
            Products
          </Link>
          <Link
            to="/inventory/categories"
            className={getLinkClasses("/inventory/categories")}
          >
            Categories
          </Link>
          <Link
            to="/inventory/suppliers"
            className={getLinkClasses("/inventory/suppliers")}
          >
            Suppliers
          </Link>
        </div>
      )}

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
