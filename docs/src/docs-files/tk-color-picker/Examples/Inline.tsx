import { TkColorPicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Inline = () => {
  const demo = <TkColorPicker inline />;

  const reactCode = `<TkColorPicker inline />`;

  const vueCode = `<TkColorPicker inline />`;

  const angularCode = ``;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Inline;
