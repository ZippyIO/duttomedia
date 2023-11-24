'use client';

import { useState } from 'react';

import { useEdgeStore } from '~/lib/edgestore';

const useFileUpload = () => {
  const [progress, setProgress] = useState(0);

  const { edgestore } = useEdgeStore();

  const uploadFile = async (file: File) => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file: file,
        onProgressChange: (progress) => {
          setProgress(progress);
        },
      });

      return res;
    }
  };

  return {
    progress,
    uploadFile,
  };
};

export default useFileUpload;
