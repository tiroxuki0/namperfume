import fs from 'fs'

export const getAllPages = () => {
  return fs.readdirSync("./containers");
};
