import { http } from "@/utils/http";
import type {
  ApifoxModel,
  Data,
  Cargoinformation,
  taskParamsType,
  taskResponseType,
} from "./types/task-type";

export const task = (taskParams: taskParamsType) => {
  return http<taskResponseType>({
    url: "/driver/tasks/list",
    method: "GET",
    data: taskParams,
  });
};
//任务详情
export const details = (jobId: string) => {
  return http<Data>({
    url: `/driver/tasks/details/${jobId}`,
    method: "GET",
  });
};
//货物信息
export const orders = (taskOrder: ApifoxModel) => {
  return http<Cargoinformation>({
    url: "/driver/tasks/orders",
    method: "GET",
    data: taskOrder,
  });
};
