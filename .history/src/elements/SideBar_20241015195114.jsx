import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
  ChevronRight,
  ChevronDown,
  LayoutList,
  Badge,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  const toggleInventory = () => {
    setIsInventoryOpen((prev) => !prev);
  };

  const handleClick = (path) => {
    setActive(path); // Update the active state when a link is clicked
  };

  const getLinkClasses = (path) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      active === path ? "text-blue-500" : "text-muted-foreground"
    } hover:text-primary`;

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex-1">
        <nav className="grid items-start font-medium lg:px-4">
          <Link
            to="/"
            className={getLinkClasses("/")}
            onClick={() => handleClick("/")}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <p className={getLinkClasses("/")} onClick={() => toggleInventory()}>
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
              >
                <LayoutList size={15} strokeWidth={2.75} />
                Items
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

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          </header>
          </div>
    </div>
  );
};

export default Sidebar;
