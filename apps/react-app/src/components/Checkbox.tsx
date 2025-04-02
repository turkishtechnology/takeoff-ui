import { useEffect, useState } from 'react';
import { TkCheckbox } from '@takeoff-ui/react';

function Checkbox() {
  const [checked, setChecked] = useState(false);

  const onTkChange = () => {
    console.log('FUNC IS WORKED');
  };

  useEffect(() => {
    setChecked(true);
  }, []);

  console.log('render');
  return <TkCheckbox value={checked} onTkChange={onTkChange}></TkCheckbox>;
}

export default Checkbox;
