import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { HomePage } from "./pages/HomePage";
import { InventoryPage } from "./pages/InventoryPage";
import ProductsPage from "./pages/ProductsPage";
import { CustomersPage } from "./pages/CustomersPage";
import AnalyticsPage from "./pages/AnalyticsPage";

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
    </Routes>
  );
}

export default App;
