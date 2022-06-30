import styled from "styled-components";

//&:not(:last-child) will add margin to every div, except for the content of the last child of the parent div. 
//AKA will not add margin to the error messages
const FormDiv = styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

export default FormDiv;
