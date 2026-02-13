import { useState, useMemo } from 'react';
import type { ChildConfig, ControlConfig, PlaygroundProps } from './Playground.types';
import './playground.css';
import { createConfigFromJson } from './utils/createConfig';
import { TkButton, TkInput, TkSelect, TkCheckbox, TkTooltip, TkTabs, TkTabsItem } from '@takeoff-ui/react';

export default function Playground({ configs, componentMap = {}, defaultConfigIndex = 0 }: PlaygroundProps) {
  const processedConfigs = useMemo(() => {
    return configs.map(config => {
      if (config.componentName) {
        const Component = componentMap[config.componentName];
        if (!Component) {
          throw new Error(`Component ${config.componentName} not found in componentMap`);
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
      {} as Record<string, any>,
    );
  }

  const [propValues, setPropValues] = useState<Record<string, any>>(() => getDefaultPropValues(processedConfigs[defaultConfigIndex]));

  const [jsonErrors, setJsonErrors] = useState<Record<string, boolean>>({});
  const [jsonRawValues, setJsonRawValues] = useState<Record<string, string>>({});

  const currentConfig = processedConfigs[defaultConfigIndex];

  const handlePropChange = (key: string, value: any) => {
    setPropValues(prev => ({ ...prev, [key]: value }));
  };

  const resetPlayground = () => {
    setPropValues(() => getDefaultPropValues(processedConfigs[defaultConfigIndex]));
    setJsonErrors({});
    setJsonRawValues({});
  };

  const renderControl = (control: ControlConfig) => {
    const value = propValues[control.key];

    switch (control.type) {
      case 'text':
        const commonPropsforInput = {
          value: String(value || ''),
          onTkChange: e => {
            handlePropChange(control.key, e.detail);
          },
        };

        if (control.tooltip) {
          return (
            <TkTooltip header={typeof control.tooltip === 'string' ? control.tooltip : null} variant="dark">
              <TkInput slot="trigger" {...commonPropsforInput} />
            </TkTooltip>
          );
        } else {
          return <TkInput {...commonPropsforInput} />;
        }

      case 'select':
        const commonPropsforSelect = {
          value: control.options?.find(opt => String(opt.value) === String(value)) || '',
          onTkChange: e => {
            const selectedOption = control.options?.find(opt => String(opt.value) === e.detail.value);
            handlePropChange(control.key, selectedOption?.value || '');
          },
          options: control.options,
        };

        if (control.tooltip) {
          return (
            <TkTooltip header={typeof control.tooltip === 'string' ? control.tooltip : null} variant="dark">
              <TkSelect slot="trigger" {...commonPropsforSelect} />
            </TkTooltip>
          );
        } else {
          return <TkSelect {...commonPropsforSelect} />;
        }

      case 'checkbox':
        const commonPropsforCheckbox = {
          value: Boolean(value),
          onTkChange: e => handlePropChange(control.key, e.detail),
          label: control.label,
        };

        if (control.tooltip) {
          return (
            <TkTooltip header={typeof control.tooltip === 'string' ? control.tooltip : null} variant="dark">
              <TkCheckbox slot="trigger" {...commonPropsforCheckbox} />
            </TkTooltip>
          );
        } else {
          return <TkCheckbox {...commonPropsforCheckbox} />;
        }

      case 'json': {
        const displayValue = jsonErrors[control.key] ? jsonRawValues[control.key] : JSON.stringify(value, null, 2);

        const textarea = (
          <div>
            <textarea
              className={`playground-json-textarea${!Array.isArray(control.defaultValue) && (control.defaultValue === null || typeof control.defaultValue !== 'object') ? ' playground-json-textarea-small' : ''}`}
              value={displayValue ?? ''}
              onChange={e => {
                const raw = e.target.value;
                setJsonRawValues(prev => ({ ...prev, [control.key]: raw }));
                try {
                  const parsed = JSON.parse(raw);
                  handlePropChange(control.key, parsed);
                  setJsonErrors(prev => ({ ...prev, [control.key]: false }));
                } catch {
                  setJsonErrors(prev => ({ ...prev, [control.key]: true }));
                }
              }}
            />
            {jsonErrors[control.key] && <span style={{ color: '#e06c75', fontSize: 12 }}>Invalid JSON</span>}
          </div>
        );

        if (control.tooltip) {
          return (
            <TkTooltip header={typeof control.tooltip === 'string' ? control.tooltip : null} variant="dark">
              <div slot="trigger">{textarea}</div>
            </TkTooltip>
          );
        }
        return textarea;
      }

      default:
        return null;
    }
  };

  const renderChildren = (children: ChildConfig[]): React.ReactNode[] => {
    return children.map((child, index) => {
      if (child.type === 'text') {
        return (
          <span key={index} {...(child.slot ? { slot: child.slot } : {})}>
            {child.content}
          </span>
        );
      }
      if (child.type === 'component' && child.componentName) {
        const isNativeElement = child.componentName.charAt(0) === child.componentName.charAt(0).toLowerCase();
        const ChildComponent = isNativeElement ? child.componentName : componentMap[child.componentName];
        if (!ChildComponent) return null;
        const childProps = { ...(child.props || {}), ...(child.slot ? { slot: child.slot } : {}) };
        if (child.children && child.children.length > 0) {
          return (
            <ChildComponent key={index} {...childProps}>
              {renderChildren(child.children)}
            </ChildComponent>
          );
        }
        return <ChildComponent key={index} {...childProps} />;
      }
      return null;
    });
  };

  const renderPreviewComponent = () => {
    const Component = currentConfig.component;

    const cleanProps = Object.fromEntries(
      Object.entries(propValues).filter(([_, value]) => value !== undefined && value !== null && (typeof value === 'object' || typeof value !== 'string' || value !== '')),
    );

    // Merge staticProps (non-editable defaults) with user-controlled props
    const mergedProps: Record<string, any> = { ...(currentConfig.staticProps || {}), ...cleanProps };

    // Attach close event handler for overlay components with a trigger
    if (currentConfig.triggerProp && currentConfig.triggerCloseEvent) {
      mergedProps[currentConfig.triggerCloseEvent] = () => handlePropChange(currentConfig.triggerProp!, false);
    }

    // Key forces remount when props change — needed for web components that
    // don't react to attribute updates after initial render.
    const componentKey = JSON.stringify(mergedProps);

    let componentElement: React.ReactNode;

    const childConfigs = currentConfig.children;
    if (childConfigs && childConfigs.length > 0) {
      componentElement = (
        <Component key={componentKey} {...mergedProps}>
          {renderChildren(childConfigs)}
        </Component>
      );
    } else if (currentConfig.hasChildren && currentConfig.defaultChildren) {
      componentElement = (
        <Component key={componentKey} {...mergedProps}>
          {currentConfig.defaultChildren}
        </Component>
      );
    } else {
      componentElement = <Component key={componentKey} {...mergedProps} />;
    }

    // Render a trigger button for overlay components (dialog, drawer, etc.)
    if (currentConfig.triggerProp) {
      return (
        <>
          <TkButton
            label={currentConfig.triggerLabel || `Open ${currentConfig.name}`}
            variant="primary"
            size="base"
            type="filled"
            mode="button"
            onClick={() => handlePropChange(currentConfig.triggerProp!, true)}
          />
          {componentElement}
        </>
      );
    }

    return componentElement;
  };

  const generateCodeString = (framework: 'react' | 'vue' | 'angular') => {
    const allCodeProps = { ...(currentConfig.staticProps || {}), ...propValues };
    const props = Object.entries(allCodeProps)
      .filter(([_, value]) => value !== undefined && value !== null && (typeof value === 'object' || value !== ''))
      .map(([key, value]) => {
        if (typeof value === 'object') {
          const jsonStr = JSON.stringify(value);
          if (framework === 'vue') {
            return (
              <div key={key}>
                {'  '}
                <span className="syntax-operator">:</span>
                <span className="syntax-attribute">{key}</span>
                <span className="syntax-operator">=</span>
                <span className="syntax-attr-equals">"</span>
                <span className="syntax-value">{jsonStr}</span>
                <span className="syntax-attr-equals">"</span>
              </div>
            );
          } else if (framework === 'angular') {
            return (
              <div key={key}>
                {'  '}
                <span className="syntax-bracket">[</span>
                <span className="syntax-attribute">{key}</span>
                <span className="syntax-bracket">]</span>
                <span className="syntax-operator">=</span>
                <span className="syntax-attr-equals">"</span>
                <span className="syntax-value">{jsonStr}</span>
                <span className="syntax-attr-equals">"</span>
              </div>
            );
          } else {
            return (
              <div key={key}>
                {'  '}
                <span className="syntax-attribute">{key}</span>
                <span className="syntax-operator">=</span>
                <span className="syntax-bracket">{'{'}</span>
                <span className="syntax-value">{jsonStr}</span>
                <span className="syntax-bracket">{'}'}</span>
              </div>
            );
          }
        }
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
        return currentConfig.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      }
      return currentConfig.name;
    };

    const generateChildrenCode = (children: ChildConfig[], indent: number): React.ReactNode[] => {
      const pad = '  '.repeat(indent);
      return children.map((child, index) => {
        if (child.type === 'text') {
          return (
            <div key={`child-${index}`}>
              {pad}
              {child.slot ? (
                <>
                  <span className="syntax-bracket">{'<'}</span>
                  <span className="syntax-component-name">span</span> <span className="syntax-attribute">slot</span>
                  <span className="syntax-operator">=</span>
                  <span className="syntax-attr-equals">"</span>
                  <span className="syntax-value">{child.slot}</span>
                  <span className="syntax-attr-equals">"</span>
                  <span className="syntax-bracket">{'>'}</span>
                  <span className="syntax-value">{child.content}</span>
                  <span className="syntax-bracket">{'</'}</span>
                  <span className="syntax-component-name">span</span>
                  <span className="syntax-bracket">{'>'}</span>
                </>
              ) : (
                <span className="syntax-value">{child.content}</span>
              )}
            </div>
          );
        }
        if (child.type === 'component' && child.componentName) {
          const childName = framework === 'angular' ? child.componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : child.componentName;
          const childPropEntries = Object.entries(child.props || {}).filter(([_, v]) => v !== undefined && v !== null && v !== '');
          if (child.slot) {
            childPropEntries.unshift(['slot', child.slot]);
          }
          const childPropElements = childPropEntries
            .map(([key, value]) => {
              if (typeof value === 'string') {
                return (
                  <span key={key}>
                    {' '}
                    <span className="syntax-attribute">{key}</span>
                    <span className="syntax-operator">=</span>
                    <span className="syntax-attr-equals">"</span>
                    <span className="syntax-value">{value}</span>
                    <span className="syntax-attr-equals">"</span>
                  </span>
                );
              } else if (typeof value === 'boolean') {
                if (!value) return null;
                if (framework === 'react') {
                  return (
                    <span key={key}>
                      {' '}
                      <span className="syntax-attribute">{key}</span>
                    </span>
                  );
                }
                return (
                  <span key={key}>
                    {' '}
                    <span className="syntax-attribute">{key}</span>
                    <span className="syntax-operator">=</span>
                    <span className="syntax-attr-equals">"</span>
                    <span className="syntax-boolean">true</span>
                    <span className="syntax-attr-equals">"</span>
                  </span>
                );
              } else {
                return (
                  <span key={key}>
                    {' '}
                    <span className="syntax-attribute">{key}</span>
                    <span className="syntax-operator">=</span>
                    <span className="syntax-bracket">{'{'}</span>
                    <span className="syntax-number">{JSON.stringify(value)}</span>
                    <span className="syntax-bracket">{'}'}</span>
                  </span>
                );
              }
            })
            .filter(Boolean);

          if (child.children && child.children.length > 0) {
            return (
              <div key={`child-${index}`}>
                {pad}
                <span className="syntax-bracket">{'<'}</span>
                <span className="syntax-component-name">{childName}</span>
                {childPropElements}
                <span className="syntax-bracket">{'>'}</span>
                {generateChildrenCode(child.children, indent + 1)}
                {pad}
                <span className="syntax-bracket">{'</'}</span>
                <span className="syntax-component-name">{childName}</span>
                <span className="syntax-bracket">{'>'}</span>
              </div>
            );
          }

          return (
            <div key={`child-${index}`}>
              {pad}
              <span className="syntax-bracket">{'<'}</span>
              <span className="syntax-component-name">{childName}</span>
              {childPropElements}
              <span className="syntax-bracket">{' />'}</span>
            </div>
          );
        }
        return null;
      });
    };

    const childConfigs = currentConfig.children;
    const hasDefaultChildren = currentConfig.hasChildren && currentConfig.defaultChildren;

    if ((childConfigs && childConfigs.length > 0) || hasDefaultChildren) {
      return (
        <div>
          <span className="syntax-bracket">{'<'}</span>
          <span className="syntax-component-name">{getComponentName()}</span>
          {props.length > 0 && <>{props}</>}
          <span className="syntax-bracket">{'>'}</span>
          {childConfigs && childConfigs.length > 0 ? (
            generateChildrenCode(childConfigs, 1)
          ) : (
            <div>
              {'  '}
              <span className="syntax-value">{String(currentConfig.defaultChildren)}</span>
            </div>
          )}
          <span className="syntax-bracket">{'</'}</span>
          <span className="syntax-component-name">{getComponentName()}</span>
          <span className="syntax-bracket">{'>'}</span>
        </div>
      );
    }

    return (
      <div>
        <span className="syntax-bracket">{'<'}</span>
        <span className="syntax-component-name">{getComponentName()}</span>
        {props.length > 0 && <>{props}</>}
        <span className="syntax-bracket">{props.length > 0 ? '/>' : ' />'}</span>
      </div>
    );
  };

  const generateCodeStringAsText = (framework: 'react' | 'vue' | 'angular') => {
    const allCodeProps = { ...(currentConfig.staticProps || {}), ...propValues };
    const props = Object.entries(allCodeProps)
      .filter(([_, value]) => value !== undefined && value !== null && (typeof value === 'object' || value !== ''))
      .map(([key, value]) => {
        if (typeof value === 'object') {
          const jsonStr = JSON.stringify(value);
          if (framework === 'vue') return `:${key}="${jsonStr}"`;
          if (framework === 'angular') return `[${key}]="${jsonStr}"`;
          return `${key}={${jsonStr}}`;
        }
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
        return currentConfig.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      }
      return currentConfig.name;
    };

    const generateChildrenText = (children: ChildConfig[], indent: number): string => {
      const pad = '  '.repeat(indent);
      return children
        .map(child => {
          if (child.type === 'text') {
            if (child.slot) {
              return `${pad}<span slot="${child.slot}">${child.content}</span>`;
            }
            return `${pad}${child.content}`;
          }
          if (child.type === 'component' && child.componentName) {
            const childName = framework === 'angular' ? child.componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : child.componentName;
            const childPropEntries = Object.entries(child.props || {}).filter(([_, v]) => v !== undefined && v !== null && v !== '');
            if (child.slot) {
              childPropEntries.unshift(['slot', child.slot]);
            }
            const childPropsStr = childPropEntries
              .map(([key, value]) => {
                if (typeof value === 'string') return `${key}="${value}"`;
                if (typeof value === 'boolean') {
                  if (!value) return '';
                  if (framework === 'react') return key;
                  return `${key}="true"`;
                }
                return `${key}={${JSON.stringify(value)}}`;
              })
              .filter(Boolean)
              .join(' ');
            const propsSegment = childPropsStr ? ` ${childPropsStr}` : '';

            if (child.children && child.children.length > 0) {
              const nestedChildren = generateChildrenText(child.children, indent + 1);
              return `${pad}<${childName}${propsSegment}>\n${nestedChildren}\n${pad}</${childName}>`;
            }
            return `${pad}<${childName}${propsSegment} />`;
          }
          return '';
        })
        .filter(Boolean)
        .join('\n');
    };

    const childConfigs = currentConfig.children;
    const hasDefaultChildren = currentConfig.hasChildren && currentConfig.defaultChildren;

    if ((childConfigs && childConfigs.length > 0) || hasDefaultChildren) {
      const childrenStr = childConfigs && childConfigs.length > 0 ? generateChildrenText(childConfigs, 1) : `  ${String(currentConfig.defaultChildren)}`;
      return `<${getComponentName()}${propsString}>\n${childrenStr}\n</${getComponentName()}>`;
    }

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
          <TkButton variant="secondary" size="small" type="outlined" mode="button" iconPosition="left" icon="refresh" onClick={resetPlayground} />
        </h3>

        <div className="playground-controls-grid">
          {currentConfig.props.map(control => (
            <div key={control.key} style={control.type === 'json' ? { gridColumn: '1 / -1' } : undefined}>
              {control.type !== 'checkbox' && <label className="playground-label">{control.label}:</label>}
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
        <div className={`playground-component-wrapper${currentConfig.fullWidth ? ' full-width' : ''}`}>{renderPreviewComponent()}</div>
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
        <div className="playground-container-right-side">{renderControls()}</div>
      </div>
    );
  }

  return <>{renderPlayground()}</>;
}
