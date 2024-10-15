import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { HomePage } from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import { CustomersPage } from "./pages/CustomersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ItemsPage from "./pages/Inventory/ItemsPage";
import { AddItem } from "./pages/Inventory/AddItem";

function App() {
  return (
    <Routes>
  <Route path="/" element={<Dashboard />}>
    <Route index element={<HomePage />} />
    <Route path="products" element={<ProductsPage />} />
    <Route path="customers" element={<CustomersPage />} />
    <Route path="analytics" element={<AnalyticsPage />} />
    {/* Add an element for the inventory path */}
    <Route path="inventory" element={<InventoryPage />}>
      {/* Add an element for the items path */}
      <Route path="items" element={<ItemsPage />}>
        <Route path="add" element={<AddItem />} />
      </Route>
    </Route>
  </Route>
</Routes>

  );
}

export default App;
