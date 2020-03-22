import React, {useState, useEffect} from 'react';
import Background from '~/components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {Container, HourList, Hour, Title} from './styles';
import DateInput from '~/components/DateInput';
import api from '~/services/api';

export default function SelectDateTime({navigation}) {
  //date selected
  const [dateCurrent, setDateCurrent] = useState(new Date());

  const [hours, setHours] = useState([]);

  //provider
  const provider = navigation.getParam('provider');

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: dateCurrent.getTime(),
        },
      });
      setHours(response.data);
    }
    loadAvailable();
  }, [dateCurrent, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {provider, time});
  }

  return (
    <Background>
      <Container>
        <DateInput date={dateCurrent} onChange={setDateCurrent} />
        <HourList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({item}) => (
            <Hour
              onPress={() => handleSelectHour(item.value)}
              enable={item.available}>
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({navigation}) => ({
  title: 'Selecione a data e horário',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SelectProvider');
      }}>
      <Icon name="chevron-left" size={25} color="#FFF" />
    </TouchableOpacity>
  ),
});
