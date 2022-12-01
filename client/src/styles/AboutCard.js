import styled from 'styled-components'

export const AboutCard = styled.div`
  display: flex;
  font-family: 'Lato', sans-serif;
  align-items: center;
  background-color: #F4FAFF;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: 40px auto;
  padding: 60px;
  width: 60%;
  flex-direction: ${({ layout }) => layout || 'row'};

  img {
    width: 80%;
    border-radius: 15px;
  }

  & > div {
    flex: 1;
  }
`


// @media (max-width: ${({ theme }) => theme.mobile}) {
//     flex-direction: column;
//   }