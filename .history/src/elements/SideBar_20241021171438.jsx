import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
  ChevronRight,
  ChevronDown,
  LayoutList,
  Menu,
  DollarSign,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [isInventoryOpen, setIsInventoryOpen] = useState(
    location.pathname.startsWith("/inventory") // Keep inventory open if already on a nested route
  );

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const toggleInventory = () => {
    setIsInventoryOpen((prev) => !prev);
  };

  const handleClick = (path) => {
    setActive(path);
  };

  const getLinkClasses = (path) => {
    const isActive =
      active === path ||
      (path === "/inventory" && active.startsWith("/inventory"));

    return `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      isActive ? "text-blue-500" : "text-muted-foreground"
    } hover:text-primary`;
  };

  const SidebarContent = () => (
    <nav className="space-y-2">
      <Link
        to="/"
        className={getLinkClasses("/")}
        onClick={() => handleClick("/")}
      >
        <Home className="h-4 w-4" />
        Home
      </Link>

      <p
        className={getLinkClasses("/inventory")}
        onClick={() => toggleInventory()}
      >
        <ShoppingCart className="h-4 w-4" />
        Inventory
        {isInventoryOpen ? (
          <ChevronDown className="ml-auto" size={15} strokeWidth={2.75} />
        ) : (
          <ChevronRight className="ml-auto" size={15} strokeWidth={2.75} />
        )}
      </p>

      {isInventoryOpen && (
        <div className="ml-8 space-y-2">
          <Link
            to="/inventory/items"
            className={getLinkClasses("/inventory/items")}
            onClick={() => handleClick("/inventory/items")}
          >
            <LayoutList size={15} strokeWidth={2.75} />
            Items
          </Link>
        </div>
      )}

      <Link
        to="/sales"
        className={getLinkClasses("/sales")}
        onClick={() => handleClick("/sales")}
      >
        <DollarSign className="h-4 w-4" />
        Sales
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
      to={"/packages"}
      className={getLinkClasses("/packages")}
      onClick={() => handleClick("/packages")}
      >
        <Package className="h-4 w-4" />
        Packages
      </Link>

      <Link
      to={"/shipments"}
      className={getLinkClasses("/shipments")}
      onClick={() => handleClick("/shipments")}
      >
        
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

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      {/* Mobile View: Sidebar as a Sheet (Drawer) */}
      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-4">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View: Static Sidebar */}
      <div className="hidden md:flex flex-1 space-y-2">
        <SidebarContent />
      </div>

      <div className="mt-auto p-4">
        <Card>
          <CardHeader className="p-2 pt-0 md:p-4">
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
            <Button size="sm" className="w-full">
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;