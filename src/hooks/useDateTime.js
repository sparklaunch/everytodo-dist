const useDateTime = () => {
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);
  let createDate = year + month + day;
  return createDate;
};

export default useDateTime;
