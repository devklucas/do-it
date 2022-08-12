import styled, {keyframes} from 'styled-components'

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
const Background = styled.div`
  @media (min-width: 700px) {
    flex: 1;
    background-color: var(--black);
    background-size:contain;
    display: flex;
    align-items:center;
    justify-content: center;
    img{
      width:500px;
      height:500px;
      border-radius:50%;
    }
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
`;
const appearFromRight = keyframes`
    from {
        opacity:0;
        transform: translateX(50px);
    }
    to{
        opacity:1;
        transform:translateX(0px)
    }
`;
const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromRight} 1s;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
  
  h1 {
    margin-bottom: 32px;
  }
  > div {
    margin-top:16px;
  }
  p {
    margin-top: 8px;
    a {
      font-weight: bold;
      color: var(--orange);
    }
  }
  }
`;

export {Container, Background, Content, AnimationContainer}