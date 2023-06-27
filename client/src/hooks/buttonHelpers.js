export const isInvited = (userId, friendObj) => {
    let found = 0;
    friendObj.friendsList.forEach((obj) => {
    if (
      obj.sender == userId &&
      obj.receiver == friendObj._id &&
      obj.friendshipStatus == "received"
    ) {
      found = 1
    }
  });
  if(found != 0){
    return true
  }else{
    return false
  }
};

export const isAccepted = (userId,friendObj) => {
    let accepted = false
    friendObj.friendsList.forEach((obj) => {
    if (
      obj.sender == userId &&
      obj.receiver == friendObj._id &&
      obj.friendshipStatus == "accepted"
    ) {
      accepted = true
    }
  });
  if(accepted){
    return true
  }else{
    return false
  }
}

export const isDeclined = (userId,friendObj) => {
    let declined = false
    friendObj.friendsList.forEach((obj) => {
    if (
      obj.sender == userId &&
      obj.receiver == friendObj._id &&
      obj.friendshipStatus == "declined"
    ) {
      declined = true
    }
  });
  if(declined){
    return true
  }else{
    return false
  }
}
