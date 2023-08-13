import { Route, Routes } from "react-router-dom";
import SignIn from "./components/screens/SignIn";
import SignUp from "./components/screens/SignUp";
import Form from "./components/screens/Form";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
}

export default App;
