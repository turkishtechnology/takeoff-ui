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

import ToggleButton from './components/ToggleButton';
import Avatar from './components/Avatar';
import Breadcrumb from './components/Breadcrumb';
import Badge from './components/Badge';
import Card from './components/Card';
import Chart from './components/Chart';
import Chips from './components/Chips';
import Divider from './components/Divider';
import Textarea from './components/Textarea';
import Icon from './components/Icon';
import Spinner from './components/Spinner';
import Timeline from './components/Timeline';
import Drawer from './components/Drawer';
import Editor from './components/Editor';
import Pagination from './components/Pagination';
import Stepper from './components/Stepper';
import Toggle from './components/Toggle';
import OrgChart from './components/OrgChart';
import Tabs from './components/Tabs';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="components" element={<Components />} />
        <Route path="components/stepper" element={<Stepper />} />
        <Route path="components/chart" element={<Chart />} />
        <Route path="components/avatar" element={<Avatar />} />
        <Route path="components/toggle" element={<Toggle />} />
        <Route path="components/input" element={<Input />} />
        <Route path="components/breadcrumb" element={<Breadcrumb />} />
        <Route path="components/select" element={<Select />} />
        <Route path="components/chips" element={<Chips />} />
        <Route path="components/table" element={<Table />} />
        <Route path="components/pagination" element={<Pagination />} />
        <Route path="components/badge" element={<Badge />} />
        <Route path="components/card" element={<Card />} />
        <Route path="components/datepicker" element={<Datepicker />} />
        <Route path="components/radio" element={<Radio />} />
        <Route path="components/dialog" element={<Dialog />} />
        <Route path="components/dropdown" element={<Dropdown />} />
        <Route path="components/editor" element={<Editor />} />
        <Route path="components/button" element={<Button />} />
        <Route path="components/divider" element={<Divider />} />
        <Route path="components/checkbox" element={<Checkbox />} />
        <Route path="components/rating" element={<Rating />} />
        <Route path="components/tooltip" element={<Tooltip />} />
        <Route path="components/alert" element={<Alert />} />
        <Route path="components/timeline" element={<Timeline />} />
        <Route path="components/icon" element={<Icon />} />
        <Route path="components/spinner" element={<Spinner />} />
        <Route path="components/accordion" element={<Accordion />} />
        <Route path="components/drawer" element={<Drawer />} />
        <Route path="components/textarea" element={<Textarea />} />
        <Route path="components/chart" element={<Chart />} />
        <Route path="components/orgchart" element={<OrgChart />} />
        <Route path="examples" element={<Examples />} />
        <Route path="examples/react-hook-form" element={<ReactHookForm />} />
        <Route path="examples/zod-validation" element={<ZodValidation />} />
        <Route path="components/toggle-button" element={<ToggleButton />} />
        <Route path="components/tabs" element={<Tabs />} />
      </Routes>
    </Layout>
  );
}

export default App;
