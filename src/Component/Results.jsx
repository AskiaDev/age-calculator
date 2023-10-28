import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: start;
`;

const Dashed = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  color: hsl(259, 100%, 65%);
`;

const H1 = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  font-style: italic;
`;

const ResultContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Results = ({ result }) => {
  console.log(result);
  return (
    <Container>
      <ResultContainer>
        <Dashed>{result ? result.yearDiff : "- -"}</Dashed>
        <H1>years</H1>
      </ResultContainer>
      <ResultContainer>
        <Dashed>{result ? result.monthDiff : "- -"}</Dashed>
        <H1>months</H1>
      </ResultContainer>
      <ResultContainer>
        <Dashed>{result ? result.dayDiff : "- -"}</Dashed>
        <H1>days</H1>
      </ResultContainer>
    </Container>
  );
};

export default Results;
