import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { HomePage } from "./pages/HomePage";
import { CustomersPage } from "./pages/customer/CustomersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ItemsPage from "./pages/Inventory/ItemsPage";
import { AddItem } from "./pages/Inventory/AddItem";
import { ItemDetails } from "./pages/Inventory/ItemDetails";
import SalesPage from "./pages/SalesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<HomePage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="inventory">
          <Route path="items" element={<ItemsPage />}>
            <Route path="add" element={<AddItem />} />
            <Route path=":itemId" element={<ItemDetails />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
