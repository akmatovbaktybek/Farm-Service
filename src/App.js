import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/screens/Login";
import MedicationForm from "./components/screens/MedicineForm";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/medForm" element={<MedicationForm />} />
    </Routes>
  );
}

export default App;
