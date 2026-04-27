import type { AnalysisView, ConsoleRoute, DashboardSnapshot, RouteMetric, WorkspaceView, WorkItemInput } from "@/lib/types";

export const appMeta = {
  seq: "63",
  title: "工程信息智能体",
  department: "市政建设第二指挥部",
  shortName: "工程信息中枢",
  description: "整合设计图纸、评估文本、政府批文、会议纪要等资料，提供工程知识问答、文档检索与图纸查阅的一体化管理后台。",
  modules: ["智能问答", "文档检索", "图纸查阅", "答案溯源", "多轮对话"],
  statuses: ["待解析", "解析中", "可问答", "已办结"],
  aiTitle: "工程知识助手",
  aiPrompt: "请结合当前工程资料，回答关键参数并给出来源文档和页码。",
  integrations: ["设计图纸资料库", "评估文本资料库", "政府批文资料库", "会议纪要资料库"],
  sourceObjectName: "工程资料",
  dataSourceTitle: "工程资料批次",
  aiExperience: {
    panelTag: "工程问答 / 图纸参数 / 文档溯源",
    objectLabel: "当前工程资料",
    emptyTitle: "请选择工程资料后发起智能问答",
    emptyDescription: "系统会结合文档内容与图纸参数返回答案，并附带来源文档、图号和页码。",
    resultType: "工程问答结论",
    savedStatusLabel: "已采纳",
    saveActionLabel: "采纳问答结论",
    saveEventAction: "采纳问答结论",
    generateEventAction: "生成工程问答",
    savedSuccessText: "问答结论已同步到工程资料台账。",
    stepTitles: ["读取工程资料", "检索关联文档", "生成问答结论", "等待采纳与留痕"],
    focusAreas: ["关键参数", "来源文档", "图纸定位", "上下文追问", "风险提示", "行动建议"],
    quickPrompts: [
      "清江路项目新开河河底标高是多少？",
      "拼宽桥桥梁高度是多少？",
      "请调阅清江路项目K2+340附近施工图纸。",
    ],
    resultFields: [
      { label: "资料类型", source: "category" },
      { label: "责任岗位", source: "owner" },
      { label: "风险等级", source: "riskLevel" },
      { label: "当前状态", source: "status" },
      { label: "来源批次", source: "sourceBatch" },
      { label: "结论摘要", source: "summary" },
    ],
  },
  prd: "63_市政建设第二指挥部_工程信息智能体_PRD.md",
  demand: "63_市政建设第二指挥部_工程信息智能体_需求文档.md",
} as const;

const docTypes = ["设计图纸", "评估文本", "政府批文", "会议纪要", "合同协议"] as const;

