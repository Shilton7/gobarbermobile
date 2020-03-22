import React, {useState, useMemo} from 'react';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DatePickerIOS} from 'react-native';
import {Container, DateButton, DateTextSelected, Picker} from './styles';

export default function DateInput({date, onChange}) {
  //Show or Hide DateInput
  const [opened, setOpened] = useState(false);

  //Date Selected Formatted
  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", {locale: pt}),
    [date],
  );

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" size={20} color="#FFF" />
        <DateTextSelected>{dateFormatted}</DateTextSelected>
      </DateButton>

      {opened && (
        <Picker>
          <DatePickerIOS
            date={date} //Date Selected
            onDateChange={onChange} //next Date
            minimumDate={new Date()} //block Date past
            minuteInterval={60}
            locale="pt"
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}
