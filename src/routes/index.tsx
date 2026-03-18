import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login";

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default RoutesContainer;
