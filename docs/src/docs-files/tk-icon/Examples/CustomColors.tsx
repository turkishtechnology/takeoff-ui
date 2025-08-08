import { TkIcon } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const CustomColors = () => {
  const reactCode = `<TkIcon icon="flight" color="#FF5722" />
<TkIcon icon="flight" color="#2196F3" />
<TkIcon icon="flight" color="#4CAF50" />
<TkIcon icon="flight" sign backgroundColor="#F5F5F5" borderColor="#2196F3" iconColor="#2196F3" />
<TkIcon icon="flight" sign backgroundColor="#FFF9C4" borderColor="#FFC107" iconColor="#FFC107" />`;

  const vueCode = `<TkIcon icon="flight" color="#FF5722" />
<TkIcon icon="flight" color="#2196F3" />
<TkIcon icon="flight" color="#4CAF50" />
<TkIcon icon="flight" sign backgroundColor="#F5F5F5" borderColor="#2196F3" iconColor="#2196F3" />
<TkIcon icon="flight" sign backgroundColor="#FFF9C4" borderColor="#FFC107" iconColor="#FFC107" />`;

  const angularCode = `<tk-icon icon="flight" color="#FF5722" />
<tk-icon icon="flight" color="#2196F3" />
<tk-icon icon="flight" color="#4CAF50" />
<tk-icon icon="flight" sign backgroundColor="#F5F5F5" borderColor="#2196F3" iconColor="#2196F3" />
<tk-icon icon="flight" sign backgroundColor="#FFF9C4" borderColor="#FFC107" iconColor="#FFC107" />`;

  const demo = (
    <div className="flex justify-center items-end flex-wrap gap-4">
      <TkIcon icon="flight" color="#FF5722" />
      <TkIcon icon="flight" color="#2196F3" />
      <TkIcon icon="flight" color="#4CAF50" />
      <TkIcon icon="flight" sign backgroundColor="#F5F5F5" borderColor="#2196F3" iconColor="#2196F3" />
      <TkIcon icon="flight" sign backgroundColor="#FFF9C4" borderColor="#FFC107" iconColor="#FFC107" />
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default CustomColors;
