export const getServerDateAsTime = (serverDate) => {
  try {
    return serverDate.split("T")[1].substring(0, 5);
  } catch (error) {
    return serverDate;
  }
};
