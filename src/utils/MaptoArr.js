import { STATECODES } from "./config/States";

export const tabledatatoarr = data => {
  const fullData = [];
  for (let obj in data) {
    const statedata = {
      id: obj,
      name: STATECODES[ obj ],
      data: data[ obj ]
    }
    fullData.push(statedata);
  }
  return fullData;
}
