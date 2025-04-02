export default {
  title: 'Form/Radio',
  component: 'tk-radio-group',
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      default: 'horizontal',
    },
    value: { control: 'text' },
  },
  tags: ['autodocs'],
};

const Template = ({ direction, value }) => {
  const radioGroup: HTMLTkRadioGroupElement = document.createElement('tk-radio-group');
  radioGroup.direction = direction;
  radioGroup.value = value;
  return radioGroup;
};

export const SingleRadio = Template.bind({});
SingleRadio.args = {
  direction: 'horizontal',
  value: '',
};

export const MultibleRadio = Template.bind({});
MultibleRadio.args = {
  direction: 'vertical',
  value: '',
};
