import styled from "styled-components";

export const ButtonContainer = styled.button`
  text-transform: capitalize;
  font-size: 1.4rem;
  font-weight: bold;
  background: transparent;
  border: 0.05rem solid var(--mainBlack);
  border-color: "var(--mainBlack)";
  color: "var(--mainBlack)";
  border-radius: 0.5rem;
  padding: 0.2rem 0.5 rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: var(--darkOrange);
    color: var(--mainBlack);
  }
  &:focus {
    outline: none;
  }
`;

export const ButtonSign = styled.button`
  text-transform: capitalize;
  font-size: 1rem;
  font-weight: bold;
  background: var(--blue);
  border: 0.05rem solid var(--mainBlack);
  border-color: "var(--mainBlack)";
  color: "var(--mainBlack)";
  border-radius: 0.5rem;
  padding: 0.2rem 0.5 rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.5s ease-in-out;
  &:focus {
    outline: none;
  }
`;
