export function createFeedback(category: string) {
  return `${category}已创建，基础信息和检索字段已同步到资料台账`;
}

export function advanceFeedback(status: string) {
  return `处理状态已推进至${status}，留痕信息已更新`;
}

export function deleteFeedback(category: string) {
  return `${category}记录已删除，相关统计已刷新`;
}

export function aiFeedback(source: "glm" | "local") {
  return source === "glm" ? "智能问答结果已生成，可继续追问或直接采纳" : "问答初稿已生成，可补充追问后再采纳";
}
