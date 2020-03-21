import {Alert} from 'react-native';
import api from '~/services/api';
import {signInSuccess, signFailure} from './actions';
import {takeLatest, call, put, all, delay} from 'redux-saga/effects';

//request login
export function* signInRequest({payload}) {
  try {
    const {email, password} = payload;

    //metodo,url,params
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const {token, user} = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuário não pode ser prestador de serviços.',
      );
      return;
    }

    //setando Authorization ao logar
    api.defaults.headers.Authorization = `Bearer ${token}`;

    //delay
    yield delay(1000);

    //sucesso
    yield put(signInSuccess(token, user));
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados',
    );
    yield put(signFailure());
  }
}

//Criar conta
export function* signUpRequest({payload}) {
  try {
    const {name, email, password} = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });
  } catch (error) {
    Alert.alert(
      'Falha ao criar conta',
      'Houve um erro no cadastro, verifique seus dados.',
    );
    yield put(signFailure());
  }
}

export function setToken({payload}) {
  if (!payload) return;

  const {token} = payload.auth;

  if (token) {
    //setando Authorization sem passar pelo logar
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signInRequest),
  takeLatest('@auth/SIGN_UP_REQUEST', signUpRequest),
]);
