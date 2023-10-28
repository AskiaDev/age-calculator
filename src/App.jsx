import styled from "styled-components";
import GlobalSytles from "./Component/GlobalStyles";
import Form from "./Component/Form";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: hsl(0, 0%, 86%);
`;

const App = () => {
  return (
    <>
      <GlobalSytles />
      <Container>
        <Form />
      </Container>
    </>
  );
};

export default App;
