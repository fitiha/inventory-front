import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/dash" element={<Dashboard/>}/>
    </Routes>
    </>
  );
};

export default App;
