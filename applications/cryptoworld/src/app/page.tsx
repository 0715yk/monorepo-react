import styles from './page.module.css';
import { FlexContainer } from '@myorg/ui/components';

export default function Home() {
  return (
    <FlexContainer alignItems="flex-start" gap={10} height="100vh">
      <img
        className={styles.image}
        src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F9%2F9d%2F2017_%25EA%25B8%25B0%25EB%25A6%25AC%25EB%25B3%25B4%25EC%259D%25B4.jpg&type=sc960_832"
      />
      <img
        className={styles.image}
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5206%2F2020%2F02%2F17%2F0000061301_002_20200217142810699.jpg&type=sc960_832"
      />
      <img
        className={styles.image}
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDEyMDRfMjAy%2FMDAxNzMzMzEwNzA0MDQ0.o6whEPD2Eufi0TLTRBDjorxTnNhnYLkqh_iPVVB_Snsg.lk7cwR8as9m1Y1J9djSBRIDzzYEOPciYQIRFsuLqvUEg.PNG%2Fimage.png&type=sc960_832"
      />
      <img
        className={styles.image}
        src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F474x%2Ffe%2Ff7%2Fd8%2Ffef7d8c6fe9d5050454db49855d38b08.jpg&type=sc960_832"
      />
    </FlexContainer>
  );
}
