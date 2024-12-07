import styled from "@emotion/styled";
import { FlexContainer } from "@myorg/ui";

const Dashboard = styled.div`
  padding: 16px;
  color: rgba(255, 255, 255, 0.87); // 텍스트 색상도 다크모드에 맞게 변경
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.87);
`;

const Section = styled.div``;

const DashBoard = () => {
  return (
    <Dashboard>
      <FlexContainer direction="column" alignItems="flex-start" gap={50}>
        <Section>
          <SectionTitle>MVRV Ratio</SectionTitle>
          {/* MVRV 차트/데이터가 들어갈 자리 */}
        </Section>

        <Section>
          <SectionTitle>Puell Multiple</SectionTitle>
          {/* 푸엘 지표 차트/데이터가 들어갈 자리 */}
        </Section>

        <Section>
          <SectionTitle>BTC Price & 120D MA</SectionTitle>
          {/* 가격 차트가 들어갈 자리 */}
        </Section>

        <Section>
          <SectionTitle>Funding Rate</SectionTitle>
          {/* 펀딩비 데이터가 들어갈 자리 */}
        </Section>

        <Section>
          <SectionTitle>Kimchi Premium</SectionTitle>
          {/* 김치 프리미엄 데이터가 들어갈 자리 */}
        </Section>

        <Section>
          <SectionTitle>ETF Daily Outflow</SectionTitle>
          {/* ETF 유출량 데이터가 들어갈 자리 */}
        </Section>
      </FlexContainer>
    </Dashboard>
  );
};

export default DashBoard;
