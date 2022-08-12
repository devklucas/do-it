import { Link, Redirect, useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import ArtImage from "../assets/do-ito.jpg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { FiMail, FiLock } from "react-icons/fi";

import  api  from "../services/api";
import { toast } from "react-toastify";

import {Container, Background, Content, AnimationContainer} from '../styles/Login'

const Login = ({authenticated, setAuthenticated}) => {
  const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email obrigátorio"),
    password: yup
      .string()
      .min(8, "Minimo de 8 digitos")
      .required("Senha obrigatória"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory()

  const onSubmitFunction = (data) => {
    api
    .post("/user/login", data)
    .then((response) => {
        const {token} = response.data
        localStorage.setItem('@Doit:token', JSON.stringify(token))
        setAuthenticated(true)
        return history.push("/dashboard")
    })
    .catch((err)=> toast.error("Email ou senha inválidos"))
  }

  if(authenticated){
    return <Redirect to='/dashboard'/>
  }
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Login</h1>
            <Input
              icon={FiMail}
              label="Email"
              placeholder="Seu melhor email"
              name="email"
              register={register}
              error={errors.email?.message}
            />
            <Input
              icon={FiLock}
              label="Senha"
              placeholder="Uma senha bem segura"
              type="password"
              name="password"
              register={register}
              error={errors.password?.message}
            />
            <Button type="submit">Enviar</Button>
            <p>
              Não tem uma conta? Faça seu <Link to="/signup">cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background><img src={ArtImage} alt='arte login'/></Background>
    </Container>
  );
};
export default Login;
