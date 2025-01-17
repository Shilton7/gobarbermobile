import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarberweb',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'], //nome dos reducers que vamos armazenar os dados
    },
    reducers,
  );

  return persistedReducer;
};
