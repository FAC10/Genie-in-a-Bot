

function constructLocal(senderID, key, answerObjects) {
  const messageData = {
    recipient: {
      id: senderID,
    },
    message: answerObjects[key],
  };
  if (messageData.message.attachment) {
    console.log('messageData in constructLocal is ', messageData.message.attachment.payload);
  }
  return messageData;
}

module.exports = constructLocal;
