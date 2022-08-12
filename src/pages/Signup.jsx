import { Link, useHistory, Redirect } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ArtImage from "../assets/do-ito.jpg";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

import api  from "../services/api";
import { toast } from "react-toastify";

import {Container, Background, Content, AnimationContainer} from '../styles/Signup'

const Signup = ({authenticated}) => {
  const schema = yup.object().shape({
    name: yup.string().required("Campo obrigatório!"),
    email: yup.string().email("Email inválido").required("Email obrigátorio"),
    password: yup
      .string()
      .min(8, "Minimo de 8 digitos")
      .required("Senha obrigatória"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas não conferem")
      .required("Confirmar senha")
      ,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory()

  const onSubmitFunction = ({name, email, password}) => {
    const user = {name, email, password}
    api
    .post("/user/register", user)
    .then(() => {
      toast.success('Sucesso ao criar a conta')
      return history.push("/login")
    })
    .catch((err)=> toast.error("Erro ao criar conta, tente novamente"))
  }
   if(authenticated){
    return <Redirect to='/dashboard'/>
  }
  return (
    <Container>
      <Background><img src={ArtImage} alt="arte sign up" /></Background>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Cadastro</h1>
            <Input
              icon={FiUser}
              label="Nome"
              placeholder="Seu nome"
              name="name"
              register={register}
              error={errors.name?.message}
            />
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
            <Input
              icon={FiLock}
              label="Confirmação de senha"
              placeholder="Confirmação de senha"
              type="password"
              name="passwordConfirm"
              register={register}
              error={errors.passwordConfirm?.message}
            />
            <Button type="submit">Enviar</Button>
            <p>
              Ja tem uma conta? Faça seu <Link to="/login">login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default Signup;
