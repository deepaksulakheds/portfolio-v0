import { Routes, Route } from "react-router-dom";

// Pages
import Layout from "./Pages/MainLayout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Settings from "./Pages/Settings/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
