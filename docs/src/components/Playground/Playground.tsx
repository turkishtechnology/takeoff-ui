import { useState, useMemo } from 'react';
import type { ControlConfig, PlaygroundProps } from './Playground.types';
import './playground.model.css';
import { createConfigFromJson } from './utils/createConfig';
import {
  TkButton,
  TkInput,
  TkSelect,
  TkCheckbox,
  TkTooltip,
} from '@takeoff-ui/react';

export default function Playground({
  configs,
  componentMap = {},
  defaultConfigIndex = 0,
}: PlaygroundProps) {
  const processedConfigs = useMemo(() => {
    return configs.map((config) => {
      if (config.componentName) {
        const Component = componentMap[config.componentName];
        if (!Component) {
          throw new Error(
            `Component ${config.componentName} not found in componentMap`,
          );
        }

        return createConfigFromJson(config, Component);
      }

      throw new Error('Config must have either componentName property');
    });
  }, [configs, componentMap]);

  const [showModal, setShowModal] = useState(false);

  function getDefaultPropValues(config: (typeof processedConfigs)[number]) {
    return config.props.reduce(
      (acc, prop) => {
        acc[prop.key] = prop.defaultValue;
        return acc;
      },
      {} as Record<string, string | number | boolean>,
    );
  }

  const [propValues, setPropValues] = useState<
    Record<string, string | number | boolean>
  >(() => getDefaultPropValues(processedConfigs[defaultConfigIndex]));

  const currentConfig = processedConfigs[defaultConfigIndex];

  const handlePropChange = (key: string, value: string | number | boolean) => {
    setPropValues((prev) => ({ ...prev, [key]: value }));
  };

  const resetPlayground = () => {
    setPropValues(() =>
      getDefaultPropValues(processedConfigs[defaultConfigIndex]),
    );
  };

  const renderControl = (control: ControlConfig) => {
    const value = propValues[control.key];

    switch (control.type) {
      case 'text':
        return (
          <TkInput
            value={String(value || '')}
            onTkChange={(e) => {
              handlePropChange(
                control.key,
                (e.target as HTMLInputElement).value,
              );
            }}
          />
        );
      case 'select':
        return (
          <>
            <TkSelect
              value={
                control.options?.find(
                  (opt) => String(opt.value) === String(value),
                ) || ''
              }
              onTkChange={(e) => {
                const selectedOption = control.options?.find(
                  (opt) => String(opt.value) === e.detail.value,
                );
                handlePropChange(control.key, selectedOption?.value || '');
              }}
              options={control.options}
            />
          </>
        );
      case 'checkbox':
        return control.tooltip ? (
          <TkTooltip
            description={
              typeof control.tooltip === 'string' ? control.tooltip : null
            }
          >
            <TkCheckbox
              value={Boolean(value)}
              onTkChange={(e) =>
                handlePropChange(
                  control.key,
                  (e.target as HTMLInputElement).value,
                )
              }
              label={control.label}
              slot="trigger"
            />
          </TkTooltip>
        ) : (
          <TkCheckbox
            value={Boolean(value)}
            onTkChange={(e) =>
              handlePropChange(
                control.key,
                (e.target as HTMLInputElement).value,
              )
            }
            label={control.label}
          />
        );

      default:
        return null;
    }
  };

  const renderPreviewComponent = () => {
    const Component = currentConfig.component;

    // Filter out undefined/null props
    const cleanProps = Object.fromEntries(
      Object.entries(propValues).filter(
        ([_, value]) =>
          value !== undefined &&
          value !== null &&
          (typeof value !== 'string' || value !== ''),
      ),
    );

    return <Component {...cleanProps} />;
  };

  const generateCodeString = () => {
    const props = Object.entries(propValues)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== '',
      )
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          return value ? key : '';
        } else {
          return `${key}={${JSON.stringify(value)}}`;
        }
      })
      .filter(Boolean)
      .join('\n');

    const propsString = props ? ` ${props}` : '';

    return `<${currentConfig.name}${propsString} />`;
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPropValues(() =>
      getDefaultPropValues(processedConfigs[defaultConfigIndex]),
    );
  };

  function renderControls() {
    return (
      <div className="playground-section">
        <h3 className="playground-section-title flex justify-between items-center">
          Controls
          <TkButton
            variant="secondary"
            size="small"
            type="outlined"
            mode="button"
            iconPosition="left"
            icon="refresh"
            onClick={resetPlayground}
          />
        </h3>

        <div className="playground-controls-grid">
          {currentConfig.props.map((control) => (
            <div key={control.key}>
              {control.type !== 'checkbox' && (
                <label className="playground-label">{control.label}:</label>
              )}
              {renderControl(control)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderPreview() {
    return (
      <div className="playground-preview">
        <h3 className="playground-section-title">Preview</h3>
        <div className="playground-component-wrapper">
          {renderPreviewComponent()}
        </div>
      </div>
    );
  }

  function renderCodePreview() {
    return (
      <div className="playground-code">
        <h3 className="playground-section-title">Generated Code</h3>
        <pre className="playground-code-block">
          <code>{generateCodeString()}</code>
        </pre>
      </div>
    );
  }

  function renderPlaygroundModal() {
    return (
      <div className="playground-container">
        <div className="playground-container-left-side">
          {renderPreview()}

          {renderCodePreview()}
        </div>
        <div className="playground-container-right-side">
          {renderControls()}
        </div>
      </div>
    );
  }

  return <>{renderPlaygroundModal()}</>;
}
