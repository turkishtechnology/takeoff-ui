import { TkBadge } from '@takeoff-ui/react';

export default function ReleaseItem({ data }): JSX.Element {
  const renderBadges = () => {
    const tags = [];
    if (data?.newComponents?.length > 0) tags.push('New Component');
    if (data?.newFeatures?.length > 0) tags.push('New Feature');
    if (data?.bugFixes?.length > 0) tags.push('Bug Fix');
    if (data?.refactor?.length > 0) tags.push('Refactor');

    return (
      <>
        {tags.map((item, index) => {
          return <TkBadge label={item} variant="info" type="outlined" key={'tag-' + index} />;
        })}
      </>
    );
  };

  const renderSection = (key, label) => {
    if (data[key]?.length > 0)
      return (
        <div>
          <div className="flex justify-between">
            <div className="w-fit">
              <label>{label}</label>
            </div>
            <div style={{ width: '80%' }}>
              <div className="title-line">&nbsp;</div>
            </div>
          </div>
          {data[key].map((item, index) => {
            return <div key={key + '-' + index}>{item}</div>;
          })}
        </div>
      );
  };

  return (
    <div className="release-item">
      <div className="container">
        <div className="title">
          <div className="version">{data?.version}</div>
          <div className="date">{data?.date}</div>
        </div>
        <div className="flex">
          <div className="flex-1 mb-4 description">
            <div>
              <h1>{data?.title}</h1>
              <div className="tags">{renderBadges()}</div>
            </div>
          </div>
          <div className="flex-1 body">
            {data?.description ? <p>{data?.description}</p> : ''}
            {renderSection('newComponents', 'New Component')}
            {renderSection('newFeatures', 'New Feature')}
            {renderSection('bugFixes', 'Bug Fix')}
            {renderSection('refactor', 'Refactor')}
          </div>
        </div>
      </div>
    </div>
  );
}
