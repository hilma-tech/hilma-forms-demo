import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

import CheckboxDemo from "./pages/CheckboxDemo";
import RadioGroupDemo from "./pages/RadioGroupDemo";
import SelectDemo from "./pages/SelectDemo";
import SwitchDemo from "./pages/SwitchDemo";
import TextAreaDemo from "./pages/TextAreaDemo";
import TextInputDemo from "./pages/TextInputDemo";
import TimeAndDateInputsDemo from "./pages/TimeAndDateInputsDemo";
import ToggleGroupDemo from "./pages/ToggleGroupDemo";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="time/input" element={<TimeAndDateInputsDemo />} />
                <Route path="date/input" element={<TimeAndDateInputsDemo />} />
                <Route path="toggle-group" element={<ToggleGroupDemo />} />
                <Route path="radio-group" element={<RadioGroupDemo />} />
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
