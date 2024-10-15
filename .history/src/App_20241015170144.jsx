import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { HomePage } from "./pages/HomePage";
import { InventoryPage } from "./pages/InventoryPage";
import ProductsPage from "./pages/ProductsPage";
import { CustomersPage } from "./pages/CustomersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ItemsPage from "./pages/Inventory/ItemsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="start" />
      </Route>
      <Route path="inventory" element={<InventoryPage />} >
        <Route path="items"  element={<ItemsPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
