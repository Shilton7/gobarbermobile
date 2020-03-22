import React, {useState} from 'react';
import Background from '~/components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {Container} from './styles';
import DateInput from '~/components/DateInput';

export default function SelectDateTime() {
  //date current
  const [dateCurrent, setDateCurrent] = useState(new Date());

  return (
    <Background>
      <Container>
        <DateInput date={dateCurrent} onChange={setDateCurrent} />
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
