import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Components from '../components/Components.vue';

// Component demo pages
import Accordion from '../components/demos/Accordion.vue';
import Alert from '../components/demos/Alert.vue';
import Avatar from '../components/demos/Avatar.vue';
import Badge from '../components/demos/Badge.vue';
import Breadcrumb from '../components/demos/Breadcrumb.vue';
import Button from '../components/demos/Button.vue';
import Card from '../components/demos/Card.vue';
import Chart from '../components/demos/Chart.vue';
import Checkbox from '../components/demos/Checkbox.vue';
import Chips from '../components/demos/Chips.vue';
import CurrencyInput from '../components/demos/CurrencyInput.vue';
import Datepicker from '../components/demos/Datepicker.vue';
import Dialog from '../components/demos/Dialog.vue';
import Divider from '../components/demos/Divider.vue';
import Drawer from '../components/demos/Drawer.vue';
import Dropdown from '../components/demos/Dropdown.vue';
import Editor from '../components/demos/Editor.vue';
import Icon from '../components/demos/Icon.vue';
import Input from '../components/demos/Input.vue';
import OrgChart from '../components/demos/OrgChart.vue';
import Pagination from '../components/demos/Pagination.vue';
import PhoneInput from '../components/demos/PhoneInput.vue';
import Radio from '../components/demos/Radio.vue';
import Rating from '../components/demos/Rating.vue';
import Select from '../components/demos/Select.vue';
import Slider from '../components/demos/Slider.vue';
import Spinner from '../components/demos/Spinner.vue';
import Stepper from '../components/demos/Stepper.vue';
import Table from '../components/demos/Table.vue';
import Tabs from '../components/demos/Tabs.vue';
import Textarea from '../components/demos/Textarea.vue';
import Timeline from '../components/demos/Timeline.vue';
import Toggle from '../components/demos/Toggle.vue';
import ToggleButton from '../components/demos/ToggleButton.vue';
import Tooltip from '../components/demos/Tooltip.vue';
import TreeView from '../components/demos/TreeView.vue';
import Upload from '../components/demos/Upload.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/components',
    name: 'Components',
    component: Components,
  },
  // Component demo routes
  {
    path: '/components/accordion',
    name: 'Accordion',
    component: Accordion,
  },
  {
    path: '/components/alert',
    name: 'Alert',
    component: Alert,
  },
  {
    path: '/components/avatar',
    name: 'Avatar',
    component: Avatar,
  },
  {
    path: '/components/badge',
    name: 'Badge',
    component: Badge,
  },
  {
    path: '/components/breadcrumb',
    name: 'Breadcrumb',
    component: Breadcrumb,
  },
  {
    path: '/components/button',
    name: 'Button',
    component: Button,
  },
  {
    path: '/components/card',
    name: 'Card',
    component: Card,
  },
  {
    path: '/components/chart',
    name: 'Chart',
    component: Chart,
  },
  {
    path: '/components/checkbox',
    name: 'Checkbox',
    component: Checkbox,
  },
  {
    path: '/components/chips',
    name: 'Chips',
    component: Chips,
  },
  {
    path: '/components/currency-input',
    name: 'CurrencyInput',
    component: CurrencyInput,
  },
  {
    path: '/components/datepicker',
    name: 'Datepicker',
    component: Datepicker,
  },
  {
    path: '/components/dialog',
    name: 'Dialog',
    component: Dialog,
  },
  {
    path: '/components/divider',
    name: 'Divider',
    component: Divider,
  },
  {
    path: '/components/drawer',
    name: 'Drawer',
    component: Drawer,
  },
  {
    path: '/components/dropdown',
    name: 'Dropdown',
    component: Dropdown,
  },
  {
    path: '/components/editor',
    name: 'Editor',
    component: Editor,
  },
  {
    path: '/components/icon',
    name: 'Icon',
    component: Icon,
  },
  {
    path: '/components/input',
    name: 'Input',
    component: Input,
  },
  {
    path: '/components/orgchart',
    name: 'OrgChart',
    component: OrgChart,
  },
  {
    path: '/components/pagination',
    name: 'Pagination',
    component: Pagination,
  },
  {
    path: '/components/phone-input',
    name: 'PhoneInput',
    component: PhoneInput,
  },
  {
    path: '/components/radio',
    name: 'Radio',
    component: Radio,
  },
  {
    path: '/components/rating',
    name: 'Rating',
    component: Rating,
  },
  {
    path: '/components/select',
    name: 'Select',
    component: Select,
  },
  {
    path: '/components/slider',
    name: 'Slider',
    component: Slider,
  },
  {
    path: '/components/spinner',
    name: 'Spinner',
    component: Spinner,
  },
  {
    path: '/components/stepper',
    name: 'Stepper',
    component: Stepper,
  },
  {
    path: '/components/table',
    name: 'Table',
    component: Table,
  },
  {
    path: '/components/tabs',
    name: 'Tabs',
    component: Tabs,
  },
  {
    path: '/components/textarea',
    name: 'Textarea',
    component: Textarea,
  },
  {
    path: '/components/timeline',
    name: 'Timeline',
    component: Timeline,
  },
  {
    path: '/components/toggle',
    name: 'Toggle',
    component: Toggle,
  },
  {
    path: '/components/toggle-button',
    name: 'ToggleButton',
    component: ToggleButton,
  },
  {
    path: '/components/tooltip',
    name: 'Tooltip',
    component: Tooltip,
  },
  {
    path: '/components/tree-view',
    name: 'TreeView',
    component: TreeView,
  },
  {
    path: '/components/upload',
    name: 'Upload',
    component: Upload,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
