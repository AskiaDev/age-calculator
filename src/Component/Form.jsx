import styled from "styled-components";
import Results from "./Results";
import { useState } from "react";

const FormContainer = styled.div`
  width: 100%;
  max-width: 50%; /* Use the full available width */
  height: auto; /* Let the height adjust based on content */
  padding: 2% 4%; /* Use percentage for padding */
  background-color: white;
  border-radius: 1rem 1rem 25rem 1rem;
  margin: 0 auto; /* Center the container horizontally */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 50%;
  padding: 1rem;
  border-radius: 0.5rem;
  outline: none;
  border: 1px solid
    ${(props) => (props.error ? "hsl(0, 100%, 67%)" : "hsl(0, 0%, 86%)")};
  font-size: 32px;
  font-weight: 900;

  &::placeholder {
    font-weight: 900;
  }
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 900;
  color: ${(props) => (props.error ? "hsl(0, 100%, 67%)" : "hsl(0, 1%, 44%)")};
  letter-spacing: 3px;
  margin-bottom: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Line = styled.hr`
  margin: 2rem 0;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  outline: none;
  border: none;
  background-color: hsl(259, 100%, 65%);
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 1rem;
`;

const Error = styled.p`
  color: hsl(0, 100%, 67%);
  font-size: 10px;
  margin-top: 0.5rem;
  font-weight: 600;
  font-style: italic;
`;

const Form = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);

  const dd = parseInt(day);
  const mm = parseInt(month);
  const yy = parseInt(year);

  const handleSubmit = () => {
    // Get the current date
    const currentDate = new Date();

    // Create a date object for the user-inputted date
    const userDate = new Date(yy, mm - 1, dd);

    if (
      dd < 1 ||
      dd > 31 ||
      mm < 1 ||
      mm > 12 ||
      yy < 1 ||
      yy > currentDate.getFullYear()
    ) {
      setError(true);
      return;
    }

    let lastDayOfMonth;

    if (mm === 2) {
      // Check for February
      if (yy % 4 === 0 && (yy % 100 !== 0 || yy % 400 === 0)) {
        // Leap year (February has 29 days)
        lastDayOfMonth = 29;
      } else {
        // Non-leap year (February has 28 days)
        lastDayOfMonth = 28;
      }
    } else {
      // For other months, get the last day using Date
      lastDayOfMonth = new Date(yy, mm, 0).getDate();
    }

    if (dd > lastDayOfMonth) {
      setError(true);
      return;
    }

    setError(false);

    // Calculate the difference in years, months, and days
    let yearDiff = currentDate.getFullYear() - userDate.getFullYear();
    let monthDiff = currentDate.getMonth() - userDate.getMonth();
    let dayDiff = currentDate.getDate() - userDate.getDate();

    if (dayDiff < 0) {
      monthDiff--;
      // Calculate the last day of the previous month
      const lastDayOfPrevMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      ).getDate();
      dayDiff += lastDayOfPrevMonth;
    }

    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }

    setDay("");
    setMonth("");
    setYear("");
    setResult({ yearDiff, monthDiff, dayDiff });
  };

  return (
    <>
      <FormContainer>
        <FormWrapper>
          <InputContainer>
            <Label error={error} htmlFor="day">
              DAY
            </Label>
            <Input
              error={error}
              type="text"
              id="day"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
            {error && <Error>Must be a valid day</Error>}
          </InputContainer>
          <InputContainer>
            <Label error={error} htmlFor="month">
              MONTH
            </Label>
            <Input
              error={error}
              type="text"
              id="month"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            {error && <Error>Must be a valid month</Error>}
          </InputContainer>
          <InputContainer>
            <Label error={error} htmlFor="year">
              YEAR
            </Label>
            <Input
              error={error}
              type="text"
              id="year"
              placeholder="YY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            {error && <Error>Must be a valid year</Error>}
          </InputContainer>
        </FormWrapper>
        <ButtonContainer>
          <Line />
          <Button onClick={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="44"
              viewBox="0 0 46 44"
            >
              <g fill="none" stroke="#FFF" strokeWidth="2">
                <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
              </g>
            </svg>
          </Button>
        </ButtonContainer>
        <Results result={result} />
      </FormContainer>
    </>
  );
};

export default Form;
