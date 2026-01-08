import { TkColorPicker } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Orientation = () => {
  const reactCode = `<TkColorPicker inline orientation="vertical" />
      <TkColorPicker inline orientation="horizontal" />`;

  const vueCode = `<TkColorPicker inline orientation="vertical" />
      <TkColorPicker inline orientation="horizontal" />`;

  const angularCode = ``;

  const demo = (
    <div className="flex gap-4 justify-center ">
      <div>
        <h5>Vertical</h5>
        <TkColorPicker inline orientation="vertical" />
      </div>
      <div>
        <h5>Horizontal</h5>
        <TkColorPicker inline orientation="horizontal" />
      </div>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode} />;
};

export default Orientation;
