export const getServerDateAsTime = (serverDate) => {
  try {
    return serverDate.split("T")[1].substring(0, 8);
  } catch (error) {
    return serverDate;
  }
};
