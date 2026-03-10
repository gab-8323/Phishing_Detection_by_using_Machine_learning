
import React from 'react';

interface NeuralCursorProps {
  isDanger?: boolean;
}

const NeuralCursor: React.FC<NeuralCursorProps> = () => {
  // Returning null effectively removes the extra visual layers around the cursor 
  // while keeping the component reference in App.tsx for architectural consistency.
  // The system crosshair cursor is already handled via CSS in index.html.
  return null;
};

export default NeuralCursor;
