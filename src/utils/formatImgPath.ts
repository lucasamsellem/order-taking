const formatImgPath = (str: string) => {
  return str
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('-');
};

export default formatImgPath;
