import { user_logged_in } from './constant';

export const userAuth = (data) => {
  console.warn("action has been called",data);
  return {
    type: user_logged_in,
    data: data,
  };
};
