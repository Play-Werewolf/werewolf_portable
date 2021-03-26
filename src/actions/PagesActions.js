export const moveTo = (page) => {
  console.log("moving to", page);
  return {
    type: "CHANGE_PAGE",
    payload: page,
  };
};
