import {
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
  ChevronRight,
  ChevronDown,
  LayoutList,
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

  return (<>
  
    <div>
      
    </div>
    <div className="mt-auto p-4">
    <Card>
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>Upgrade to Pro</CardTitle>
        <CardDescription>
          Unlock all features and get unlimited access to our support
          team.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Button size="sm" className="w-full">
          Upgrade
        </Button>
      </CardContent>
    </Card>
  </div>
  </>
  );
};

export default Sidebar;