export const seedRecords = [
  {
    code: "SZJS2-2026-001",
    title: "清江路项目新开河横断面图",
    modelType: "设计图纸",
    industry: "清江路项目",
    region: "新开河段 K2+140~K2+460",
    status: "可问答",
    priority: "P1",
    riskLevel: "中",
    owner: "设计管理岗",
    analyst: "图纸工程师",
    description: "含新开河横断面、底标高、边坡与防护结构参数，可用于河道断面参数查询。",
    inputParams: "图号：QJ-PS-12；关键参数：河底标高、断面宽度、护坡坡比",
    outputResult: "河底标高 3.50m（85高程）；设计断面宽 12.0m；边坡 1:1.75。",
    prediction: "建议优先复核 K2+300~K2+360 区段地勘资料，避免断面参数偏差。",
    source: "设计图纸资料库",
    sourceType: "工程资料",
    sourceTitle: "清江路工程施工图-排水工程图-新开河横断面图",
    sourceBatch: "清江路资料批次·2026年第1批",
    dueDateOffsetDays: 5,
  },
  {
    code: "SZJS2-2026-002",
    title: "拼宽桥结构立面参数",
    modelType: "设计图纸",
    industry: "拼宽桥项目",
    region: "桥梁主跨",
    status: "可问答",
    priority: "P1",
    riskLevel: "高",
    owner: "桥梁专业岗",
    analyst: "结构工程师",
    description: "包含拼宽桥桥梁高度、梁底净空、桩基编号与主跨尺寸。",
    inputParams: "图号：PWQ-Q-03；参数：桥梁高度、主跨、梁底净空",
    outputResult: "桥梁高度 8.5m；主跨 32m；梁底净空 5.2m。",
    prediction: "高风险关注项：桥位区交通导改窗口短，需提前校核施工组织。",
    source: "设计图纸资料库",
    sourceType: "工程资料",
    sourceTitle: "拼宽桥设计图-立面图",
    sourceBatch: "拼宽桥资料批次·2026年第1批",
    dueDateOffsetDays: 4,
  },
  {
    code: "SZJS2-2026-003",
    title: "清江路项目环境影响评估报告",
    modelType: "评估文本",
    industry: "清江路项目",
    region: "全线",
    status: "解析中",
    priority: "P2",
    riskLevel: "中",
    owner: "前期审批岗",
    analyst: "评估专员",
    description: "用于核对施工期噪声控制、弃土消纳与水环境影响指标。",
    inputParams: "章节：4.2、5.1；指标：噪声、扬尘、排水",
    outputResult: "施工期昼间噪声限值 70dB；夜间 55dB；需设置沉淀池后排放。",
    prediction: "建议补充汛期临时排水应急预案并关联至会议纪要。",
    source: "评估文本资料库",
    sourceType: "工程资料",
    sourceTitle: "清江路项目环境影响评估报告（2026版）",
    sourceBatch: "评估资料批次·2026年第1批",
    dueDateOffsetDays: 7,
  },
  {
    code: "SZJS2-2026-004",
    title: "新开河改造可研批复",
    modelType: "政府批文",
    industry: "新开河改造",
    region: "河道治理段",
    status: "可问答",
    priority: "P2",
    riskLevel: "低",
    owner: "批文管理岗",
    analyst: "审批专员",
    description: "批复建设内容、总投资、工期与控制性节点，支撑手续校核。",
    inputParams: "文号：市发改投〔2026〕14号",
    outputResult: "总投资 4.82 亿元；计划工期 24 个月；节点含汛前导流完成。",
    prediction: "建议将批文工期节点与现场周计划做自动对照。",
    source: "政府批文资料库",
    sourceType: "工程资料",
    sourceTitle: "市发改委关于新开河改造工程可研批复",
    sourceBatch: "批文资料批次·2026年第1批",
    dueDateOffsetDays: 6,
  },
  {
    code: "SZJS2-2026-005",
    title: "周例会纪要（第18次）",
    modelType: "会议纪要",
    industry: "指挥部例会",
    region: "综合协调",
    status: "待解析",
    priority: "P3",
    riskLevel: "中",
    owner: "综合协调岗",
    analyst: "会务专员",
    description: "记录各标段进展、风险点与整改时限，可追溯责任人和完成状态。",
    inputParams: "会议日期：2026-04-22；主题：施工图会审与现场协调",
    outputResult: "形成 9 项任务清单，2 项高风险事项需 48 小时内复核。",
    prediction: "建议追加图纸会审纪要关联，增强问题追溯链路。",
    source: "会议纪要资料库",
    sourceType: "工程资料",
    sourceTitle: "市政二指周例会纪要（第18次）",
    sourceBatch: "会议纪要批次·2026年第4批",
    dueDateOffsetDays: 3,
  },
  {
    code: "SZJS2-2026-006",
    title: "滨河段施工组织设计",
    modelType: "合同协议",
    industry: "滨河段标段",
    region: "K1+000~K1+820",
    status: "解析中",
    priority: "P2",
    riskLevel: "中",
    owner: "施工管理岗",
    analyst: "计划工程师",
    description: "含施工顺序、资源配置和关键工序计划，关联合同约束条款。",
    inputParams: "版本：V3.1；关键节点：围堰、导流、桩基",
    outputResult: "围堰施工计划 18 天；导流切换窗口 6 小时；桩基日均 8 根。",
    prediction: "雨季窗口收窄，建议将围堰节点提前 3 天并增加夜班储备。",
    source: "合同协议资料库",
    sourceType: "工程资料",
    sourceTitle: "滨河段施工组织设计与实施协议",
    sourceBatch: "合同资料批次·2026年第2批",
    dueDateOffsetDays: 8,
  },
  {
    code: "SZJS2-2026-007",
    title: "清江路项目问答留痕（河底标高）",
    modelType: "知识问答",
    industry: "清江路项目",
    region: "新开河段",
    status: "已办结",
    priority: "P2",
    riskLevel: "低",
    owner: "资料管理员",
    analyst: "工程知识助手",
    description: "问：清江路项目新开河河底标高是多少？答：3.50m（85高程），来源第12页。",
    inputParams: "问题类型：参数查询",
    outputResult: "命中文档：清江路工程施工图-排水工程图-新开河横断面图；页码：12。",
    prediction: "可继续追问断面宽度、护坡坡比等关联参数。",
    source: "工程问答会话",
    sourceType: "工程资料",
    sourceTitle: "问答会话#QJ-2026-04-001",
    sourceBatch: "问答留痕批次·2026年第2批",
    dueDateOffsetDays: 2,
  },
  {
    code: "SZJS2-2026-008",
    title: "拼宽桥项目问答留痕（桥梁高度）",
    modelType: "知识问答",
    industry: "拼宽桥项目",
    region: "主桥立面",
    status: "可问答",
    priority: "P1",
    riskLevel: "高",
    owner: "桥梁专业岗",
    analyst: "工程知识助手",
    description: "问：拼宽桥桥梁高度是多少？答：8.5m，来源图号 Q-03。",
    inputParams: "问题类型：图纸参数",
    outputResult: "命中文档：拼宽桥设计图-立面图；图号：Q-03；页码：6。",
    prediction: "建议追加净空限制与交通导改时段联动提醒。",
    source: "工程问答会话",
    sourceType: "工程资料",
    sourceTitle: "问答会话#PWQ-2026-04-002",
    sourceBatch: "问答留痕批次·2026年第2批",
    dueDateOffsetDays: 1,
  },
  {
    code: "SZJS2-2026-009",
    title: "北岸泵站总平面图",
    modelType: "设计图纸",
    industry: "北岸泵站项目",
    region: "泵房与出水渠",
    status: "待解析",
    priority: "P2",
    riskLevel: "中",
    owner: "机电专业岗",
    analyst: "图纸工程师",
    description: "用于调阅泵站布置、设备编号和出水渠标高信息。",
    inputParams: "图号：BZ-PS-01",
    outputResult: "泵房布置 4 用 1 备；设计出水渠底标高 2.85m。",
    prediction: "建议同步导入机电设备参数表，提升检索完整率。",
    source: "设计图纸资料库",
    sourceType: "工程资料",
    sourceTitle: "北岸泵站施工图-总平面图",
    sourceBatch: "泵站资料批次·2026年第1批",
    dueDateOffsetDays: 9,
  },
  {
    code: "SZJS2-2026-010",
    title: "项目档案交付清单（一期）",
    modelType: "合同协议",
    industry: "项目档案",
    region: "一期工程",
    status: "已办结",
    priority: "P3",
    riskLevel: "低",
    owner: "档案管理岗",
    analyst: "资料管理员",
    description: "记录档案移交目录、签收时间与缺失项闭环状态。",
    inputParams: "交付批次：一期移交",
    outputResult: "共 162 份资料，缺失项 4 份，已闭环 4 份。",
    prediction: "可作为后续知识库质量评估基线。",
    source: "合同协议资料库",
    sourceType: "工程资料",
    sourceTitle: "一期工程档案交付与签收协议",
    sourceBatch: "档案资料批次·2026年第1批",
    dueDateOffsetDays: 2,
  },
] as const;

