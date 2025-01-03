import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PlanDinamico } from "../pages/PlanDinamico/PlanDinamico"
import { PlanEstatico } from "../pages/PlanEstatico/PlanEstatico"
import { Home } from "../pages/Home/Home"
import { NotFound } from "../pages/NotFound/NotFound";
import { Dashboard } from "../pages/Dashboard/Dashboard";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan-estatico" element={<PlanEstatico />} />
        <Route path="/plan-dinamico" element={<PlanDinamico />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export { Router };