import { getRequest, sendRequest } from './ApiHandler';
import { SIGN_UP, MISSED_CALL, MISSED_CALL_VERIFY, LOG_IN } from './ApiConstants';

export const signUp = async data => {
  try {
    return sendRequest(data, 'POST', SIGN_UP, {});
  } catch (err) {
    return err;
  }
};
export const missedCall = async data => {
  console.log("data",data)
  try {
    return sendRequest(data, 'POST', MISSED_CALL, {});
  } catch (err) {
    return err;
  }
};
export const missedCallVerify = async data => {
  try {
    return sendRequest(data, 'POST', MISSED_CALL_VERIFY, {});
  } catch (err) {
    return err;
  }
};

export const logIn = async data => {
  try {
    return sendRequest(data, 'POST', LOG_IN, {});
  } catch (err) {
    return err;
  }
};


export const getUsers = () => {
  try {
    return getRequest();
  } catch (err) {
    return err;
  }
}
