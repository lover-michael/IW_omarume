"use server";

import { TimeTableSchemaType } from "../module/formTypes";
import { SaveTimeTable } from "./action";

export const onSubmit = async (props: TimeTableSchemaType) => {
  // return await SaveTimeTable(props);
  console.log(props);
};