export const seedInsights = [
  { title: "文档完整率", value: "96%", trend: "up", level: "success" },
  { title: "问答命中率", value: "89%", trend: "steady", level: "warning" },
  { title: "高风险事项", value: "3项", trend: "down", level: "processing" },
] as const;

export const consoleRoutes: ConsoleRoute[] = [
  {
    key: "dashboard",
    slug: "dashboard",
    path: "/dashboard",
    title: "智能体首页",
    description: "聚合工程资料总览、近期动态和关键洞察。",
    kind: "dashboard",
  },
  {
    key: "documents",
    slug: "documents",
    path: "/documents",
    title: "文档检索",
    description: "管理文档台账、检索条件和解析状态。",
    kind: "workspace",
  },
  {
    key: "drawings",
    slug: "drawings",
    path: "/drawings",
    title: "图纸查阅",
    description: "查看图纸列表、关键参数和关联来源。",
    kind: "workspace",
  },
  {
    key: "qa",
    slug: "qa",
    path: "/qa",
    title: "知识问答",
    description: "维护问题台账并跟踪问答状态。",
    kind: "workspace",
  },
  {
    key: "trace",
    slug: "trace",
    path: "/trace",
    title: "答案溯源",
    description: "查看问答来源、引用依据和处理留痕。",
    kind: "analysis",
  },
  {
    key: "assistant",
    slug: "assistant",
    path: "/assistant",
    title: appMeta.aiTitle,
    description: "通过多轮对话查询工程参数并返回来源依据。",
    kind: "assistant",
  },
  {
    key: "users",
    slug: "users",
    path: "/users",
    title: "用户管理",
    description: "维护后台用户、角色分工和账号状态。",
    kind: "users",
  },
  {
    key: "audit-logs",
    slug: "audit-logs",
    path: "/audit-logs",
    title: "日志审计",
    description: "查看资料变更、问答动作和系统审计记录。",
    kind: "auditLogs",
  },
  {
    key: "settings",
    slug: "settings",
    path: "/settings",
    title: "系统设置",
    description: "维护检索阈值、提醒策略和智能问答开关。",
    kind: "settings",
  },
] as const;

