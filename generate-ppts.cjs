const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'ppts');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const COLORS = {
  ikb: '#0068B8',
  lemon: '#FFE135',
  lemonGreen: '#7CB342',
  safetyOrange: '#FF6B35',
  dark: '#1A1A1A',
  gray: '#6B7280',
  lightGray: '#F3F4F6',
  white: '#FFFFFF',
  grid: '#E5E7EB',
};

const SWISS_CSS = `
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap');
  :root { --ikb:${COLORS.ikb}; --lemon:${COLORS.lemon}; --lemon-green:${COLORS.lemonGreen}; --safety-orange:${COLORS.safetyOrange}; --dark:${COLORS.dark}; --gray:${COLORS.gray}; --light-gray:${COLORS.lightGray}; --grid:${COLORS.grid}; }
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:100%; height:100%; overflow:hidden; font-family:'Inter',-apple-system,sans-serif; background:var(--light-gray); color:var(--dark); -webkit-font-smoothing:antialiased; }
  body::before { content:''; position:fixed; inset:0; background-image:radial-gradient(circle,var(--grid) 1px,transparent 1px); background-size:24px 24px; pointer-events:none; z-index:0; }
  .deck { display:flex; width:100vw; height:100vh; overflow-x:auto; overflow-y:hidden; scroll-snap-type:x mandatory; scroll-behavior:smooth; scrollbar-width:none; position:relative; z-index:1; }
  .deck::-webkit-scrollbar { display:none; }
  .slide { flex:0 0 100vw; height:100vh; scroll-snap-align:start; display:flex; flex-direction:column; padding:60px 80px; position:relative; overflow:hidden; background:var(--white); border-right:2px solid var(--grid); }
  .slide-num { position:absolute; top:24px; right:32px; font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:500; color:var(--gray); letter-spacing:0.05em; }
  .slide.section-divider { background:var(--ikb); color:var(--white); }
  .slide.section-divider .slide-num { color:rgba(255,255,255,0.5); }
  .slide.section-divider .accent-bar { background:var(--lemon); }
  .slide.title-slide { background:var(--ikb); color:var(--white); justify-content:center; align-items:flex-start; padding:80px; }
  .slide.title-slide .slide-num { color:rgba(255,255,255,0.4); }
  .slide.title-slide .module-tag { font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:0.15em; text-transform:uppercase; color:var(--lemon); margin-bottom:24px; display:block; }
  .slide.title-slide h1 { font-size:clamp(36px,5vw,64px); font-weight:800; line-height:1.1; letter-spacing:-0.02em; margin-bottom:24px; max-width:800px; }
  .slide.title-slide .subtitle { font-size:18px; font-weight:400; color:rgba(255,255,255,0.7); max-width:560px; line-height:1.6; }
  .slide.title-slide .module-num { position:absolute; bottom:60px; right:80px; font-family:'JetBrains Mono',monospace; font-size:120px; font-weight:900; color:rgba(255,255,255,0.06); line-height:1; }
  .slide-header { margin-bottom:28px; flex-shrink:0; }
  .accent-bar { width:48px; height:4px; background:var(--lemon); margin-bottom:16px; }
  .slide-title { font-size:clamp(22px,2.5vw,32px); font-weight:700; letter-spacing:-0.01em; color:var(--dark); line-height:1.2; }
  .slide-subtitle { font-size:14px; color:var(--gray); margin-top:6px; font-weight:400; }
  .slide-body { flex:1; overflow-y:auto; scrollbar-width:thin; scrollbar-color:var(--grid) transparent; }
  .slide-body::-webkit-scrollbar { width:4px; }
  .slide-body::-webkit-scrollbar-track { background:transparent; }
  .slide-body::-webkit-scrollbar-thumb { background:var(--grid); border-radius:2px; }
  .two-col { display:grid; grid-template-columns:1fr 1fr; gap:32px; height:100%; }
  .three-col { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; height:100%; }
  .three-col .col, .two-col .col { display:flex; flex-direction:column; gap:12px; }
  .card { background:var(--light-gray); border:1px solid var(--grid); border-radius:8px; padding:18px 20px; display:flex; flex-direction:column; gap:8px; }
  .card.highlight { border-left:4px solid var(--lemon); background:#FFFEF5; }
  .card.warning { border-left:4px solid var(--safety-orange); background:#FFF8F5; }
  .card.info { border-left:4px solid var(--ikb); background:#F0F7FF; }
  .card.green { border-left:4px solid var(--lemon-green); background:#F5FBF0; }
  .card-label { font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:500; text-transform:uppercase; letter-spacing:0.1em; color:var(--gray); }
  .card-title { font-size:15px; font-weight:600; color:var(--dark); line-height:1.4; }
  .card-body { font-size:13px; color:var(--gray); line-height:1.6; }
  .big-stat { font-family:'JetBrains Mono',monospace; font-size:48px; font-weight:800; color:var(--ikb); line-height:1; }
  .big-stat-label { font-size:13px; color:var(--gray); margin-top:4px; }
  .swiss-table { width:100%; border-collapse:collapse; font-size:13px; }
  .swiss-table th { background:var(--ikb); color:var(--white); font-weight:600; text-align:left; padding:10px 14px; font-size:12px; letter-spacing:0.02em; }
  .swiss-table td { padding:10px 14px; border-bottom:1px solid var(--grid); color:var(--dark); vertical-align:top; line-height:1.5; }
  .swiss-table tr:last-child td { border-bottom:none; }
  .swiss-table tr:nth-child(even) td { background:var(--light-gray); }
  .code-block { background:var(--dark); color:#E5E7EB; border-radius:8px; padding:14px 18px; font-family:'JetBrains Mono',monospace; font-size:12px; line-height:1.7; overflow-x:auto; margin:6px 0; white-space:pre-wrap; word-break:break-all; }
  .quote { font-size:20px; font-weight:600; color:var(--dark); line-height:1.5; border-left:4px solid var(--lemon); padding-left:20px; margin:14px 0; }
  .flow { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .flow-step { background:var(--light-gray); border:1px solid var(--grid); border-radius:6px; padding:10px 16px; font-size:13px; font-weight:500; color:var(--dark); }
  .flow-arrow { font-size:18px; color:var(--ikb); font-weight:700; }
  .summary-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }
  .summary-item { background:var(--light-gray); border:1px solid var(--grid); border-radius:8px; padding:14px 18px; display:flex; flex-direction:column; gap:6px; }
  .summary-item .num { font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--ikb); font-weight:600; }
  .summary-item .text { font-size:13px; color:var(--dark); line-height:1.5; }
  .checklist { display:flex; flex-direction:column; gap:8px; }
  .checklist-item { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:var(--dark); line-height:1.5; }
  .check-icon { flex-shrink:0; width:18px; height:18px; border:2px solid var(--grid); border-radius:4px; margin-top:1px; }
  .check-icon.checked { background:var(--lemon-green); border-color:var(--lemon-green); position:relative; }
  .check-icon.checked::after { content:'✓'; position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:11px; color:white; font-weight:700; }
  .nav-hint { position:fixed; bottom:20px; left:50%; transform:translateX(-50%); font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--gray); background:rgba(255,255,255,0.9); padding:6px 14px; border-radius:20px; border:1px solid var(--grid); z-index:100; pointer-events:none; }
  .progress-bar { position:fixed; top:0; left:0; height:3px; background:var(--lemon); z-index:100; transition:width 0.3s ease; }
  .module-label { font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:var(--gray); margin-bottom:8px; }
  .divider { width:100%; height:1px; background:var(--grid); margin:14px 0; }
  .tag { display:inline-block; font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:500; padding:3px 8px; border-radius:4px; letter-spacing:0.05em; }
  .tag.blue { background:#DBEAFE; color:var(--ikb); }
  .tag.yellow { background:#FEF9C3; color:#92400E; }
  .tag.green { background:#D1FAE5; color:#065F46; }
  .tag.orange { background:#FED7AA; color:#9A3412; }
</style>`;

