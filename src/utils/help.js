function getARandomImageName() {
  const prefix = "user_";
  const randomNum = Math.random();
  return prefix + randomNum;
}

export { getARandomImageName };
