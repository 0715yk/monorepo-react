'use client';

import { FlexContainer } from '@myorg/ui/components';
import { SONG_DATA } from '../../contants/songs';
import { useImageIndex } from '../../contexts/ImageIndexContext';
import styles from './Contents.module.scss';

export default function Contents() {
  const { index } = useImageIndex();
  return (
    <FlexContainer className={styles.contents}>
      {SONG_DATA[index].lyrics}
    </FlexContainer>
  );
}
