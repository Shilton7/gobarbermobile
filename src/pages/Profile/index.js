import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import {signOut} from '~/store/modules/auth/actions';
import {updateProfileRequest} from '~/store/modules/user/actions';

import {
  Container,
  LogoutButton,
  SubmitButton,
  Title,
  Form,
  FormInput,
  Separator,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profileUser = useSelector(state => state.user.profileUser);

  //loading
  const loading = useSelector(state => state.auth.loading);

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profileUser]);

  //data
  const [name, setName] = useState(profileUser.name);
  const [email, setEmail] = useState(profileUser.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //submit
  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      }),
    );
  }

  //logoff
  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <Title>Meu Perfil</Title>
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="mail-outline" //email
            keyboardType="email-address" //@
            autoCorrect={false} //Não corrigir auto
            autoCapitalize="none" //minusculo
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry //****
            placeholder="Digite sua senha atual"
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry //****
            placeholder="Digite sua nova senha"
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry //****
            placeholder="Confirme sua nova senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Atualizar perfil
          </SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair do GoBarber</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({tintColor}) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
