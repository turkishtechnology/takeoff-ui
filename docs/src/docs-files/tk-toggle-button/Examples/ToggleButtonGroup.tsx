// @ts-nocheck
import { useState, useEffect } from 'react';
import {
  TkToggleButtonGroup,
  TkToggleButton,
  TkRadioGroup,
  TkRadio,
  TkCheckbox,
} from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const ToggleButtonGroupVariants = () => {
  const directionOptions = ['horizontal', 'vertical'];
  const groupTypeOptions = ['basic', 'divided', 'light'];
  const buttonTypeOptions = [
    'filled',
    'outlined',
    'text',
    'raised',
    'filled-light',
  ];
  const buttonVariantOptions = ['primary', 'neutral'];

  const [groupType, setGroupType] = useState<'basic' | 'divided' | 'light'>(
    'basic',
  );
  const [buttonType, setButtonType] = useState<
    'filled' | 'outlined' | 'text' | 'raised' | 'filled-light'
  >('outlined');
  const [buttonVariant, setButtonVariant] = useState<'primary' | 'neutral'>(
    'neutral',
  );
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );
  const [rounded, setRounded] = useState(false);
  const [value, setValue] = useState('1');
  const [singleButtonValue, setSingleButtonValue] = useState(false);
  const [reactCode, setReactCode] = useState('');
  const [vueCode, setVueCode] = useState('');
  const [angularCode, setAngularCode] = useState('');
  const [singleButtonCode, setSingleButtonCode] = useState('');

  const options = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
  ];

  const generateCode = () => {
    const attrs = [
      `value="${value}"`,
      `type="${groupType}"`,
      `direction="${direction}"`,
      rounded ? 'rounded' : '',
      `onTkChange={(e) => setValue(e.detail)}`,
    ]
      .filter(Boolean)
      .join('\n  ');

    const buttonCode = options
      .map(
        (opt) =>
          `  <TkToggleButton type="${buttonType}" variant="${buttonVariant}" value="${opt.value}">${opt.label}</TkToggleButton>`,
      )
      .join('\n');

    const react = `<TkToggleButtonGroup
  ${attrs}
>
${buttonCode}
</TkToggleButtonGroup>`;

    const vue = `<TkToggleButtonGroup
  ${attrs.replace('onTkChange={(e) => setValue(e.detail)}', '@tk-change="onChange"')}
>
${buttonCode}
</TkToggleButtonGroup>`;

    const angular = `<tk-toggle-button-group
  ${attrs.replace('onTkChange={(e) => setValue(e.detail)}', '(tkChange)="onChange($event)"')}
>
${buttonCode.replace(/TkToggleButton/g, 'tk-toggle-button')}
</tk-toggle-button-group>`;

    setReactCode(react);
    setVueCode(vue);
    setAngularCode(angular);

    // Generate code for single toggle button
    const singleButtonAttrs = [
      `value={${singleButtonValue}}`,
      `type="${buttonType}"`,
      `variant="${buttonVariant}"`,
      rounded ? 'rounded' : '',
      `size="large"`,
      `icon={{ name: 'bolt', fill: true }}`,
      `iconPosition="right"`,
      `onTkChange={(e) => setSingleButtonValue(e.detail)}`,
    ]
      .filter(Boolean)
      .join('\n  ');

    const singleButtonReact = `<TkToggleButton
  ${singleButtonAttrs}
>
  Toggle Me
</TkToggleButton>`;

    setSingleButtonCode(singleButtonReact);
  };

  useEffect(() => {
    generateCode();
  }, [
    groupType,
    buttonType,
    buttonVariant,
    direction,
    rounded,
    value,
    singleButtonValue,
  ]);

  const demo = (
    <div className="flex flex-col gap-8 items-start w-full">
      {/* Group Toggle Buttons */}
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-lg font-medium">Toggle Button Group</h3>
        <div className="flex flex-wrap gap-4">
          <TkRadioGroup
            label="Group Type"
            value={groupType}
            onTkChange={(e) => setGroupType(e.detail)}
          >
            {groupTypeOptions.map((t) => (
              <TkRadio
                key={t}
                label={t.charAt(0).toUpperCase() + t.slice(1)}
                value={t}
              />
            ))}
          </TkRadioGroup>

          <TkRadioGroup
            label="Button Type"
            value={buttonType}
            onTkChange={(e) => setButtonType(e.detail)}
          >
            {buttonTypeOptions.map((t) => (
              <TkRadio
                key={t}
                label={t
                  .replace('-', ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
                value={t}
              />
            ))}
          </TkRadioGroup>

          <TkRadioGroup
            label="Variant"
            value={buttonVariant}
            onTkChange={(e) => setButtonVariant(e.detail)}
          >
            {buttonVariantOptions.map((v) => (
              <TkRadio
                key={v}
                label={v.charAt(0).toUpperCase() + v.slice(1)}
                value={v}
              />
            ))}
          </TkRadioGroup>

          <TkRadioGroup
            label="Direction"
            value={direction}
            onTkChange={(e) => setDirection(e.detail)}
          >
            {directionOptions.map((d) => (
              <TkRadio
                key={d}
                label={d.charAt(0).toUpperCase() + d.slice(1)}
                value={d}
              />
            ))}
          </TkRadioGroup>

          <TkCheckbox
            label="Rounded"
            value={rounded}
            onTkChange={() => setRounded((prev) => !prev)}
          />
        </div>

        <div className="w-full">
          <TkToggleButtonGroup
            value={value}
            type={groupType}
            direction={direction}
            rounded={rounded}
            onTkChange={(e) => setValue(e.detail)}
          >
            {options.map((opt) => (
              <TkToggleButton
                key={opt.value}
                value={opt.value}
                type={buttonType}
                variant={buttonVariant}
                icon={{ name: 'bolt', fill: true }}
                iconPosition="right"
                size="large"
                label={opt.label}
              />
            ))}
          </TkToggleButtonGroup>
        </div>

        <div className="text-sm text-gray-600 mt-2">
          Selected: <strong>{value}</strong>
        </div>
      </div>
    </div>
  );

  return (
    <FeatureDemo
      demo={demo}
      reactCode={reactCode}
      vueCode={vueCode}
      angularCode={angularCode}
    />
  );
};

export default ToggleButtonGroupVariants;
