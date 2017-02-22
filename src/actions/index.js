export const emailChanges = (text) => {
  return {
    type: 'email_changed',
    payload: text
  };
};