const MODULES = [
  {
    id: 'module-1',
    name: '模块一',
    subtitle: '认识 Codex',
    color: COLORS.ikb,
    slides: [
      { type: 'title', title: '认识 Codex', subtitle: '让 AI 帮你搞定编程与办公', moduleTag: 'MODULE 01 — 认识 Codex' },
      { type: 'section', title: '第 1 课', subtitle: 'AI 编程助手是什么？' },
      { type: 'content', title: 'AI 编程助手 vs 聊天机器人',
        body: `<div class="two-col">
          <div class="col">
            <div class="card info">
              <div class="card-label">聊天机器人</div>
              <div class="card-title">只能"聊"，不能"干"</div>
              <div class="card-body">你问它问题，它给你文字回复。你可以让它写代码片段，但代码能不能跑、怎么跑、在哪里跑——它不管。</div>
            </div>
            <div class="card">
              <div class="card-label">局限性</div>
              <div class="card-body" style="line-height:2;">
                <div>❌ 不能读你的项目文件</div>
                <div>❌ 不能运行代码并调试</div>
                <div>❌ 不能操作电脑上的文件</div>
                <div>❌ 不能完成完整任务</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">AI 编程助手（Codex）</div>
              <div class="card-title">能"聊"也能"干"的智能体</div>
              <div class="card-body">不仅回答你的问题，还能直接操作你的文件和系统，完成从需求到交付的全过程。</div>
            </div>
            <div class="card green">
              <div class="card-label">核心能力</div>
              <div class="card-body" style="line-height:2;">
                <div>✅ 读你的项目文件</div>
                <div>✅ 运行代码并调试</div>
                <div>✅ 操作电脑上的文件</div>
                <div>✅ 调用外部工具</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: 'Codex 到底是什么？',
        body: `<div class="two-col">
          <div class="col">
            <div class="card highlight">
              <div class="card-label">核心定义</div>
              <div class="card-title" style="font-size:17px;">Codex 是 OpenAI 推出的 AI 编程智能体（coding agent）</div>
            </div>
            <div class="card">
              <div class="card-label">两个关键词</div>
              <div class="card-body" style="line-height:2;">
                <div><strong>编程</strong> — 核心能力围绕代码展开：写代码、改代码、调试代码、解释代码</div>
                <div><strong>智能体</strong> — 不是被动回答问题的工具，而是能主动执行任务的"助手"</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="quote">"你不需要教它编程知识，你只需要告诉它你要什么。"</div>
            <div class="card green">
              <div class="card-label">类比：Codex = 会编程的实习生</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 你告诉它要做什么（用自然语言）</div>
                <div>📌 它自己去读相关文件、写代码、运行测试</div>
                <div>📌 发现问题 → 修正错误 → 把成果交给你</div>
              </div>
            </div>
            <div class="card info">
              <div class="card-label">另一个类比</div>
              <div class="card-title">Codex = 万能秘书</div>
              <div class="card-body">整理文件、搜索资料、写邮件、做表格，额外还会写代码。</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: 'Codex vs GitHub Copilot',
        body: `<div class="two-col">
          <div class="col">
            <div class="card warning">
              <div class="card-label">GitHub Copilot</div>
              <div class="card-title">代码补全工具 — 给程序员用的"辅助轮"</div>
              <div class="card-body">在编辑器里打字，它帮你补全下一行代码。需要至少看得懂代码。</div>
            </div>
            <div class="card">
              <div class="card-label">工作位置</div>
              <div class="card-title">VS Code 等代码编辑器内</div>
            </div>
            <div class="card">
              <div class="card-label">任务粒度</div>
              <div class="card-title">单行 / 单函数级别</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">Codex</div>
              <div class="card-title">完整任务智能体 — 给普通人用的"自动驾驶"</div>
              <div class="card-body">你告诉它"帮我做一个网页"，它会自己读文件、写代码、保存文件，独立完成全过程。</div>
            </div>
            <div class="card green">
              <div class="card-label">工作位置</div>
              <div class="card-title">独立桌面 App / 命令行</div>
            </div>
            <div class="card info">
              <div class="card-label">任务粒度</div>
              <div class="card-title">完整功能 / 完整项目</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '生活中的类比',
        body: `<div class="three-col">
          <div class="col">
            <div class="card highlight">
              <div class="card-label">类比一</div>
              <div class="card-title">Codex = 会编程的实习生</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 你告诉它要做什么（用自然语言）</div>
                <div>📌 它自己去读相关文件、写代码、运行测试</div>
                <div>📌 发现问题 → 修正错误 → 把成果交给你</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card info">
              <div class="card-label">类比二</div>
              <div class="card-title">Codex = 万能秘书</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 整理文件（按类型、日期分类）</div>
                <div>📌 搜索资料（上网查资料并整理成报告）</div>
                <div>📌 写邮件、做表格，额外还会写代码</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card green">
              <div class="card-label">类比三</div>
              <div class="card-title">Codex = 乐高积木 + 说明书</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 传统方式：你自己一块一块拼</div>
                <div>📌 Codex 方式：你告诉它"我要一个城堡"</div>
                <div>📌 它帮你拼好，你只管验收</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'section', title: '第 2 课', subtitle: 'Codex 能帮你做什么？' },
      { type: 'content', title: '编程开发案例',
        body: `<div class="three-col">
          <div class="col">
            <div class="card">
              <div class="card-label">案例 1：修 Bug</div>
              <div class="card-body" style="font-size:12px;">把报错信息和代码拖进 Codex，说"帮我找原因并修复"，30 秒得到修复方案。</div>
            </div>
            <div class="card highlight">
              <div class="card-label">案例 2：从零到网页</div>
              <div class="card-body" style="font-size:12px;">告诉 Codex 产品功能，自动生成完整 HTML，30 分钟替代几天的前端工作。</div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-label">案例 3：重构代码</div>
              <div class="card-body" style="font-size:12px;">把混乱的脚本拖进去，Codex 拆分函数、加注释、写文档。</div>
            </div>
            <div class="card green">
              <div class="card-label">案例 4：Excel 分析</div>
              <div class="card-body" style="font-size:12px;">拖入 Excel，Codex 用 Python 读取、分析、生成图表，2 小时变 5 分钟。</div>
            </div>
          </div>
          <div class="col">
            <div class="summary-grid" style="grid-template-columns:1fr;">
              <div class="summary-item">
                <div class="num">KEY</div>
                <div class="text">你不需要知道"索引越界"是什么，只需要告诉 Codex "出错了，帮我修"。</div>
              </div>
              <div class="summary-item">
                <div class="num">WHO</div>
                <div class="text">律师、招聘、运营、设计师、教师 — 非技术岗位也在用。</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '办公提效 & 日常任务',
        body: `<div class="two-col">
          <div class="col">
            <div class="card green">
              <div class="card-label">办公提效</div>
              <div class="card-title">整理杂乱的下载文件夹</div>
              <div class="card-body">把"下载"文件夹设为工作区，说"按文件类型分类"，5 分钟搞定几百个文件。</div>
            </div>
            <div class="card green">
              <div class="card-label">办公提效</div>
              <div class="card-title">生成会议纪要</div>
              <div class="card-body">把会议文字稿发给 Codex，自动生成结构化纪要：议题、讨论要点、待办任务。</div>
            </div>
            <div class="card green">
              <div class="card-label">办公提效</div>
              <div class="card-title">批量处理 Excel</div>
              <div class="card-body">拖入 Excel，Codex 分析数据并生成图表，2 小时工作变 5 分钟。</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">日常任务</div>
              <div class="card-title">整理照片 · 分析磁盘空间 · 翻译文档</div>
              <div class="card-body">按 EXIF 日期分类照片、找出占用空间最大的文件、翻译并润色文档。</div>
            </div>
            <div class="card info">
              <div class="card-label">核心认知</div>
              <div class="card-title">Codex 不是高级搜索工具</div>
              <div class="card-body">它是能直接操作你文件和系统的智能助手——从需求到交付，全程自动化。</div>
            </div>
          </div>
        </div>` },
      { type: 'section', title: '第 3 课', subtitle: 'Codex vs 其他工具' },
      { type: 'content', title: 'Codex vs ChatGPT',
        body: `<div class="quote">ChatGPT 是一辆车，Codex 是这辆车的"自动驾驶模式"。</div>
        <div class="two-col" style="margin-top:20px;">
          <div class="col">
            <div class="card">
              <div class="card-label">ChatGPT 普通聊天模式</div>
              <div class="card-title">回答问题、写文案、翻译</div>
              <div class="card-body">不能操作你的文件，不能执行代码。</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">Codex（代码解释器模式）</div>
              <div class="card-title">读文件、写代码、运行命令</div>
              <div class="card-body">在工作区内直接操作文件系统，能执行代码。</div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="flow">
          <div class="flow-step">聊天 / 问问题</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">ChatGPT 普通模式</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:var(--ikb);color:white;">让 AI 帮你干活</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:var(--lemon);color:var(--dark);">Codex</div>
        </div>` },
      { type: 'content', title: 'Codex vs 传统自动化工具',
        body: `<table class="swiss-table">
          <tr><th>任务</th><th>传统方式</th><th>Codex 方式</th></tr>
          <tr><td>批量重命名文件</td><td>写 Python 脚本 / 专用软件</td><td>说："把 IMG_ 改成 Photo_"</td></tr>
          <tr><td>合并多个 Excel</td><td>Power Query / VBA</td><td>说："把三个文件合并到一个表"</td></tr>
          <tr><td>整理文件夹</td><td>手动操作 / 脚本</td><td>说："按类型分类"</td></tr>
        </table>
        <div class="divider"></div>
        <div class="card highlight" style="margin-top:12px;">
          <div class="card-label">一句话总结</div>
          <div class="card-title">Codex 不是聊天工具、不是代码补全工具、不是传统自动化工具——它是能听懂人话、能操作你电脑的智能助手。</div>
        </div>` },
      { type: 'content', title: '本节知识小结',
        body: `<div class="summary-grid">
          <div class="summary-item">
            <div class="num">01</div>
            <div class="text"><strong>AI 编程助手 vs 聊天机器人</strong><br>前者能干活，后者只能聊天</div>
          </div>
          <div class="summary-item">
            <div class="num">02</div>
            <div class="text"><strong>Codex 核心定位</strong><br>OpenAI 的 AI 编程智能体，能读文件、写代码、运行命令</div>
          </div>
          <div class="summary-item">
            <div class="num">03</div>
            <div class="text"><strong>Codex vs Copilot</strong><br>Copilot 补全代码，Codex 完成任务</div>
          </div>
          <div class="summary-item">
            <div class="num">04</div>
            <div class="text"><strong>类比理解</strong><br>Codex = 会编程的实习生 / 万能秘书</div>
          </div>
        </div>` },
      { type: 'content', title: '模块一 · 本章要点回顾',
        body: `<div class="flow" style="margin-bottom:20px;">
          <div class="flow-step" style="background:var(--ikb);color:white;">什么是 Codex？</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:var(--lemon);color:var(--dark);">它能做什么？</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">它和别的工具有什么不同？</div>
        </div>
        <div class="checklist">
          <div class="checklist-item"><div class="check-icon checked"></div><span>理解 Codex 是能操作文件的智能体，不只是聊天机器人</span></div>
          <div class="checklist-item"><div class="check-icon checked"></div><span>知道 Codex 可以修 Bug、写网页、整理文件、做数据分析</span></div>
          <div class="checklist-item"><div class="check-icon checked"></div><span>清楚 Codex vs Copilot vs ChatGPT 的区别</span></div>
          <div class="checklist-item"><div class="check-icon"></div><span>课后思考：你工作中有哪些重复性任务可以交给 Codex？</span></div>
        </div>` },
      { type: 'content', title: '模块一 · 学习路径总览',
        body: `<div class="two-col">
          <div class="col">
            <div class="card info">
              <div class="card-label">课程结构</div>
              <div class="card-title">6 个模块 · 16 节课 · 4 个实战项目</div>
              <div class="card-body" style="line-height:2.2;">
                <div><strong>模块一</strong> 认识 Codex <span class="tag blue">3 课</span></div>
                <div><strong>模块二</strong> 上手准备 <span class="tag yellow">4 课</span></div>
                <div><strong>模块三</strong> 核心功能 <span class="tag green">4 课</span></div>
                <div><strong>模块四</strong> 实用技巧 <span class="tag orange">3 课</span></div>
                <div><strong>模块五</strong> 项目实战 <span class="tag blue">4 项目</span></div>
                <div><strong>模块六</strong> 总结与进阶 <span class="tag yellow">2 课</span></div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">学完你能做到</div>
              <div class="card-body" style="line-height:2;">
                <div>✅ 让 Codex 帮你整理文件夹、批量重命名</div>
                <div>✅ 用自然语言描述需求，生成网页或小工具</div>
                <div>✅ 让 Codex 联网搜索资料并整理成报告</div>
                <div>✅ 让 Codex 执行重复性任务，节省时间</div>
                <div>✅ 使用 Codex 内置技能快速完成复杂任务</div>
              </div>
            </div>
            <div class="card green">
              <div class="card-label">下一步</div>
              <div class="card-title">→ 进入模块二：上手准备</div>
              <div class="card-body">学习如何安装 Codex 桌面 App，熟悉界面，跑通第一个任务。</div>
            </div>
          </div>
        </div>` },
    ]
  },
  {
    id: 'module-2',
    name: '模块二',
    subtitle: '上手准备',
    color: COLORS.lemonGreen,
    slides: [
      { type: 'title', title: '上手准备', subtitle: '安装、配置、熟悉界面，迈出第一步', moduleTag: 'MODULE 02 — 上手准备' },
      { type: 'section', title: '第 4 课', subtitle: '准备工作' },
      { type: 'content', title: '你需要准备什么？',
        body: `<div class="three-col">
          <div class="col">
            <div class="big-stat">1</div>
            <div class="big-stat-label">ChatGPT 账号</div>
            <div class="card" style="margin-top:12px;">
              <div class="card-body" style="font-size:12px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span>免费版</span><span class="tag blue">¥0</span></div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span>Plus</span><span class="tag yellow">$20/月</span></div>
                <div style="display:flex;justify-content:space-between;"><span>Pro</span><span class="tag orange">$200/月</span></div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="big-stat">2</div>
            <div class="big-stat-label">一台电脑</div>
            <div class="card" style="margin-top:12px;">
              <div class="card-body" style="font-size:12px;">
                <div>✅ macOS 12.0 及以上</div>
                <div>✅ Windows 10 及以上</div>
                <div>✅ Chromebook 支持 Chrome OS</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="big-stat">3</div>
            <div class="big-stat-label">稳定的网络</div>
            <div class="card" style="margin-top:12px;">
              <div class="card-body" style="font-size:12px;">
                建议 50Mbps 以上宽带<br>Codex 需要实时联网与 AI 服务器通信
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '四种使用方式',
        body: `<table class="swiss-table">
          <tr><th>方式</th><th>描述</th><th>适合人群</th></tr>
          <tr><td><strong>桌面 App</strong> <span class="tag green">最推荐</span></td><td>可视化界面，拖拽文件，实时查看执行过程</td><td>所有用户，尤其是新手</td></tr>
          <tr><td>ChatGPT 网页版</td><td>切换到 Code Interpreter 模式，无需安装</td><td>偶尔使用、不想安装软件</td></tr>
          <tr><td>命令行 CLI</td><td>终端直接调用，适合熟悉命令行的用户</td><td>开发者、运维人员</td></tr>
          <tr><td>VS Code 插件</td><td>在编辑器中直接使用</td><td>已经在用 VS Code 的开发者</td></tr>
        </table>` },
      { type: 'section', title: '第 5 课', subtitle: '安装 Codex 桌面 App' },
      { type: 'content', title: 'macOS 安装步骤',
        body: `<div class="two-col">
          <div class="col">
            <div class="card">
              <div class="card-label">Step 1</div>
              <div class="card-title">访问官网</div>
              <div class="card-body">https://chatgpt.com，登录后在左侧菜单找到 "Codex" 入口</div>
            </div>
            <div class="card">
              <div class="card-label">Step 2</div>
              <div class="card-title">下载并安装</div>
              <div class="card-body">点击 "Download Desktop App"，下载后将应用拖入"应用程序"文件夹</div>
            </div>
            <div class="card warning">
              <div class="card-label">注意</div>
              <div class="card-title">系统安全提示</div>
              <div class="card-body">首次打开如提示"来自未识别开发者"，在"系统偏好设置 → 安全性与隐私"中允许即可</div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-label">Step 3</div>
              <div class="card-title">登录账号</div>
              <div class="card-body">使用 ChatGPT 账号登录，Plus/Pro 用户可直接使用高级功能</div>
            </div>
            <div class="card">
              <div class="card-label">Step 4</div>
              <div class="card-title">验证安装</div>
              <div class="card-body">确认能看到 Codex 主界面，检查网络连接和账号登录状态</div>
            </div>
            <div class="card highlight">
              <div class="card-label">安全提醒</div>
              <div class="card-title">只从官方下载</div>
              <div class="card-body">务必从 OpenAI 官方入口下载，不要从第三方网站获取安装包</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: 'Windows 安装步骤',
        body: `<div class="two-col">
          <div class="col">
            <div class="card">
              <div class="card-label">Step 1</div>
              <div class="card-title">访问官网下载</div>
              <div class="card-body">https://chatgpt.com → 找到 Codex 入口 → 点击 "Download Desktop App"</div>
            </div>
            <div class="card">
              <div class="card-label">Step 2</div>
              <div class="card-title">运行安装包</div>
              <div class="card-body">下载完成后，双击安装包，按照安装向导的提示完成安装</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">Step 3</div>
              <div class="card-title">登录 ChatGPT 账号</div>
              <div class="card-body">使用你的 ChatGPT 账号登录，Plus/Pro 用户可直接使用高级功能</div>
            </div>
            <div class="card green">
              <div class="card-label">Step 4</div>
              <div class="card-title">验证安装</div>
              <div class="card-body">确认能看到 Codex 主界面，检查网络连接和账号登录状态</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '验证安装与常见问题',
        body: `<div class="two-col">
          <div class="col">
            <div class="card green">
              <div class="card-label">✅ 安装成功标志</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 能看到 Codex 主界面</div>
                <div>📌 左上角显示账号信息</div>
                <div>📌 可以输入指令并收到回复</div>
              </div>
            </div>
            <div class="card info">
              <div class="card-label">📶 检查网络</div>
              <div class="card-body">确认网络连接正常，Codex 需要实时联网与 AI 服务器通信。</div>
            </div>
          </div>
          <div class="col">
            <div class="card warning">
              <div class="card-label">❌ 常见问题排查</div>
              <div class="card-body" style="line-height:2;">
                <div><strong>看不到界面？</strong> — 检查账号是否已登录</div>
                <div><strong>无法连接？</strong> — 检查网络或尝试切换网络</div>
                <div><strong>功能不可用？</strong> — 确认是否为 Plus/Pro 账号</div>
                <div><strong>版本过旧？</strong> — 检查是否有新版本更新</div>
              </div>
            </div>
            <div class="card">
              <div class="card-label">💡 提示</div>
              <div class="card-body">如果在安装过程中遇到问题，请参考 [常见问题 FAQ](../../appendix/faq.md)。</div>
            </div>
          </div>
        </div>` },
      { type: 'section', title: '第 6 课', subtitle: '认识 Codex 界面' },
      { type: 'content', title: '界面布局概览',
        body: `<div class="two-col">
          <div class="col">
            <div class="card info">
              <div class="card-label">左侧面板</div>
              <div class="card-title">三大功能区</div>
              <div class="card-body" style="line-height:2;">
                <div><strong>对话管理</strong> — 历史对话列表，快速切换或新建</div>
                <div><strong>工作区（Workspace）</strong> — 当前项目/文件夹的文件树</div>
                <div><strong>插件/技能</strong> — 内置技能和扩展功能</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">核心概念：工作区</div>
              <div class="card-title">Workspace = Codex 的"活动范围"</div>
              <div class="card-body" style="line-height:2;">
                <div><strong>安全边界</strong> — Codex 只能在指定工作区内操作</div>
                <div><strong>上下文聚焦</strong> — 读取工作区内所有文件，理解项目结构</div>
                <div><strong>结果可控</strong> — 所有修改都在工作区内，方便追溯</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '如何设置工作区',
        body: `<div class="two-col">
          <div class="col">
            <div class="card">
              <div class="card-label">步骤</div>
              <div class="code-block" style="font-size:12px;">1. 在 Codex 界面中找到
   "打开文件夹" 按钮
2. 浏览到你的目标文件夹
3. 确认选择
4. 左侧面板显示文件树结构</div>
            </div>
            <div class="card green">
              <div class="card-label">为什么需要工作区？</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 安全边界：不会影响到其他文件</div>
                <div>📌 上下文聚焦：Codex 理解你的项目</div>
                <div>📌 结果可控：所有修改都在范围内</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card info">
              <div class="card-label">权限模式</div>
              <div class="card-title">三种模式</div>
              <div class="card-body" style="line-height:2.2;">
                <div><span class="tag green">默认权限</span> — 每次修改前征求同意，最安全</div>
                <div><span class="tag yellow">自动审查</span> — 自动执行，事后审计</div>
                <div><span class="tag orange">完全访问</span> — 完全读写权限，风险最高</div>
              </div>
            </div>
            <div class="card warning">
              <div class="card-label">⚠️ 安全提醒</div>
              <div class="card-body">无论选择哪种权限模式，都不要在 Codex 中输入密码、银行卡号等敏感信息。</div>
            </div>
          </div>
        </div>` },
      { type: 'section', title: '第 7 课', subtitle: '第一次对话' },
      { type: 'content', title: '跑通你的第一个任务',
        body: `<div class="two-col">
          <div class="col">
            <div class="card">
              <div class="card-label">Step 1：最简单的开始</div>
              <div class="code-block" style="font-size:12px;">今天 AI 圈有什么新闻？</div>
              <div class="card-body">Codex 会联网搜索最新 AI 新闻并给你总结。</div>
            </div>
            <div class="card">
              <div class="card-label">Step 2：设置工作区</div>
              <div class="card-body">打开一个文件夹作为工作区（如"下载"或新建的测试文件夹）</div>
            </div>
            <div class="card highlight">
              <div class="card-label">Step 3：让 Codex 分析</div>
              <div class="code-block" style="font-size:12px;">帮我统计这个文件夹里有多少文件，
按类型分类看看各有多少个</div>
            </div>
          </div>
          <div class="col">
            <div class="card info">
              <div class="card-label">Codex 工作流程</div>
              <div class="card-title">理解 → 计划 → 执行 → 审核</div>
              <div class="flow" style="margin-top:12px;">
                <div class="flow-step" style="font-size:11px;">你输入指令</div>
                <div class="flow-arrow">→</div>
                <div class="flow-step" style="font-size:11px;">Codex 理解</div>
                <div class="flow-arrow">→</div>
                <div class="flow-step" style="font-size:11px;">执行操作</div>
                <div class="flow-arrow">→</div>
                <div class="flow-step" style="font-size:11px;background:var(--lemon);color:var(--dark);">你审核结果</div>
              </div>
            </div>
            <div class="card">
              <div class="card-label">进阶任务</div>
              <div class="card-title">让 Codex 整理文件夹</div>
              <div class="code-block" style="font-size:12px;">帮我整理这个文件夹，
把同类文件放到同一个子文件夹里</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '实操任务清单 & 小结',
        body: `<div class="two-col">
          <div class="col">
            <div class="checklist">
              <div class="checklist-item"><div class="check-icon checked"></div><span>问 Codex 一个简单问题（如"今天天气怎么样"）</span></div>
              <div class="checklist-item"><div class="check-icon checked"></div><span>设置一个文件夹为工作区</span></div>
              <div class="checklist-item"><div class="check-icon checked"></div><span>让 Codex 分析该文件夹内容</span></div>
              <div class="checklist-item"><div class="check-icon"></div><span>让 Codex 整理该文件夹的文件</span></div>
              <div class="checklist-item"><div class="check-icon"></div><span>观察 Codex 的执行日志</span></div>
            </div>
          </div>
          <div class="col">
            <div class="summary-grid">
              <div class="summary-item">
                <div class="num">01</div>
                <div class="text"><strong>第一次对话</strong><br>从简单问题开始，建立信心</div>
              </div>
              <div class="summary-item">
                <div class="num">02</div>
                <div class="text"><strong>文件夹分析</strong><br>让 Codex 统计和分类文件</div>
              </div>
              <div class="summary-item">
                <div class="num">03</div>
                <div class="text"><strong>文件夹整理</strong><br>让 Codex 自动归类文件</div>
              </div>
              <div class="summary-item">
                <div class="num">04</div>
                <div class="text"><strong>执行流程</strong><br>理解 → 计划 → 执行 → 审核</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '模块二 · 本章要点回顾',
        body: `<div class="flow" style="margin-bottom:20px;">
          <div class="flow-step" style="background:var(--lemonGreen);color:white;">准备账号</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:var(--lemonGreen);color:white;">安装 App</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:var(--lemonGreen);color:white;">熟悉界面</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:var(--lemonGreen);color:white;">第一次对话</div>
        </div>
        <div class="summary-grid">
          <div class="summary-item">
            <div class="num">账号</div>
            <div class="text">ChatGPT 账号（免费版可用，推荐 Plus）</div>
          </div>
          <div class="summary-item">
            <div class="num">使用方式</div>
            <div class="text">桌面 App（推荐）、网页版、CLI、VS Code 插件</div>
          </div>
          <div class="summary-item">
            <div class="num">工作区</div>
            <div class="text">Codex 操作文件的范围，类似"沙盒"</div>
          </div>
          <div class="summary-item">
            <div class="num">权限模式</div>
            <div class="text">默认权限（安全）→ 自动审查（高效）→ 完全访问（高风险）</div>
          </div>
        </div>` },
    ]
  },
  {
    id: 'module-3',
    name: '模块三',
    subtitle: '核心功能',
    color: COLORS.safetyOrange,
    slides: [
      { type: 'title', title: '核心功能', subtitle: '文件操作 · 自然语言驱动 · 联网检索 · 自动化', moduleTag: 'MODULE 03 — 核心功能' },
      { type: 'section', title: '第 8 课', subtitle: '文件操作' },
      { type: 'content', title: 'Codex 能读取你电脑上的文件',
        body: `<div class="two-col">
          <div class="col">
            <div class="card info">
              <div class="card-label">支持的格式</div>
              <div class="card-body" style="line-height:2.2;">
                <div>📄 <strong>文本文件</strong>（.txt, .md, .csv）→ 直接阅读内容</div>
                <div>💻 <strong>代码文件</strong>（.py, .js, .html）→ 分析并修改</div>
                <div>🖼️ <strong>图片文件</strong>（.jpg, .png）→ 识别图片内容</div>
                <div>📑 <strong>PDF 文件</strong> → 提取文字并总结</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">读取文件夹</div>
              <div class="card-title">指令示例</div>
              <div class="code-block" style="font-size:12px;">帮我看看这个文件夹里有什么文件</div>
              <div class="card-body" style="margin-top:8px;">Codex 会列出所有文件名、大小、修改日期等信息。</div>
            </div>
            <div class="card">
              <div class="card-label">实操：整理文档</div>
              <div class="code-block" style="font-size:12px;">帮我整理这个文件夹，
按文件类型创建子文件夹</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '批量操作 & 文件编辑',
        body: `<div class="three-col">
          <div class="col">
            <div class="card">
              <div class="card-label">批量重命名</div>
              <div class="code-block" style="font-size:11px;">把这些照片改成"旅行-序号.jpg"</div>
              <div class="card-body" style="font-size:11px;">Codex 执行批量重命名，支持规则自定义。</div>
            </div>
            <div class="card green">
              <div class="card-label">更多示例</div>
              <div class="card-body" style="font-size:11px;line-height:2;">
                <div>📌 "把所有 .JPG 改成 .jpg" → 统一小写</div>
                <div>📌 "加上日期前缀 20260722" → 添加前缀</div>
                <div>📌 "去掉所有空格" → 清理文件名</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">文件编辑</div>
              <div class="card-title">Codex 能直接修改文件</div>
              <div class="code-block" style="font-size:11px;">帮我把待办事项加上一项：
"预约理发"</div>
              <div class="card-body" style="font-size:11px;margin-top:6px;">直接修改原文件，无需手动编辑。</div>
            </div>
          </div>
          <div class="col">
            <div class="card info">
              <div class="card-label">空间分析</div>
              <div class="code-block" style="font-size:11px;">帮我分析这个文件夹的空间占用情况，
列出最大的 10 个文件</div>
              <div class="card-body" style="font-size:11px;margin-top:6px;">生成类似报告：<br>总大小 4.2GB，Top 10 最大文件...</div>
            </div>
          </div>
        </div>` },
      { type: 'section', title: '第 9 课', subtitle: '自然语言驱动' },
      { type: 'content', title: '什么是 Vibe Coding？',
        body: `<div class="quote">用自然语言描述你想要什么，让 AI 来完成具体实现。</div>
        <div class="two-col" style="margin-top:20px;">
          <div class="col">
            <div class="card warning">
              <div class="card-label">传统编程方式</div>
              <div class="card-title">自己买菜、洗菜、切菜、炒菜</div>
              <div class="card-body">每一步都要亲自动手，需要掌握技术细节。</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">Vibe Coding</div>
              <div class="card-title">告诉厨师"我要宫保鸡丁，少辣"</div>
              <div class="card-body">你不需要会做饭，只需要会点菜。清楚知道要什么，用简洁语言描述即可。</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '好指令的四个要素',
        body: `<div class="card highlight" style="margin-bottom:16px;">
          <div class="card-label">指令公式</div>
          <div class="card-title" style="font-size:18px;">[动作] + [对象] + [规则/要求] + [期望结果]</div>
        </div>
        <div class="three-col">
          <div class="col">
            <div class="card warning">
              <div class="card-label">❌ 差的指令</div>
              <div class="card-title">"帮我做个东西"</div>
              <div class="card-body">太模糊，Codex 不知道你要什么。</div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-label">✅ 好的指令</div>
              <div class="card-title">"帮我做一个个人简介网页"</div>
              <div class="card-body">具体说明了要做什么，但还是不够具体。</div>
            </div>
          </div>
          <div class="col">
            <div class="card green">
              <div class="card-label">✅✅ 更好的指令</div>
              <div class="card-title">"帮我做一个个人简介网页，主色调蓝色，简洁现代风格，保存为 index.html"</div>
              <div class="card-body">包含格式、风格、验收标准。</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '学会"追问"和"修正"',
        body: `<div class="two-col">
          <div class="col">
            <div class="card">
              <div class="card-label">第一轮</div>
              <div class="code-block" style="font-size:11px;">你：帮我做一个个人简介网页
Codex：生成了一个基本网页</div>
            </div>
            <div class="card">
              <div class="card-label">第二轮</div>
              <div class="code-block" style="font-size:11px;">你：页面太简单了，加一个
   项目展示区域
Codex：添加了项目展示区域</div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-label">第三轮</div>
              <div class="code-block" style="font-size:11px;">你：把主色调改成蓝色，
   字体换成更大的
Codex：修改了颜色和字体</div>
            </div>
            <div class="card highlight">
              <div class="card-label">关键技巧</div>
              <div class="card-body" style="line-height:2;">
                <div>✅ 不要怕说"不对"，直接告诉 Codex 哪里不对</div>
                <div>✅ 给具体反馈，不要说"不好看"，说"标题字体加大"</div>
                <div>✅ 分步推进，大任务拆成小步骤</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'section', title: '第 10 课', subtitle: '联网与资料检索' },
      { type: 'content', title: 'Codex 可以联网搜索',
        body: `<div class="two-col">
          <div class="col">
            <div class="card info">
              <div class="card-label">何时使用联网搜索？</div>
              <div class="card-body" style="line-height:2.2;">
                <div>✅ 回答常识性问题</div>
                <div>✅ 查询最新新闻</div>
                <div>✅ 查找产品评测</div>
                <div>✅ 回答编程技术问题</div>
                <div>❌ 分析本地文件内容</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">实操：调研 AI 发展趋势</div>
              <div class="code-block" style="font-size:11px;">帮我调研 2026 年 AI 领域发展趋势，
包括：大模型进展、办公场景应用、
对就业影响。每部分 3 个要点，
注明信息来源。</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '从联网搜索到生成报告',
        body: `<div class="two-col">
          <div class="col">
            <div class="card">
              <div class="card-label">进阶用法 1</div>
              <div class="code-block" style="font-size:11px;">帮我阅读这篇文章 [链接]，
总结出 5 个核心观点</div>
            </div>
            <div class="card">
              <div class="card-label">进阶用法 2</div>
              <div class="code-block" style="font-size:11px;">帮我阅读这篇文章，
找出其中提到的所有工具/产品</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">进阶用法 3</div>
              <div class="code-block" style="font-size:11px;">根据这篇文章的内容，
写一份适合发在朋友圈的
推荐文案</div>
            </div>
            <div class="card green">
              <div class="card-label">核心能力</div>
              <div class="card-title">联网搜索 → 信息提取 → 内容整理 → 格式输出</div>
            </div>
          </div>
        </div>` },
      { type: 'section', title: '第 11 课', subtitle: '自动化任务' },
      { type: 'content', title: '什么是"自动化任务"？',
        body: `<div class="quote">你告诉 Codex 要做什么，它自己一步步完成整个过程，不需要你反复操作。</div>
        <div class="two-col" style="margin-top:20px;">
          <div class="col">
            <div class="card warning">
              <div class="card-label">手动方式</div>
              <div class="card-title">搬家：自己打包、贴标签、搬运</div>
              <div class="card-body">每一步都要亲自动手，耗时耗力。</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">自动化方式</div>
              <div class="card-title">Codex 就是那个"助手"</div>
              <div class="card-body">你告诉它要做什么，它自己完成整个过程。</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '实操：批量重命名 & 自动下载整理',
        body: `<div class="two-col">
          <div class="col">
            <div class="card">
              <div class="card-label">实操一：批量重命名</div>
              <div class="code-block" style="font-size:11px;">帮我把这些图片按日期重命名，
格式为"拍摄日期_序号.jpg"
例如：2026-07-20_001.jpg</div>
              <div class="card-body" style="margin-top:6px;font-size:12px;">Codex 读取 EXIF 信息，批量重命名。</div>
            </div>
            <div class="card highlight">
              <div class="card-label">实操二：自动下载整理</div>
              <div class="code-block" style="font-size:11px;">帮我搜索"远程办公最佳实践"，
找出前 5 条结果，整理成文档</div>
            </div>
          </div>
          <div class="col">
            <div class="card info">
              <div class="card-label">一次性任务 vs 可复用流程</div>
              <div class="card-body" style="line-height:2;">
                <div><strong>一次性任务：</strong>"合并这些 PDF"</div>
                <div style="margin:6px 0;border-top:1px solid var(--grid);"></div>
                <div><strong>可复用流程：</strong>写一个脚本，每次运行自动处理</div>
              </div>
            </div>
            <div class="card green">
              <div class="card-label">进阶：创建自动化脚本</div>
              <div class="code-block" style="font-size:11px;">帮我写一个 Python 脚本，
读取文件夹里的日志文件，
生成每日工作汇总报告</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '模块三 · 核心功能小结',
        body: `<div class="flow" style="margin-bottom:20px;">
          <div class="flow-step" style="background:var(--safetyOrange);color:white;">文件操作</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:var(--safetyOrange);color:white;">自然语言驱动</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:var(--safetyOrange);color:white;">联网检索</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:var(--safetyOrange);color:white;">自动化任务</div>
        </div>
        <div class="summary-grid">
          <div class="summary-item">
            <div class="num">01</div>
            <div class="text"><strong>文件操作</strong><br>读取、编辑、批量重命名、分类整理</div>
          </div>
          <div class="summary-item">
            <div class="num">02</div>
            <div class="text"><strong>Vibe Coding</strong><br>用自然语言描述目标，指令四要素：动作+对象+规则+期望结果</div>
          </div>
          <div class="summary-item">
            <div class="num">03</div>
            <div class="text"><strong>联网检索</strong><br>搜索 → 提取 → 整理 → 输出报告</div>
          </div>
          <div class="summary-item">
            <div class="num">04</div>
            <div class="text"><strong>自动化</strong><br>一次性任务 → 可复用脚本，长期提效</div>
          </div>
        </div>` },
    ]
  },
  {
    id: 'module-4',
    name: '模块四',
    subtitle: '实用技巧',
    color: COLORS.lemon,
    slides: [
      { type: 'title', title: '实用技巧', subtitle: '优化指令 · 安全管理 · 技能调用', moduleTag: 'MODULE 04 — 实用技巧' },
      { type: 'section', title: '第 12 课', subtitle: '如何写出更好的指令' },
      { type: 'content', title: '指令质量决定结果质量',
        body: `<div class="quote">好的指令 = 清晰的目标 + 具体的要求 + 明确的验收标准</div>
        <div class="two-col" style="margin-top:20px;">
          <div class="col">
            <div class="card warning">
              <div class="card-label">❌ 差的指令</div>
              <div class="card-title">"帮我做一个网站"</div>
              <div class="card-body">太模糊，不知道什么类型、什么风格、包含哪些内容。</div>
            </div>
            <div class="card">
              <div class="card-label">✅ 好一些</div>
              <div class="card-title">"帮我做一个个人简介网页"</div>
              <div class="card-body">好一些，但还是不够具体。</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">✅✅ 更好的指令</div>
              <div class="code-block" style="font-size:11px;">帮我做一个个人简介网页，要求：
1. 包含头像、姓名、简介、技能列表、联系方式
2. 简洁现代的设计风格
3. 主色调为蓝色
4. 代码保存为 index.html</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '关键技巧：先计划、再执行',
        body: `<div class="two-col">
          <div class="col">
            <div class="card info">
              <div class="card-label">技巧一：提供背景信息</div>
              <div class="card-body" style="line-height:2;">
                <div><strong>整理照片：</strong>"去年去日本旅行拍的照片，按城市分类"</div>
                <div><strong>写邮件：</strong>"给客户邮件，语气正式，主题是项目延期"</div>
                <div><strong>数据分析：</strong>"销售数据，包含日期、产品、数量、金额四列"</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">技巧二：让 Codex 先给计划</div>
              <div class="code-block" style="font-size:11px;">在开始之前，先告诉我你的执行计划，
等我确认后你再开始</div>
              <div class="card-body" style="margin-top:8px;">
                <div>✅ 确认 Codex 理解了你的需求</div>
                <div>✅ 调整计划中的任何偏差</div>
                <div>✅ 避免做无用功</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '指令模板',
        body: `<div class="three-col">
          <div class="col">
            <div class="card info">
              <div class="card-label">文件操作类</div>
              <div class="code-block" style="font-size:11px;">请帮我 [动作] [对象]，
[具体要求]，[验收标准]</div>
              <div class="card-body" style="margin-top:8px;font-size:11px;">例：帮我把文件夹里的图片按日期分类</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">内容生成类</div>
              <div class="code-block" style="font-size:11px;">请帮我 [动作] 一个 [类型]，
关于 [主题]，要求 [格式/风格]</div>
              <div class="card-body" style="margin-top:8px;font-size:11px;">例：写一份健康饮食周报，分三个部分</div>
            </div>
          </div>
          <div class="col">
            <div class="card green">
              <div class="card-label">数据分析类</div>
              <div class="code-block" style="font-size:11px;">请帮我分析 [数据源]，
找出 [关注点]，输出 [格式]</div>
              <div class="card-body" style="margin-top:8px;font-size:11px;">例：分析销售数据，找出增长最快的产品</div>
            </div>
          </div>
        </div>` },
      { type: 'section', title: '第 13 课', subtitle: '安全与权限管理' },
      { type: 'content', title: '为什么要有权限管理？',
        body: `<div class="card warning" style="margin-bottom:16px;">
          <div class="card-label">⚠️ 核心原因</div>
          <div class="card-title">Codex 能操作你的文件——读取、修改、删除</div>
          <div class="card-body">这意味着它既有强大的能力，也有潜在的风险。权限管理的核心目的：确保 Codex 只在授权范围内使用，保护你的数据安全。</div>
        </div>
        <div class="three-col">
          <div class="col">
            <div class="card green">
              <div class="card-label">✅ 应该做的</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 备份重要文件</div>
                <div>📌 使用默认权限</div>
                <div>📌 审阅每次结果</div>
                <div>📌 限制工作区范围</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card warning">
              <div class="card-label">❌ 不应该做的</div>
              <div class="card-body" style="line-height:2;">
                <div>🚫 输入密码、银行卡信息</div>
                <div>🚫 给完全访问权限</div>
                <div>🚫 不检查 Codex 的输出</div>
                <div>🚫 让 Codex 操作系统关键目录</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card info">
              <div class="card-label">三种权限模式</div>
              <div class="card-body" style="line-height:2.2;">
                <div><span class="tag green">默认权限</span> — 每次操作前征求同意</div>
                <div><span class="tag yellow">自动审查</span> — 事后审计，效率更高</div>
                <div><span class="tag orange">完全访问</span> — 高风险，不建议</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '实操：设置权限',
        body: `<div class="two-col">
          <div class="col">
            <div class="card">
              <div class="card-label">Step 1</div>
              <div class="card-title">打开设置界面</div>
              <div class="card-body">找到"权限管理"或"安全设置"</div>
            </div>
            <div class="card">
              <div class="card-label">Step 2</div>
              <div class="card-title">选择默认权限模式</div>
              <div class="card-body">刚开始使用时保持默认权限，最安全</div>
            </div>
            <div class="card highlight">
              <div class="card-label">Step 3</div>
              <div class="card-title">测试验证</div>
              <div class="card-body">让 Codex 执行一个文件操作，观察它如何征求你的同意</div>
            </div>
          </div>
          <div class="col">
            <div class="card info">
              <div class="card-label">权限示例</div>
              <div class="code-block" style="font-size:11px;">Codex：我打算创建子文件夹
"images"，并将所有图片移入。
是否允许？

你：[允许 / 拒绝]</div>
            </div>
            <div class="card green">
              <div class="card-label">安全原则</div>
              <div class="card-title">最小权限原则</div>
              <div class="card-body">只给 Codex 完成工作所需的最小权限，用完即收回。</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '用"验收标准"告诉 Codex 什么叫做好了',
        body: `<div class="two-col">
          <div class="col">
            <div class="card info">
              <div class="card-label">示例：整理文档</div>
              <div class="code-block" style="font-size:11px;">帮我整理这份文档，要求：
1. 去除所有空行
2. 统一标题格式（一级标题用 #
   二级标题用 ##）
3. 检查并修正错别字
4. 最后告诉我你做了哪些修改</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">关键技巧</div>
              <div class="card-title">让 Codex 告诉你它做了什么</div>
              <div class="card-body">注意最后一条——<strong>让 Codex 告诉你它做了什么</strong>，这样你可以快速验证结果是否符合预期。</div>
            </div>
            <div class="card green">
              <div class="card-label">好处</div>
              <div class="card-body" style="line-height:2;">
                <div>✅ 快速验证结果是否正确</div>
                <div>✅ 发现遗漏的细节</div>
                <div>✅ 方便后续追问和调整</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '本节实操任务 & 小结',
        body: `<div class="two-col">
          <div class="col">
            <div class="checklist">
              <div class="checklist-item"><div class="check-icon checked"></div><span>选择一个你想让 Codex 完成的任务</span></div>
              <div class="checklist-item"><div class="check-icon checked"></div><span>先用模糊的指令试一次</span></div>
              <div class="checklist-item"><div class="check-icon"></div><span>再用清晰的指令（按模板）试一次</span></div>
              <div class="checklist-item"><div class="check-icon"></div><span>对比两次结果的差异</span></div>
            </div>
          </div>
          <div class="col">
            <div class="summary-grid">
              <div class="summary-item">
                <div class="num">01</div>
                <div class="text"><strong>拆分任务</strong><br>大任务拆成小步骤，逐步完成</div>
              </div>
              <div class="summary-item">
                <div class="num">02</div>
                <div class="text"><strong>先计划后执行</strong><br>让 Codex 先给出计划，确认后再执行</div>
              </div>
              <div class="summary-item">
                <div class="num">03</div>
                <div class="text"><strong>提供背景</strong><br>主动告诉 Codex 相关上下文</div>
              </div>
              <div class="summary-item">
                <div class="num">04</div>
                <div class="text"><strong>验收标准</strong><br>明确告诉 Codex 什么叫"做好了"</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'section', title: '第 14 课', subtitle: 'Codex 的"技能"（Skills）' },
      { type: 'content', title: '什么是"技能"？',
        body: `<div class="quote">技能是 Codex 内置的预置工作模板——每个技能都是为特定类型的任务预先优化过的。</div>
        <div class="two-col" style="margin-top:20px;">
          <div class="col">
            <div class="card">
              <div class="card-label">没有技能</div>
              <div class="card-title">"帮我做 PPT"</div>
              <div class="card-body">Codex 从零开始猜怎么做，效率低，质量不稳定。</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">有技能</div>
              <div class="card-title">"用 PPT 技能帮我做演示文稿"</div>
              <div class="card-body">Codex 直接套用最佳实践，更高效、质量更稳定。</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '常用技能一览',
        body: `<table class="swiss-table">
          <tr><th>技能名称</th><th>用途</th><th>适合人群</th></tr>
          <tr><td><span class="tag yellow">PPT 生成</span></td><td>根据主题自动生成演示文稿</td><td>职场人士、学生</td></tr>
          <tr><td><span class="tag blue">网页开发</span></td><td>生成 HTML/CSS/JS 网页</td><td>任何想快速建站的人</td></tr>
          <tr><td><span class="tag green">数据分析</span></td><td>读取数据文件并生成分析报告</td><td>分析师、运营</td></tr>
          <tr><td><span class="tag orange">代码生成</span></td><td>根据自然语言描述生成代码</td><td>开发者、学习者</td></tr>
          <tr><td><span class="tag blue">文档整理</span></td><td>自动整理和格式化文档</td><td>行政、文秘</td></tr>
          <tr><td><span class="tag green">图片处理</span></td><td>调整图片尺寸、格式转换等</td><td>设计师、内容创作者</td></tr>
        </table>
        <div class="card info" style="margin-top:12px;">
          <div class="card-label">提示</div>
          <div class="card-body">具体可用的技能列表可能随版本更新而变化，请以实际界面为准。</div>
        </div>` },
      { type: 'content', title: '实操：使用技能',
        body: `<div class="two-col">
          <div class="col">
            <div class="card highlight">
              <div class="card-label">实操一：PPT 技能</div>
              <div class="code-block" style="font-size:11px;">帮我做一个关于"2026 年 AI
发展趋势"的演示文稿
要求：10 页左右，包含封面、目录、
主要趋势分析、总结</div>
              <div class="card-body" style="margin-top:6px;font-size:12px;">Codex 会联网搜索 → 生成大纲 → 创建内容 → 应用模板</div>
            </div>
          </div>
          <div class="col">
            <div class="card info">
              <div class="card-label">实操二：网页开发技能</div>
              <div class="code-block" style="font-size:11px;">帮我做一个贪吃蛇游戏网页
- 键盘方向键控制
- 吃食物后蛇身变长
- 碰边界或自身则结束
- 界面简洁美观</div>
            </div>
            <div class="card green">
              <div class="card-label">自定义技能</div>
              <div class="card-title">将常用流程固化为模板</div>
              <div class="code-block" style="font-size:11px;">我每个月都要做销售汇总报告，
你能帮我创建一个自动化技能吗？</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '模块四 · 实用技巧小结',
        body: `<div class="flow" style="margin-bottom:20px;">
          <div class="flow-step" style="background:var(--lemon);color:var(--dark);">写好指令</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:var(--lemon);color:var(--dark);">安全设置</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:var(--lemon);color:var(--dark);">调用技能</div>
        </div>
        <div class="summary-grid">
          <div class="summary-item">
            <div class="num">01</div>
            <div class="text"><strong>指令四要素</strong><br>动作 + 对象 + 规则 + 期望结果</div>
          </div>
          <div class="summary-item">
            <div class="num">02</div>
            <div class="text"><strong>先计划后执行</strong><br>让 Codex 先给出计划，确认后再执行</div>
          </div>
          <div class="summary-item">
            <div class="num">03</div>
            <div class="text"><strong>安全原则</strong><br>默认权限、备份重要文件、限制工作区</div>
          </div>
          <div class="summary-item">
            <div class="num">04</div>
            <div class="text"><strong>技能调用</strong><br>选择技能 → 输入指令 → 审查结果</div>
          </div>
        </div>` },
    ]
  },
  {
    id: 'module-5',
    name: '模块五',
    subtitle: '项目实战',
    color: '#8B5CF6',
    slides: [
      { type: 'title', title: '项目实战', subtitle: '用 Codex 完成真实项目，从入门到综合实战', moduleTag: 'MODULE 05 — 项目实战' },
      { type: 'section', title: '项目一', subtitle: '整理你的电脑（入门级）' },
      { type: 'content', title: '任务描述与准备',
        body: `<div class="two-col">
          <div class="col">
            <div class="card info">
              <div class="card-label">任务</div>
              <div class="card-title">整理你电脑上的一个杂乱文件夹</div>
              <div class="card-body">选择一个实际存在问题的文件夹（如下载、桌面、文档），让 Codex 帮你整理。</div>
            </div>
            <div class="card">
              <div class="card-label">准备步骤</div>
              <div class="card-body" style="line-height:2;">
                <div>1️⃣ 创建测试文件夹 "待整理文件夹"</div>
                <div>2️⃣ 放入不同类型文件（.txt, .jpg, .pdf, .xlsx, .zip）</div>
                <div>3️⃣ 在 Codex 中设为工作区</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">学到的能力</div>
              <div class="card-body" style="line-height:2;">
                <div>✅ 文件操作（读取、移动、分类）</div>
                <div>✅ 自然语言指令编写</div>
                <div>✅ 权限管理实践</div>
                <div>✅ 结果验证与反馈</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '操作步骤详解',
        body: `<div class="two-col">
          <div class="col">
            <div class="card">
              <div class="card-label">Step 1：分析文件夹</div>
              <div class="code-block" style="font-size:11px;">请帮我分析一下这个文件夹，告诉我：
1. 总共有多少个文件？
2. 按文件类型分类，各有多少个？
3. 最大的三个文件是什么？</div>
            </div>
            <div class="card highlight">
              <div class="card-label">Step 2：让 Codex 整理</div>
              <div class="code-block" style="font-size:11px;">请按文件类型帮我整理这个文件夹：
- 图片文件移到 images 文件夹
- 文档文件移到 documents 文件夹
- 表格文件移到 spreadsheets 文件夹
请先告诉我你的计划，等我确认后再执行。</div>
            </div>
          </div>
          <div class="col">
            <div class="card info">
              <div class="card-label">Step 3：审查计划</div>
              <div class="code-block" style="font-size:11px;">我的整理计划：
1. 创建子文件夹：images/, documents/, ...
2. 扫描所有文件并按扩展名分类
3. 将每个文件移动到对应子文件夹
请确认是否开始执行？</div>
            </div>
            <div class="card green">
              <div class="card-label">Step 4：验证结果</div>
              <div class="card-body" style="font-size:12px;">检查文件夹结构是否正确，必要时让 Codex 调整。</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '进阶挑战',
        body: `<div class="three-col">
          <div class="col">
            <div class="card">
              <div class="card-label">挑战 1</div>
              <div class="code-block" style="font-size:11px;">找出所有超过 10MB 的文件，
把它们单独放到一个
"大文件"文件夹里</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">挑战 2</div>
              <div class="code-block" style="font-size:11px;">统计一下这个文件夹里有多少
重复的文件名（忽略扩展名）</div>
            </div>
          </div>
          <div class="col">
            <div class="card green">
              <div class="card-label">挑战 3</div>
              <div class="code-block" style="font-size:11px;">帮我生成一份文件夹整理报告，
保存到 reports.md 文件中</div>
            </div>
          </div>
        </div>` },
      { type: 'section', title: '项目二', subtitle: '生成一份 PPT 报告（进阶级）' },
      { type: 'content', title: '任务描述与操作步骤',
        body: `<div class="two-col">
          <div class="col">
            <div class="card highlight">
              <div class="card-label">任务</div>
              <div class="card-title">让 Codex 根据网上资料生成一份主题演示文稿</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 选择主题（如"远程办公趋势"）</div>
                <div>📌 让 Codex 生成大纲</div>
                <div>📌 审查并确认大纲</div>
                <div>📌 联网搜索填充内容</div>
                <div>📌 审查并微调</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-label">关键指令</div>
              <div class="code-block" style="font-size:11px;">帮我做一个关于"[主题]"的演示文稿，
要求：
1. 10-15 页左右
2. 包含封面、目录、主要观点分析、
   案例、总结
3. 先给我一个大纲，等我确认后再开始</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '进阶技巧',
        body: `<div class="three-col">
          <div class="col">
            <div class="card">
              <div class="card-label">添加图表</div>
              <div class="code-block" style="font-size:11px;">在"市场规模"这一页，
帮我生成一个柱状图
来展示过去 5 年的数据变化</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">转换语言</div>
              <div class="code-block" style="font-size:11px;">把这份演示文稿
翻译成英文版本</div>
            </div>
          </div>
          <div class="col">
            <div class="card green">
              <div class="card-label">导出格式</div>
              <div class="code-block" style="font-size:11px;">把内容保存为 Markdown
格式的文件，
方便我后续编辑</div>
            </div>
          </div>
        </div>` },
      { type: 'section', title: '项目三', subtitle: '做一个简单网页（挑战级）' },
      { type: 'content', title: '任务描述',
        body: `<div class="two-col">
          <div class="col">
            <div class="card highlight">
              <div class="card-label">任务</div>
              <div class="card-title">用自然语言让 Codex 生成并修改网页</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 描述需求</div>
                <div>📌 查看生成结果</div>
                <div>📌 根据效果提出修改</div>
                <div>📌 迭代优化直至满意</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-label">学到的能力</div>
              <div class="card-body" style="line-height:2;">
                <div>✅ 自然语言编程</div>
                <div>✅ 迭代优化（追问技巧）</div>
                <div>✅ 测试验证</div>
                <div>✅ 问题解决</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '示例指令与迭代优化',
        body: `<div class="two-col">
          <div class="col">
            <div class="card info">
              <div class="card-label">初版指令</div>
              <div class="code-block" style="font-size:11px;">帮我做一个个人简介网页，要求：
- 包含头像区域（占位符）
- 显示姓名和一句话简介
- 技能列表（标签形式，3-5 个）
- 联系方式区域（邮箱、社交媒体）
- 整体风格简洁现代，蓝色主色调
- 代码保存为 index.html</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">迭代优化示例</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 "把头像从圆形改成圆角方形"</div>
                <div>📌 "在技能列表下面加一个项目展示区域"</div>
                <div>📌 "把配色方案改成深色模式"</div>
                <div>📌 "增加一个关于我的段落，大概 200 字"</div>
                <div>📌 "让页面在手机上也好看"</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'section', title: '项目四', subtitle: '待办事项管理小工具（综合实战）' },
      { type: 'content', title: '任务描述',
        body: `<div class="two-col">
          <div class="col">
            <div class="card highlight">
              <div class="card-label">任务</div>
              <div class="card-title">从零到一开发一个待办事项管理工具</div>
              <div class="card-body" style="line-height:2;">
                <div>✅ 添加待办事项</div>
                <div>✅ 标记已完成</div>
                <div>✅ 删除事项</div>
                <div>✅ 数据保存在 localStorage</div>
                <div>✅ 支持深色模式切换</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card info">
              <div class="card-label">学到的能力</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 需求拆解</div>
                <div>📌 任务规划</div>
                <div>📌 全流程协作</div>
                <div>📌 测试验证</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '操作步骤与进阶扩展',
        body: `<div class="two-col">
          <div class="col">
            <div class="card">
              <div class="card-label">Step 1：描述需求</div>
              <div class="code-block" style="font-size:11px;">帮我做一个待办事项管理网页，
功能要求：添加、标记完成、删除、
数据保存在 localStorage、
支持深色模式切换</div>
            </div>
            <div class="card highlight">
              <div class="card-label">Step 2：让 Codex 制定计划</div>
              <div class="code-block" style="font-size:11px;">在开始写代码之前，请先告诉我
你的实现计划，包括：
1. 使用什么技术栈
2. 文件结构是怎样的
3. 各个功能的实现思路</div>
            </div>
          </div>
          <div class="col">
            <div class="card info">
              <div class="card-label">进阶扩展</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 添加分类功能（工作/个人/学习）</div>
                <div>📌 添加提醒功能（截止日期）</div>
                <div>📌 添加导出功能（JSON/CSV）</div>
                <div>📌 部署到 GitHub Pages</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '模块五 · 项目实战回顾',
        body: `<div class="flow" style="margin-bottom:20px;">
          <div class="flow-step" style="background:#8B5CF6;color:white;">整理电脑</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:#8B5CF6;color:white;">生成 PPT</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:#8B5CF6;color:white;">制作网页</div>
          <div class="flow-arrow">→</div>
          <div class="flow-step" style="background:#8B5CF6;color:white;">待办工具</div>
        </div>
        <div class="summary-grid">
          <div class="summary-item">
            <div class="num">难度递增</div>
            <div class="text">入门 → 进阶 → 挑战 → 综合，逐步提升</div>
          </div>
          <div class="summary-item">
            <div class="num">核心能力</div>
            <div class="text">文件操作、联网检索、自然语言编程、项目管理</div>
          </div>
          <div class="summary-item">
            <div class="num">实践方法</div>
            <div class="text">描述需求 → 让 Codex 规划 → 逐步实现 → 测试优化</div>
          </div>
          <div class="summary-item">
            <div class="num">下一步</div>
            <div class="text">进入模块六，回顾全课程，规划进阶学习路径</div>
          </div>
        </div>` },
    ]
  },
  {
    id: 'module-6',
    name: '模块六',
    subtitle: '总结与进阶',
    color: '#EC4899',
    slides: [
      { type: 'title', title: '总结与进阶', subtitle: '回顾核心知识点，规划后续学习路径', moduleTag: 'MODULE 06 — 总结与进阶' },
      { type: 'section', title: '第 15 课', subtitle: '课程回顾' },
      { type: 'content', title: '全课程知识地图',
        body: `<div class="two-col">
          <div class="col">
            <div class="card info">
              <div class="card-label">模块一</div>
              <div class="card-title">认识 Codex</div>
              <div class="card-body">AI 编程助手 vs 聊天机器人、Codex 核心定位、vs Copilot</div>
            </div>
            <div class="card highlight">
              <div class="card-label">模块二</div>
              <div class="card-title">上手准备</div>
              <div class="card-body">账号准备、安装 App、熟悉界面、设置工作区、权限管理</div>
            </div>
            <div class="card">
              <div class="card-label">模块三</div>
              <div class="card-title">核心功能</div>
              <div class="card-body">文件操作、自然语言驱动、联网检索、自动化任务</div>
            </div>
          </div>
          <div class="col">
            <div class="card green">
              <div class="card-label">模块四</div>
              <div class="card-title">实用技巧</div>
              <div class="card-body">写好指令、安全设置、技能调用</div>
            </div>
            <div class="card" style="border-left:4px solid #8B5CF6;background:#F5F3FF;">
              <div class="card-label">模块五</div>
              <div class="card-title">项目实战</div>
              <div class="card-body">整理电脑 → 生成 PPT → 制作网页 → 待办工具</div>
            </div>
            <div class="card warning">
              <div class="card-label">模块六</div>
              <div class="card-title">总结与进阶</div>
              <div class="card-body">回顾知识点、排查常见问题、规划学习路径</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '核心知识点回顾（上）',
        body: `<div class="summary-grid">
          <div class="summary-item">
            <div class="num">01</div>
            <div class="text"><strong>Codex 是什么</strong><br>OpenAI 的 AI 编程智能体，能读文件、写代码、运行命令、操作文件系统</div>
          </div>
          <div class="summary-item">
            <div class="num">02</div>
            <div class="text"><strong>工作区（Workspace）</strong><br>Codex 操作文件的范围，类似"沙盒"，确保安全和可控</div>
          </div>
          <div class="summary-item">
            <div class="num">03</div>
            <div class="text"><strong>权限模式</strong><br>默认权限（安全）→ 自动审查（高效）→ 完全访问（高风险）</div>
          </div>
          <div class="summary-item">
            <div class="num">04</div>
            <div class="text"><strong>Vibe Coding</strong><br>用自然语言描述目标，指令四要素：动作 + 对象 + 规则 + 期望结果</div>
          </div>
        </div>` },
      { type: 'content', title: '核心知识点回顾（下）',
        body: `<div class="summary-grid">
          <div class="summary-item">
            <div class="num">05</div>
            <div class="text"><strong>联网检索</strong><br>搜索 → 提取 → 整理 → 输出报告，Codex 能自动完成</div>
          </div>
          <div class="summary-item">
            <div class="num">06</div>
            <div class="text"><strong>自动化</strong><br>一次性任务 → 可复用脚本，长期提效</div>
          </div>
          <div class="summary-item">
            <div class="num">07</div>
            <div class="text"><strong>技能调用</strong><br>选择技能 → 输入指令 → 审查结果 → 迭代优化</div>
          </div>
          <div class="summary-item">
            <div class="num">08</div>
            <div class="text"><strong>安全原则</strong><br>备份重要文件、限制工作区、审阅结果、最小权限</div>
          </div>
        </div>` },
      { type: 'content', title: '常见问题排查',
        body: `<table class="swiss-table">
          <tr><th>问题</th><th>可能原因</th><th>解决方案</th></tr>
          <tr><td>Codex 无法读取文件</td><td>工作区未设置或权限不足</td><td>检查工作区设置，确认权限模式</td></tr>
          <tr><td>指令执行结果不符预期</td><td>指令不够清晰具体</td><td>使用指令模板，补充背景和验收标准</td></tr>
          <tr><td>联网搜索失败</td><td>网络问题或 API 限制</td><td>检查网络连接，确认账号额度</td></tr>
          <tr><td>文件操作被拒绝</td><td>默认权限模式下未确认</td><td>在权限提示中选择"允许"</td></tr>
          <tr><td>Codex 响应很慢</td><td>任务复杂或网络延迟</td><td>拆分大任务，逐步执行</td></tr>
        </table>` },
      { type: 'content', title: '推荐学习资源',
        body: `<table class="swiss-table">
          <tr><th>资源类型</th><th>链接/名称</th><th>说明</th></tr>
          <tr><td>官方文档</td><td>chatgpt.com/docs</td><td>OpenAI 官方文档</td></tr>
          <tr><td>社区论坛</td><td>community.openai.com</td><td>用户交流和经验分享</td></tr>
          <tr><td>视频教程</td><td>YouTube "Codex tutorial"</td><td>视频教程</td></tr>
          <tr><td>Reddit 社区</td><td>r/Claude, r/OpenAI</td><td>讨论最新进展</td></tr>
        </table>` },
      { type: 'section', title: '第 16 课', subtitle: '下一步可以学什么' },
      { type: 'content', title: '你已经学会了什么？',
        body: `<div class="two-col">
          <div class="col">
            <div class="card green">
              <div class="checklist">
                <div class="checklist-item"><div class="check-icon checked"></div><span>理解 Codex 是什么、能做什么</span></div>
                <div class="checklist-item"><div class="check-icon checked"></div><span>安装和登录 Codex 桌面 App</span></div>
                <div class="checklist-item"><div class="check-icon checked"></div><span>使用自然语言指挥 Codex 完成文件操作</span></div>
                <div class="checklist-item"><div class="check-icon checked"></div><span>让 Codex 联网搜索并整理资料</span></div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="checklist">
                <div class="checklist-item"><div class="check-icon checked"></div><span>使用 Codex 技能快速完成复杂任务</span></div>
                <div class="checklist-item"><div class="check-icon checked"></div><span>独立完成从需求到交付的完整项目</span></div>
                <div class="checklist-item"><div class="check-icon checked"></div><span>安全使用 Codex，理解权限管理</span></div>
                <div class="checklist-item"><div class="check-icon"></div><span>规划后续学习路径</span></div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '进阶学习方向（上）',
        body: `<div class="two-col">
          <div class="col">
            <div class="card info">
              <div class="card-label">方向一：CLI 命令行版本</div>
              <div class="card-title">更灵活的自动化控制</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 安装 Codex CLI</div>
                <div>📌 使用命令行参数指定工作区</div>
                <div>📌 编写脚本自动化调用 Codex</div>
              </div>
              <div class="code-block" style="font-size:11px;">codex --workspace ./my-project
"帮我重构这个项目的代码"</div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">方向二：自定义技能</div>
              <div class="card-title">把常用工作流固化为模板</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 分析自己的高频工作场景</div>
                <div>📌 设计技能模板的结构</div>
                <div>📌 用 Codex 生成技能配置文件</div>
                <div>📌 测试和优化技能效果</div>
              </div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '进阶学习方向（下）',
        body: `<div class="two-col">
          <div class="col">
            <div class="card">
              <div class="card-label">方向三：MCP 扩展</div>
              <div class="card-title">连接更多外部工具</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 了解 MCP 的基本概念</div>
                <div>📌 配置 MCP 服务器连接外部 API</div>
                <div>📌 使用 MCP 扩展 Codex 的能力</div>
              </div>
            </div>
            <div class="card green">
              <div class="card-label">方向四：多智能体协作</div>
              <div class="card-title">并行处理复杂项目</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 设计多智能体协作流程</div>
                <div>📌 分配不同任务给不同智能体</div>
                <div>📌 整合各智能体的输出结果</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card highlight">
              <div class="card-label">实践建议</div>
              <div class="card-title">每天练一点</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 每天花 10-15 分钟用 Codex 完成一个小任务</div>
                <div>📌 记录每次使用的指令和结果</div>
                <div>📌 逐步积累自己的"指令库"</div>
              </div>
            </div>
            <div class="card info">
              <div class="card-label">记住</div>
              <div class="card-title">学习 Codex 的最佳方式就是多用</div>
              <div class="card-body">把日常工作中的重复性任务交给 Codex，在实践中不断提升。</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '实践建议 & 结语',
        body: `<div class="two-col">
          <div class="col">
            <div class="card highlight">
              <div class="card-label">实践建议</div>
              <div class="card-title">每天练一点</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 每天花 10-15 分钟用 Codex 完成一个小任务</div>
                <div>📌 记录每次使用的指令和结果</div>
                <div>📌 逐步积累自己的"指令库"</div>
              </div>
            </div>
            <div class="card info">
              <div class="card-label">加入社区</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 加入 Codex/ChatGPT 用户社区</div>
                <div>📌 分享你的使用经验和技巧</div>
                <div>📌 学习别人的创意用法</div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card green">
              <div class="card-label">持续学习</div>
              <div class="card-body" style="line-height:2;">
                <div>📌 关注 OpenAI 的官方更新</div>
                <div>📌 尝试新功能和新技能</div>
                <div>📌 探索新的应用场景</div>
              </div>
            </div>
            <div class="card" style="border-left:4px solid var(--ikb);background:#F0F7FF;">
              <div class="card-label">记住</div>
              <div class="card-title">学习 Codex 的最佳方式就是多用</div>
              <div class="card-body">把日常工作中的重复性任务交给 Codex，在实践中不断提升。</div>
            </div>
          </div>
        </div>` },
      { type: 'content', title: '感谢学习 · 继续前行',
        body: `<div style="text-align:center;padding:20px 0;">
          <div style="font-size:48px;margin-bottom:20px;">💡</div>
          <div class="quote" style="border:none;padding:0;font-size:18px;">"你不需要会编程，只要你会说人话。"</div>
          <div style="margin-top:24px;font-size:13px;color:var(--gray);line-height:1.8;">
            Codex 只是一个工具，真正有价值的是你用它解决了什么问题。<br>
            不要害怕犯错，每一次"不对"都是学习的机会。<br>
            <strong style="color:var(--dark);">最重要的是——开始用起来吧！</strong>
          </div>
          <div style="margin-top:28px;">
            <div style="font-size:14px;color:var(--gray);margin-bottom:12px;">回到课程首页</div>
            <div style="display:inline-block;background:var(--ikb);color:white;padding:12px 32px;border-radius:8px;font-weight:600;text-decoration:none;font-size:14px;">→ 开始学习</div>
          </div>
          <div style="margin-top:40px;font-size:12px;color:var(--gray);">
            Codex 从零到一 · 让 AI 帮你搞定编程与办公
          </div>
        </div>` },
      { type: 'content', title: '课程结语',
        body: `<div style="text-align:center;padding:20px 0;">
          <div style="font-size:56px;margin-bottom:20px;">🎓</div>
          <div class="quote" style="border:none;padding:0;font-size:22px;">恭喜你完成了 Codex 从零到一的学习！</div>
          <div style="margin-top:20px;font-size:14px;color:var(--gray);line-height:1.8;max-width:500px;margin-left:auto;margin-right:auto;">
            从"不会编程"到"用 AI 完成编程任务"<br>
            从"手动重复劳动"到"自动化高效工作"<br>
            你已经掌握了 AI 时代最实用的技能之一
          </div>
          <div style="margin-top:28px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <span class="tag blue" style="font-size:12px;padding:6px 14px;">6 个模块</span>
            <span class="tag yellow" style="font-size:12px;padding:6px 14px;">16 节课</span>
            <span class="tag green" style="font-size:12px;padding:6px 14px;">4 个实战项目</span>
            <span class="tag orange" style="font-size:12px;padding:6px 14px;">5-7 小时</span>
          </div>
        </div>` },
      { type: 'content', title: '感谢学习 · 继续前行',
        body: `<div style="text-align:center;padding:30px 0;">
          <div style="font-size:56px;margin-bottom:20px;">🚀</div>
          <div class="quote" style="border:none;padding:0;font-size:20px;">"你不需要会编程，只要你会说人话。"</div>
          <div style="margin-top:28px;">
            <div style="font-size:14px;color:var(--gray);margin-bottom:12px;">回到课程首页</div>
            <div style="display:inline-block;background:var(--ikb);color:white;padding:12px 32px;border-radius:8px;font-weight:600;text-decoration:none;font-size:14px;">→ 开始学习</div>
          </div>
          <div style="margin-top:40px;font-size:12px;color:var(--gray);">
            Codex 从零到一 · 让 AI 帮你搞定编程与办公
          </div>
        </div>` },
    ]
  },
];

function buildPPT(mod) {
  let slidesHTML = '';
  for (let i = 0; i < mod.slides.length; i++) {
    const s = mod.slides[i];
    const num = String(i + 1).padStart(2, '0');
    let cls = 'slide';
    if (s.type === 'title') cls += ' title-slide';
    else if (s.type === 'section') cls += ' section-divider';
    let inner = '';
    if (s.type === 'title') {
      inner = `<span class="module-tag">${s.moduleTag}</span><h1>${s.title}</h1><p class="subtitle">${s.subtitle}</p><div class="module-num">0${mod.name.slice(-1)}</div>`;
    } else if (s.type === 'section') {
      inner = `<div class="module-label" style="color:rgba(255,255,255,0.5);">${mod.name}</div><h1 style="font-size:clamp(32px,4vw,56px);font-weight:800;line-height:1.1;margin-bottom:16px;">${s.title}</h1><p style="font-size:18px;color:rgba(255,255,255,0.7);">${s.subtitle}</p>`;
    } else {
      inner = `<div class="slide-header"><div class="accent-bar"></div><div class="module-label">${mod.name}</div><h2 class="slide-title">${s.title}</h2>${s.subtitle ? `<p class="slide-subtitle">${s.subtitle}</p>` : ''}</div><div class="slide-body">${s.body}</div>`;
    }
    slidesHTML += `<div class="${cls}"><div class="slide-num">${num} / ${mod.slides.length}</div>${inner}</div>`;
  }
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${mod.name} — ${mod.subtitle} | CodexCourse PPT</title>
${SWISS_CSS}
</head>
<body>
<div class="progress-bar" id="progressBar"></div>
<div class="deck" id="deck">${slidesHTML}</div>
<div class="nav-hint">← → 翻页 &nbsp;|&nbsp; ${mod.slides.length} 页</div>
<script>
(function(){
  var deck=document.getElementById('deck');
  var slides=deck.querySelectorAll('.slide');
  var total=slides.length;
  var bar=document.getElementById('progressBar');
  function update(){
    var sl=deck.scrollLeft, sw=window.innerWidth;
    var pct=Math.min(100, Math.round((sl/sw+1)/total*100));
    bar.style.width=pct+'%';
  }
  deck.addEventListener('scroll',update);
  update();
  document.addEventListener('keydown',function(e){
    var cur=Array.from(slides).indexOf(deck.querySelector('.slide'));
    if(e.key==='ArrowRight'||e.key==='ArrowDown'||e.key===' '){
      e.preventDefault();
      if(cur<total-1)slides[cur+1].scrollIntoView({behavior:'smooth',inline:'start'});
    }else if(e.key==='ArrowLeft'||e.key==='ArrowUp'){
      e.preventDefault();
      if(cur>0)slides[cur-1].scrollIntoView({behavior:'smooth',inline:'start'});
    }
  });
  var tx=0;
  deck.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;});
  deck.addEventListener('touchend',function(e){
    var d=tx-e.changedTouches[0].clientX;
    var cur=Array.from(slides).indexOf(deck.querySelector('.slide'));
    if(Math.abs(d)>50){
      if(d>0&&cur<total-1)slides[cur+1].scrollIntoView({behavior:'smooth',inline:'start'});
      else if(d<0&&cur>0)slides[cur-1].scrollIntoView({behavior:'smooth',inline:'start'});
    }
  });
})();
</script>
</body>
</html>`;
}

MODULES.forEach(mod => {
  const html = buildPPT(mod);
  const filename = `${mod.id}-${mod.name.replace(/\s/g, '-')}.html`;
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, html, 'utf-8');
  console.log(`✓ Generated: ${filename} (${mod.slides.length} slides)`);
});
console.log('\nDone!');
