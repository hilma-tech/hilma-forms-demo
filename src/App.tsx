import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import AutocompleteDemo from "./pages/AutocompleteDemo";

import CheckboxDemo from "./pages/CheckboxDemo";
import FileInputDemo from "./pages/FileInputDemo";
import ImageInputDemo from "./pages/ImageInputDemo";
import RadioGroupDemo from "./pages/RadioGroupDemo";
import RecordingDemo from "./pages/RecordingDemo";
import SelectDemo from "./pages/SelectDemo";
import SwitchDemo from "./pages/SwitchDemo";
import TextAreaDemo from "./pages/TextAreaDemo";
import TextInputDemo from "./pages/TextInputDemo";
import TimeAndDateInputsDemo from "./pages/TimeAndDateInputsDemo";
import TimeAndDateRangesDemo from "./pages/TimeAndDateRangesDemo";
import ToggleGroupDemo from "./pages/ToggleGroupDemo";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="autocomplete" element={<AutocompleteDemo />} />
                <Route path="recording" element={<RecordingDemo />} />
                <Route path="image" element={<ImageInputDemo />} />
                <Route path="file" element={<FileInputDemo />} />
                <Route path="time/range" element={<TimeAndDateRangesDemo />} />
                <Route path="date/range" element={<TimeAndDateRangesDemo />} />
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
