import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";

import AutocompleteDemo from "./demos/AutocompleteDemo";
import CheckboxDemo from "./demos/CheckboxDemo";
import FileInputDemo from "./demos/FileInputDemo";
import ImageInputDemo from "./demos/ImageInputDemo";
import RadioGroupDemo from "./demos/RadioGroupDemo";
import RecordingDemo from "./demos/RecordingDemo";
import SelectDemo from "./demos/SelectDemo";
import SwitchDemo from "./demos/SwitchDemo";
import OnMountDemo from "./demos/table-demo/OnMountDemo";
import PaginatedDemo from "./demos/table-demo/PaginatedDemo";
import TextAreaDemo from "./demos/TextAreaDemo";
import TextInputDemo from "./demos/TextInputDemo";
import TimeAndDateInputsDemo from "./demos/TimeAndDateInputsDemo";
import TimeAndDateRangesDemo from "./demos/TimeAndDateRangesDemo";
import ToggleGroupDemo from "./demos/ToggleGroupDemo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="autocomplete" />} />
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
        <Route path="table/paginated" element={<PaginatedDemo />} />
        <Route path="table/on-mount" element={<OnMountDemo />} />
      </Route>
    </Routes>
  );
}

export default App;
