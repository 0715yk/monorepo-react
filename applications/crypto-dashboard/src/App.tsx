import "./App.css";
import styled from "@emotion/styled";
import DashBoard from "./pages/DashBoard";

const AppContainer = styled.div`
  width: 100%;
  max-width: 428px;
  min-height: 100vh;
  margin: 0 auto;
  background: #242424; // 다크모드 배경색으로 변경
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 428px) {
    max-width: 100%;
    box-shadow: none;
  }
`;

function App() {
  return (
    <AppContainer>
      <DashBoard />
    </AppContainer>
  );
}

export default App;
