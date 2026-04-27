import { appMeta } from "@/lib/domain";

export type MockAiResponse = {
  topic: string;
  result: string;
};

export async function runLocalAiAssistant(prompt: string): Promise<MockAiResponse> {
  const topic = prompt.trim().slice(0, 48) || appMeta.aiTitle;
  const modules = appMeta.modules.slice(0, 4).join("、");

  return {
    topic,
    result: [
      `工程问题：${topic}`,
      `建议从${modules}四个维度进行处理，并保留人工复核节点。`,
      "处理流程：先检索文档与图纸参数，再返回结构化答案并附来源页码。",
      "风险提示：若涉及高风险事项，应同步补充复核建议和责任岗位。",
    ].join("\n"),
  };
}

export function getMockIntegrationHealth() {
  return appMeta.integrations.map((service, index) => ({
    service,
    status: index === 0 ? "已采集" : index === 1 ? "已校验" : "持续更新",
    batch: `${service}·2026年第${index + 1}批`,
    quality: index === 0 ? "完整率 98%" : index === 1 ? "准确率 96%" : "抽检通过",
    detail:
      index === 0
        ? "已完成设计图纸资料核验，支持图纸参数查询和来源定位。"
        : index === 1
        ? "已完成评估文本和批文校验，支持知识问答和溯源展示。"
        : "会议纪要和合同资料持续更新，支持上下文追问与留痕管理。",
  }));
}
