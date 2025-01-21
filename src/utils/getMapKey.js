import { apiStem } from "./variables";
import axios from "axios";

export const getMapKey = async (id) => {
  try {
    const result = await axios.get(`${apiStem}/mapping/${id}`);
    return result;
  } catch (err) {
    console.log(err);
  }
};

// module.exports = getMapKey;
