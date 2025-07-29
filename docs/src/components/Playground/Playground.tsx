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
  TkTabs,
  TkTabsItem,
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

  const generateCodeString = (framework: 'react' | 'vue' | 'angular') => {
    const props = Object.entries(propValues)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== '',
      )
      .map(([key, value]) => {
        if (framework === 'vue') {
          if (typeof value === 'string') {
            return (
              <div key={key}>
                {'  '}
                <span className="syntax-attribute">{key}</span>
                <span className="syntax-operator">=</span>
                <span className="syntax-attr-equals">"</span>
                <span className="syntax-value">{value}</span>
                <span className="syntax-attr-equals">"</span>
              </div>
            );
          } else if (typeof value === 'boolean') {
            return value ? (
              <div key={key}>
                {'  '}
                <span className="syntax-operator">:</span>
                <span className="syntax-attribute">{key}</span>
                <span className="syntax-operator">.</span>
                <span className="syntax-attribute">prop</span>
                <span className="syntax-operator">=</span>
                <span className="syntax-attr-equals">"</span>
                <span className="syntax-boolean">true</span>
                <span className="syntax-attr-equals">"</span>
              </div>
            ) : null;
          } else {
            return (
              <div key={key}>
                {'  '}
                <span className="syntax-operator">:</span>
                <span className="syntax-attribute">{key}</span>
                <span className="syntax-operator">=</span>
                <span className="syntax-attr-equals">"</span>
                <span className="syntax-value">{value}</span>
                <span className="syntax-attr-equals">"</span>
              </div>
            );
          }
        } else if (framework === 'angular') {
          if (typeof value === 'string') {
            return (
              <div key={key}>
                {'  '}
                <span className="syntax-attribute">{key}</span>
                <span className="syntax-operator">=</span>
                <span className="syntax-attr-equals">"</span>
                <span className="syntax-value">{value}</span>
                <span className="syntax-attr-equals">"</span>
              </div>
            );
          } else if (typeof value === 'boolean') {
            return value ? (
              <div key={key}>
                {'  '}
                <span className="syntax-bracket">[</span>
                <span className="syntax-attribute">{key}</span>
                <span className="syntax-bracket">]</span>
                <span className="syntax-operator">=</span>
                <span className="syntax-attr-equals">"</span>
                <span className="syntax-boolean">true</span>
                <span className="syntax-attr-equals">"</span>
              </div>
            ) : null;
          } else {
            return (
              <div key={key}>
                {'  '}
                <span className="syntax-bracket">[</span>
                <span className="syntax-attribute">{key}</span>
                <span className="syntax-bracket">]</span>
                <span className="syntax-operator">=</span>
                <span className="syntax-attr-equals">"</span>
                <span className="syntax-value">{value}</span>
                <span className="syntax-attr-equals">"</span>
              </div>
            );
          }
        } else {
          // React
          if (typeof value === 'string') {
            return (
              <div key={key}>
                {'  '}
                <span className="syntax-attribute">{key}</span>
                <span className="syntax-operator">=</span>
                <span className="syntax-attr-equals">"</span>
                <span className="syntax-value">{value}</span>
                <span className="syntax-attr-equals">"</span>
              </div>
            );
          } else if (typeof value === 'boolean') {
            return value ? (
              <div key={key}>
                {'  '}
                <span className="syntax-attribute">{key}</span>
              </div>
            ) : null;
          } else {
            return (
              <div key={key}>
                {'  '}
                <span className="syntax-attribute">{key}</span>
                <span className="syntax-operator">=</span>
                <span className="syntax-bracket">{'{'}</span>
                <span className="syntax-number">{JSON.stringify(value)}</span>
                <span className="syntax-bracket">{'}'}</span>
              </div>
            );
          }
        }
      })
      .filter(Boolean);

    // Angular için component adını kebab-case'e çevir
    const getComponentName = () => {
      if (framework === 'angular') {
        return currentConfig.name
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase();
      }
      return currentConfig.name;
    };

    return (
      <div>
        <span className="syntax-bracket">{'<'}</span>
        <span className="syntax-component-name">{getComponentName()}</span>
        {props.length > 0 && <>{props}</>}
        <span className="syntax-bracket">
          {props.length > 0 ? '/>' : ' />'}
        </span>
      </div>
    );
  };

  const generateCodeStringAsText = (framework: 'react' | 'vue' | 'angular') => {
    const props = Object.entries(propValues)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== '',
      )
      .map(([key, value]) => {
        if (framework === 'vue') {
          if (typeof value === 'string') {
            return `${key}="${value}"`;
          } else if (typeof value === 'boolean') {
            return value ? `:${key}.prop="true"` : ``;
          } else {
            return `:${key}="${value}"`;
          }
        } else if (framework === 'angular') {
          if (typeof value === 'string') {
            return `${key}="${value}"`;
          } else if (typeof value === 'boolean') {
            return value ? `[${key}]="true"` : ``;
          } else {
            return `[${key}]="${value}"`;
          }
        } else {
          // React
          if (typeof value === 'string') {
            return `${key}="${value}"`;
          } else if (typeof value === 'boolean') {
            return value ? key : '';
          } else {
            return `${key}={${JSON.stringify(value)}}`;
          }
        }
      })
      .filter(Boolean)
      .join('\n  ');

    const propsString = props ? `\n  ${props}` : '';

    const getComponentName = () => {
      if (framework === 'angular') {
        return currentConfig.name
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase();
      }
      return currentConfig.name;
    };

    return `<${getComponentName()}${propsString} />`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
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
        <TkTabs className="playground-tabs">
          <TkTabsItem label="React">
            <div className="relative">
              <div className="absolute top-2 right-2 z-10">
                <TkButton
                  variant="secondary"
                  size="small"
                  type="outlined"
                  mode="button"
                  iconPosition="left"
                  icon="content_copy"
                  onClick={() => {
                    // Copy işlemi için text versiyonunu oluştur
                    const textVersion = generateCodeStringAsText('react');
                    copyToClipboard(textVersion);
                  }}
                />
              </div>
              <pre className="playground-code-block">
                <code>{generateCodeString('react')}</code>
              </pre>
            </div>
          </TkTabsItem>
          <TkTabsItem label="Vue">
            <div className="relative">
              <div className="absolute top-2 right-2 z-10">
                <TkButton
                  variant="secondary"
                  size="small"
                  type="outlined"
                  mode="button"
                  iconPosition="left"
                  icon="content_copy"
                  onClick={() => {
                    const textVersion = generateCodeStringAsText('vue');
                    copyToClipboard(textVersion);
                  }}
                />
              </div>
              <pre className="playground-code-block">
                <code>{generateCodeString('vue')}</code>
              </pre>
            </div>
          </TkTabsItem>
          <TkTabsItem label="Angular">
            <div className="relative">
              <div className="absolute top-2 right-2 z-10">
                <TkButton
                  variant="secondary"
                  size="small"
                  type="outlined"
                  mode="button"
                  iconPosition="left"
                  icon="content_copy"
                  onClick={() => {
                    const textVersion = generateCodeStringAsText('angular');
                    copyToClipboard(textVersion);
                  }}
                />
              </div>
              <pre className="playground-code-block">
                <code>{generateCodeString('angular')}</code>
              </pre>
            </div>
          </TkTabsItem>
        </TkTabs>
      </div>
    );
  }

  function renderPlayground() {
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

  return <>{renderPlayground()}</>;
}
