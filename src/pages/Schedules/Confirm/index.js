import React, {useMemo} from 'react';
import {Container, Avatar, Name, Time, SubmitButton} from './styles';
import Background from '~/components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity, Alert} from 'react-native';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';

export default function Confirm({navigation}) {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), {locale: pt}),
    [time],
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      date: time,
      provider_id: provider.id,
    });

    Alert.alert('Agendamento', 'Realizado com sucesso!');

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: `https://api.adorable.io/avatar/40/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({navigation}) => ({
  title: 'Confirme seu agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SelectDateTime');
      }}>
      <Icon name="chevron-left" size={25} color="#FFF" />
    </TouchableOpacity>
  ),
});
