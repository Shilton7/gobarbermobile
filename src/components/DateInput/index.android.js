import React, {useMemo, useState} from 'react';
import {DatePickerAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {Container, DateButton, DateTextSelected} from './styles';

export default function DateInput({date, onChange}) {
  //Show or Hide DateInput
  const [opened, setOpened] = useState(false);

  //Date Selected Formatted
  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  );

  //Open "modal" e set date
  async function handleOpenPicker() {
    const {action, year, month, day} = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
    });

    //user selected Date
    if (action === DatePickerAndroid.dateSetAction) {
      const selectedDate = new Date(year, month, day);
      onChange(selectedDate);
    }
  }

  return (
    <Container>
      <DateButton onPress={() => setOpened(handleOpenPicker)}>
        <Icon name="event" color="#FFF" size={20} />
        <DateTextSelected>{dateFormatted}</DateTextSelected>
      </DateButton>
    </Container>
  );
}
