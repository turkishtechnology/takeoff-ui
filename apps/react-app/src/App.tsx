import './App.css';
import Components from './components/Components';
import Select from './components/Select';
import Examples from './examples/Examples';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Table from './components/Table';
import ReactHookForm from './examples/ReactHookForm';
import Home from './pages/Home';
import Input from './components/Input';
import Datepicker from './components/Datepicker';
import Radio from './components/Radio';
import Dialog from './components/Dialog';
import Dropdown from './components/Dropdown';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import Rating from './components/Rating';
import Tooltip from './components/Tooltip';
import Alert from './components/Alert';
import Accordion from './components/Accordion';
import ZodValidation from './examples/ZodValidation';
import Chart from './components/Chart';
import OrgChart from './components/OrgChart';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="components" element={<Components />} />
        <Route path="components/input" element={<Input />} />
        <Route path="components/select" element={<Select />} />
        <Route path="components/table" element={<Table />} />
        <Route path="components/datepicker" element={<Datepicker />} />
        <Route path="components/radio" element={<Radio />} />
        <Route path="components/dialog" element={<Dialog />} />
        <Route path="components/dropdown" element={<Dropdown />} />
        <Route path="components/button" element={<Button />} />
        <Route path="components/checkbox" element={<Checkbox />} />
        <Route path="components/rating" element={<Rating />} />
        <Route path="components/tooltip" element={<Tooltip />} />
        <Route path="components/alert" element={<Alert />} />
        <Route path="components/accordion" element={<Accordion />} />
        <Route path="components/chart" element={<Chart />} />
        <Route path="components/orgchart" element={<OrgChart />} />
        <Route path="examples" element={<Examples />} />
        <Route path="examples/react-hook-form" element={<ReactHookForm />} />
        <Route path="examples/zod-validation" element={<ZodValidation />} />
      </Routes>
    </Layout>
  );
}

export default App;
