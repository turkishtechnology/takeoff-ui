import React from 'react';
import { TkEditor } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';

const Placeholder: React.FC = () => {
  const customPlaceholderStyle = `
        .custom-placeholder .ProseMirror p.is-editor-empty:first-child::before {
            color: #6A5ACD; /* SlateBlue */
            font-style: italic;
        }
    `;

  const demo = (
    <React.Fragment>
      <style>{customPlaceholderStyle}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TkEditor placeholder="Lorem ipsum dolor sit amet" />
        <div className="custom-placeholder">
          <TkEditor placeholder="Lorem ipsum dolor sit amet" />
        </div>
        <div className="bg-gray-100 p-4 rounded mt-4">
          <h3 className="text-lg font-medium mb-2">CSS Override</h3>
          <p className="text-sm">Target the placeholder selector to customize its style:</p>
          <pre className="bg-gray-800 text-white p-3 rounded mt-2 text-sm overflow-auto">
            {`.custom-placeholder .ProseMirror p.is-editor-empty:first-child::before {
  color: #6A5ACD;
  font-style: italic;
}`}
          </pre>
        </div>
      </div>
    </React.Fragment>
  );

  const reactCode = `const customPlaceholderStyle = \`
.custom-placeholder .ProseMirror p.is-editor-empty:first-child::before {
    color: #6A5ACD;
    font-style: italic;
}\`;

<React.Fragment>
  <style>{customPlaceholderStyle}</style>
  <TkEditor
    placeholder="Lorem ipsum dolor sit amet"
  />
  <div className="custom-placeholder">
    <TkEditor placeholder="Lorem ipsum dolor sit amet" />
  </div>
</React.Fragment>`;

  const vueCode = `<TkEditor placeholder="Lorem ipsum dolor sit amet" />
    <div class="custom-placeholder">
      <TkEditor placeholder="Lorem ipsum dolor sit amet" />
    </div>

<style>
.custom-placeholder .ProseMirror p.is-editor-empty:first-child::before {
  color: #6A5ACD;
  font-style: italic;
}
</style>`;

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={``} />;
};

export default Placeholder;
