import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import {signOut} from '~/store/modules/auth/actions';

import {Container, LogoutButton} from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  //logoff
  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <LogoutButton onPress={handleLogout}>Sair do GoBarber</LogoutButton>
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
