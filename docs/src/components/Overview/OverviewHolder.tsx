import OverviewItem from './OverviewItem';
import { overviewItems } from '../../data/overview-items';

const OverviewHolder = () => {
  return (
    <div className="flex gap-6 flex-wrap">
      {overviewItems.map((props, idx) => {
        return <OverviewItem key={idx} {...props} />;
      })}
    </div>
  );
};

export default OverviewHolder;
