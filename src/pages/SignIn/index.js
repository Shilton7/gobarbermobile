import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native';
import logo from '~/assets/logo.png';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';
import Background from '~/components/Background';
import {signInRequest} from '~/store/modules/auth/actions';

export default function SignIn({navigation}) {
  const dispatch = useDispatch();

  //loading
  const loading = useSelector(state => state.auth.loading);

  //data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //submit
  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline" //email
            keyboardType="email-address" //@
            autoCorrect={false} //Não corrigir auto
            autoCapitalize="none" //minusculo
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry //****
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
