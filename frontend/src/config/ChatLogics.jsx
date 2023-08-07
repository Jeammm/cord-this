export const getSender = (loggedUser, users) => {
  if (!loggedUser) return;
  return users[0]._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getUserFull = (loggedUser, users) => {
  if (!loggedUser) return;
  return users[0]._id === loggedUser?._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i > 0 &&
    (messages[i - 1].sender._id !== m.sender._id ||
      messages[i - 1].sender._id === undefined)
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === 0 &&
    messages[0].sender._id
  );
};
