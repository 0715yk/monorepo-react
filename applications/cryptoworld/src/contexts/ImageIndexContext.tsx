'use client';

import { FC, createContext, useContext, useState } from 'react';

type ImageIndexContextType = {
  index: number;
  setIndex: (index: number) => void;
};

// Context 생성 시 기본값 설정
const ImageIndexContext = createContext<ImageIndexContextType>({
  index: 0,
  setIndex: () => void 0
});

export const ImageIndexProvider: FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [index, setIndex] = useState(0);

  return (
    <ImageIndexContext.Provider value={{ index, setIndex }}>
      {children}
    </ImageIndexContext.Provider>
  );
};

export const useImageIndex = () => {
  const context = useContext(ImageIndexContext);
  if (!context) {
    throw new Error('useImageIndex must be used within a ImageIndexProvider');
  }
  return context;
};