const workspaceFieldMap = {
  documents: [
    { key: "title", label: "文档名称", placeholder: "例如：清江路工程施工图-排水工程图", required: true },
    { key: "modelType", label: "文档类型", type: "select", options: docTypes, required: true },
    { key: "industry", label: "所属项目", placeholder: "例如：清江路项目", required: true },
    { key: "region", label: "区域/标段", placeholder: "例如：K2+140~K2+460", required: true },
    { key: "owner", label: "责任岗位", placeholder: "例如：资料管理员", required: true },
    { key: "inputParams", label: "文档摘要", type: "textarea", placeholder: "填写文档核心内容和检索关键词", required: true },
  ],
  drawings: [
    { key: "title", label: "图纸名称", placeholder: "例如：拼宽桥设计图-立面图", required: true },
    { key: "region", label: "图纸区域", placeholder: "例如：主桥立面", required: true },
    { key: "owner", label: "责任岗位", placeholder: "例如：桥梁专业岗", required: true },
    { key: "riskLevel", label: "风险等级", type: "select", options: ["高", "中", "低"], required: true },
    { key: "outputResult", label: "关键参数", type: "textarea", placeholder: "例如：桥梁高度 8.5m，图号 Q-03", required: true },
  ],
  qa: [
    { key: "title", label: "问题主题", placeholder: "例如：清江路项目新开河河底标高", required: true },
    { key: "owner", label: "提问岗位", placeholder: "例如：施工管理岗", required: true },
    { key: "riskLevel", label: "问题级别", type: "select", options: ["高", "中", "低"], required: true },
    { key: "outputResult", label: "问答摘要", type: "textarea", placeholder: "填写回答结论与参数值", required: true },
    { key: "prediction", label: "来源依据", type: "textarea", placeholder: "填写来源文档、页码、图号等", required: true },
  ],
} as const;

function routeMetrics(snapshot: DashboardSnapshot, rows = snapshot.items): RouteMetric[] {
  const finalStatus = appMeta.statuses.at(-1);
  const openCount = rows.filter((item) => item.status !== finalStatus).length;
  const highRisk = rows.filter((item) => item.riskLevel === "高").length;
  const completedCount = rows.filter((item) => item.status === finalStatus).length;

  return [
    { label: "资料总数", value: rows.length, helper: "当前视图中的工程资料条目", tone: "default" },
    { label: "高风险", value: highRisk, helper: "需重点复核的高风险事项", tone: highRisk > 0 ? "danger" : "success" },
    { label: "处理中", value: openCount, helper: "仍在解析或问答中的资料", tone: openCount > 0 ? "warning" : "success" },
    { label: "已办结", value: completedCount, helper: "已完成处理并归档的资料", tone: "success" },
  ];
}

