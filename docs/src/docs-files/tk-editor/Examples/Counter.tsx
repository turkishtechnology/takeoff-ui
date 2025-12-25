import { TkEditor, TkCheckbox } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import { useState } from 'react';

const Counter = () => {
  const [showCounter, setShowCounter] = useState(true);
  const [resizable, setResizable] = useState(true);

  const reactCode = `<TkEditor
  label="Editor with Counter"
  placeholder="Type something..."
  showCounter={${showCounter}}
  resizable={${resizable}}
  maxLength={280}
/>`;

  const vueCode = `<tk-editor
  label="Editor with Counter"
  placeholder="Type something..."
  :show-counter="${showCounter}"
  :resizable="${resizable}"
  :max-length="280"
/>`;

  const demo = (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4">
        <TkCheckbox label="Show Counter" value={showCounter} onTkChange={(e) => setShowCounter(e.detail)} />
        <TkCheckbox label="Resizable" value={resizable} onTkChange={(e) => setResizable(e.detail)} />
      </div>
      <TkEditor 
        placeholder="Type something..." 
        showCounter={showCounter} 
        resizable={resizable} 
        maxLength={280} 
      />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={''} />;
};

export default Counter;
