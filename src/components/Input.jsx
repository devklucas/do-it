import styled, {css} from "styled-components";

const Container = styled.div`
  text-align: left;
  div{
    span{
      color:var(--red);
    }
  }
`;

const InputContainer = styled.div`
  background: var(--white);
  border-radius: 10px;
  border: 2px solid var(--gray);
  color: var(--gray);
  padding: 1rem;
  width: 100%;
  display: flex;
  transition: 0.4s;

  ${props => props.isErrored && 
  css`
    border-color:var(--red);
    svg{
      color:var(--red);
    }
  `}

  input {
    background: transparent;
    align-items: center;
    flex: 1;
    border: 0;
    color: var(--black);
    &::placeholder {
      color: var(--gray);
    }
  }
  svg{
        margin-right:16px;
    }
`;
export const Input = ({ label, icon: Icon, register, name,error, ...rest }) => {
  return (
    <Container>
      <div>{label} {!!error && <span> - {error}</span> }</div>
      <InputContainer isErrored={!!error}>
        {Icon && <Icon size={20} />}
        <input {...register(name)} {...rest}  />
      </InputContainer>
    </Container>
  );
};
