import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { HomePage } from "./pages/HomePage";
import CustomersPage from "./pages/customer/CustomersPage"; // Correct import statement
import AnalyticsPage from "./pages/AnalyticsPage";
import ItemsPage from "./pages/Inventory/ItemsPage";
import { AddItem } from "./pages/Inventory/AddItem";
import { ItemDetails } from "./pages/Inventory/ItemDetails";
import SalesPage from "./pages/Sales/SalesPage";
import { AddCustomer } from "./pages/customer/AddCustomer"; // Import AddCustomer component
import { CustomerDetails } from "./pages/customer/CustomerDetails";
import AddSalesOrder from "./pages/Sales/AddSalesOrder";
import { SalesDetail } from "./pages/Sales/SalesDetail";
import PackagesPage from "./pages/Packages/PackagesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<HomePage />} />
        
        
        <Route path="customers" element={<CustomersPage />}>
          <Route path="add" element={<AddCustomer />} />
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route>

        <Route path="analytics" element={<AnalyticsPage />} />

        <Route path="inventory">
          <Route path="items" element={<ItemsPage />}>
            <Route path="add" element={<AddItem />} />
            <Route path=":itemId" element={<ItemDetails />} />
          </Route>
        </Route>

        <Route path="sales" element={<SalesPage />} >
          <Route path="add" element={<AddSalesOrder />} />
          <Route path=":salesOrderId" element={<SalesDetail />} />
        </Route>

        <Route path="packages" element={<PackagesPage/>} >
          <Route path="add" element={<AddItem />} />
          <Route path=":packageId" element={<PackagesPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
