'use client';

import { FlexContainer } from '@myorg/ui/components';
import styles from './Banner.module.scss';
import { SONG_DATA } from '../../contants/songs';
import { useImageIndex } from '../../contexts/ImageIndexContext';

export default function Banner() {
  const { index, setIndex } = useImageIndex();

  const changeImage = (value: number) => {
    setIndex(value);
  };
  return (
    <div
      className={styles.backgroundContainer}
      style={{
        backgroundImage: `url(${SONG_DATA[index].cover})`
      }}
    >
      <div className={styles.contentWrapper}>
        <FlexContainer gap={10} height="400px">
          {SONG_DATA.map((data, idx) => (
            <img
              key={data.title}
              className={styles.image}
              src={data.cover}
              onClick={() => changeImage(idx)}
            />
          ))}
        </FlexContainer>
      </div>
    </div>
  );
}
