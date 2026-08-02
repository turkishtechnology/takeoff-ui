import { TkTextarea } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const CopyButton = () => {
  const reactCode = `<TkTextarea
  label="Description"
  value="Copy this text with the button"
  showCopyButton
/>`;

  const vueCode = `<TkTextarea
  label="Description"
  value="Copy this text with the button"
  show-copy-button
/>`;

  const angularCode = `<tk-textarea
  label="Description"
  value="Copy this text with the button"
  [showCopyButton]="true"
/>`;

  const demo = <TkTextarea label="Description" value="Copy this text with the button" showCopyButton />;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default CopyButton;
