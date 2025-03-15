import React, { lazy, Suspense } from 'react';

const LoadingOverlay = lazy(() => import('./LoadingOverlay'));

interface ProcessingViewProps {
  isProcessing: boolean;
}

const ProcessingView: React.FC<ProcessingViewProps> = ({ isProcessing }) => {
  return (
    <>
      {isProcessing && (
        <Suspense fallback={<div>Loading...</div>}>
          <LoadingOverlay />
        </Suspense>
      )}
    </>
  );
};

export default ProcessingView;