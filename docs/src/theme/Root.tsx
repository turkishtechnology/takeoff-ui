import React, { useEffect } from 'react';

export default function Root({ children }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-tk-font', 'true');
  }, []);

  return <>{children}</>;
}
