import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

import CheckboxDemo from "./pages/CheckboxDemo";
import SelectDemo from "./pages/SelectDemo";
import SwitchDemo from "./pages/SwitchDemo";
import TextAreaDemo from "./pages/TextAreaDemo";
import TextInputDemo from "./pages/TextInputDemo";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="select" element={<SelectDemo />} />
                <Route path="text-area" element={<TextAreaDemo />} />
                <Route path="text-input" element={<TextInputDemo />} />
                <Route path="checkbox" element={<CheckboxDemo />} />
                <Route path="switch" element={<SwitchDemo />} />
            </Route>
        </Routes>
    );
}

export default App;
