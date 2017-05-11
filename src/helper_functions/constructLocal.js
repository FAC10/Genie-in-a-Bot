

function constructLocal(senderID, key, answerObjects) {
  const messageData = {
    recipient: {
      id: senderID,
    },
    message: answerObjects[key],
  };
  console.log('messageData in construcyLocal is ', messageData);
  return messageData;
}

module.exports = constructLocal;