function sortedRows(rows: DashboardSnapshot["items"]) {
  return rows.slice().sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function byCategories(snapshot: DashboardSnapshot, categories: string[]) {
  return sortedRows(snapshot.items.filter((item) => categories.includes(item.category)));
}

export function getRouteBySlug(slug?: string) {
  const target = slug?.trim() ? slug : "dashboard";
  return consoleRoutes.find((route) => route.slug === target);
}

export function getRouteByKey(key: string) {
  return consoleRoutes.find((route) => route.key === key);
}

export function buildWorkItemInput(routeKey: string, values: Record<string, string>): WorkItemInput {
  if (routeKey === "documents") {
    const documentType = values.modelType || "设计图纸";
    const project = values.industry || "清江路项目";

    return {
      title: values.title?.trim() || "待补充文档",
      category: documentType,
      owner: values.owner?.trim() || "资料管理员",
      riskLevel: "中",
      description: `项目：${project}；区域：${values.region || "未填写"}；摘要：${values.inputParams?.trim() || "待补充"}`,
    };
  }

  if (routeKey === "drawings") {
    return {
      title: values.title?.trim() || "待补充图纸",
      category: "设计图纸",
      owner: values.owner?.trim() || "图纸工程师",
      riskLevel: values.riskLevel || "中",
      description: `图纸区域：${values.region || "未填写"}；关键参数：${values.outputResult?.trim() || "待补充"}`,
    };
  }

  return {
    title: values.title?.trim() || "待补充问答主题",
    category: "知识问答",
    owner: values.owner?.trim() || "工程知识助手",
    riskLevel: values.riskLevel || "中",
    description: `问答摘要：${values.outputResult?.trim() || "待补充"}；来源依据：${values.prediction?.trim() || "待补充"}`,
  };
}

export function getWorkspaceView(routeKey: string, snapshot: DashboardSnapshot): WorkspaceView {
  if (routeKey === "documents") {
    const rows = byCategories(snapshot, [...docTypes]).slice(0, 12);
    return {
      title: "文档检索",
      description: "管理工程文档台账，支持按类型、项目和区域进行检索。",
      metrics: routeMetrics(snapshot, rows),
      formTitle: "新增文档",
      submitLabel: "新增文档",
      fields: [...workspaceFieldMap.documents],
      columns: [
        { key: "code", label: "文档编号", width: 140 },
        { key: "title", label: "文档名称", width: 280, kind: "summary" },
        { key: "modelType", label: "文档类型", width: 120, kind: "tag" },
        { key: "industry", label: "所属项目", width: 140 },
        { key: "region", label: "区域/标段", width: 180 },
        { key: "status", label: "解析状态", width: 100, kind: "badge" },
      ],
      rows,
      emptyDescription: "暂无文档记录，可通过上方表单新增。",
      actions: [
        { key: "advance", label: "推进状态", disabledWhenFinal: true },
        {
          key: "delete",
          label: "删除",
          danger: true,
          confirmTitle: "确认删除该文档记录？",
          confirmText: "删除后将同步移除关联问答和检索留痕，请谨慎操作。",
        },
      ],
      timelineTitle: "文档入库流程",
      timeline: [
        { title: "资料登记", description: "登记文档名称、类型、项目和区域信息。" },
        { title: "智能解析", description: "抽取关键参数并建立检索索引。" },
        { title: "知识可用", description: "文档进入可问答状态并支持溯源。" },
      ],
    };
  }

  if (routeKey === "drawings") {
    const rows = sortedRows(snapshot.items.filter((item) => item.category === "设计图纸")).slice(0, 12);
    return {
      title: "图纸查阅",
      description: "查看图纸列表、关键参数与图号来源信息。",
      metrics: routeMetrics(snapshot, rows),
      formTitle: "新增图纸条目",
      submitLabel: "新增图纸",
      fields: [...workspaceFieldMap.drawings],
      columns: [
        { key: "code", label: "图纸编号", width: 140 },
        { key: "title", label: "图纸名称", width: 240, kind: "summary" },
        { key: "region", label: "图纸区域", width: 180 },
        { key: "riskLevel", label: "风险等级", width: 100, kind: "tag" },
        { key: "owner", label: "责任岗位", width: 120 },
        { key: "status", label: "查阅状态", width: 100, kind: "badge" },
      ],
      rows,
      emptyDescription: "暂无图纸条目，请先新增或导入图纸资料。",
      actions: [{ key: "advance", label: "推进状态", disabledWhenFinal: true }],
      timelineTitle: "图纸查阅流程",
      timeline: [
        { title: "图纸入库", description: "登记图号、区域和版本信息。" },
        { title: "参数提取", description: "抽取桥梁高度、标高、桩号等关键参数。" },
        { title: "图纸定位", description: "支持问答结果定位到图号和页码。" },
      ],
    };
  }

  const rows = sortedRows(snapshot.items.filter((item) => item.category === "知识问答")).slice(0, 12);
  return {
    title: "知识问答",
    description: "维护工程问答台账，沉淀问题、答案与来源依据。",
    metrics: routeMetrics(snapshot, rows),
    formTitle: "新增问答记录",
    submitLabel: "新增问答",
    fields: [...workspaceFieldMap.qa],
    columns: [
      { key: "code", label: "问答编号", width: 140 },
      { key: "title", label: "问题主题", width: 240, kind: "summary" },
      { key: "status", label: "问答状态", width: 100, kind: "badge" },
      { key: "riskLevel", label: "问题级别", width: 100, kind: "tag" },
      { key: "owner", label: "提问岗位", width: 120 },
      { key: "sourceTitle", label: "来源会话", width: 220 },
    ],
    rows,
    emptyDescription: "暂无问答台账，请先在智能助手页发起问答。",
    actions: [
      { key: "advance", label: "推进状态", disabledWhenFinal: true },
      {
        key: "delete",
        label: "删除",
        danger: true,
        confirmTitle: "确认删除该问答记录？",
        confirmText: "删除后将同步移除对应会话留痕，请确认无需保留。",
      },
    ],
    timelineTitle: "问答处理流程",
    timeline: [
      { title: "问题提出", description: "提交参数问题或图纸调阅诉求。" },
      { title: "答案生成", description: "返回结构化结论并附来源文档与页码。" },
      { title: "结果采纳", description: "采纳后写入台账并进入可追溯状态。" },
    ],
  };
}

export function getAnalysisView(snapshot: DashboardSnapshot): AnalysisView {
  const typeStats = snapshot.items.reduce((acc, item) => {
    const category = item.category || "其他";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statsRows = Object.entries(typeStats).map(([category, count]) => ({
    type: category,
    count: String(count),
    focus: count >= 3 ? "重点跟踪" : "常规维护",
    note: category === "设计图纸" ? "建议持续补全参数字段" : "建议补全来源定位信息",
  }));

  return {
    title: "答案溯源",
    description: "按资料类型查看问答命中与来源留痕，确保答案可解释、可追踪。",
    metrics: routeMetrics(snapshot),
    highlights: [
      "关键参数类问题应优先返回图号和页码。",
      "高风险问答建议附带复核建议和责任岗位。",
      "会议纪要与批文建议建立双向关联，提升追溯效率。",
    ],
    tables: [
      {
        title: "资料类型分布",
        columns: [
          { key: "type", label: "资料类型" },
          { key: "count", label: "数量" },
          { key: "focus", label: "关注等级" },
          { key: "note", label: "处理建议" },
        ],
        rows: statsRows,
      },
      {
        title: "近期处理留痕",
        columns: [
          { key: "action", label: "动作" },
          { key: "content", label: "处理内容" },
          { key: "actor", label: "处理人" },
        ],
        rows: snapshot.events.slice(0, 8).map((event) => ({
          action: event.action,
          content: event.content,
          actor: event.actor,
        })),
      },
    ],
  };
}
