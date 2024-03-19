import type { responseProfileType } from "./types/message-type";
import { http } from "@/utils/http";

export type messageType = {
  contentType: number;
  page: number;
  pageSize: number;
};
//分页查询列表
export const message = (messageParams: messageType) => {
  return http<responseProfileType>({
    url: "/driver/messages/page",
    method: "GET",
    data: messageParams,
  });
};
//根据类型查询未读消息列表
export const countType = (contentType: number) => {
  return http<number>({
    url: `/driver/messages/countType/${contentType}`,
    method: "GET",
  });
};
//全部已读接口
export const readAll = (contentType: number) => {
  return http({
    url: `/driver/messages/readAll/${contentType}`,
    method: "PUT",
  });
};
//标记已读
export const messagesApi = (id: string | number) => {
  return http({
    url: `/driver/messages/${id}`,
    method: "PUT",
  });
};
