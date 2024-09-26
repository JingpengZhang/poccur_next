export const Utils = {
  time(time = new Date()) {
    return new Date(time.getTime() - time.getTimezoneOffset() * 60000);
  },
};
