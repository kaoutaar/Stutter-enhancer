import React, { lazy, Suspense } from 'react';

const EnhancedWindow = lazy(() => import('./EnhancedWindow'));

interface EnhancedViewProps {
  audioBlob: Blob;
  onReset: () => void;
}

const EnhancedView: React.FC<EnhancedViewProps> = ({ audioBlob, onReset }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnhancedWindow audioBlob={audioBlob} onReset={onReset} />
    </Suspense>
  );
};

export default EnhancedView;