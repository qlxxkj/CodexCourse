import { defineConfig, defaultTheme } from 'vitepress'

export default defineConfig({
  base: '/CodexCourse/',
  title: 'Codex Course',
  description: '从零到一：让 AI 帮你搞定编程与办公 | Learn Codex from Scratch',
  lang: 'zh-CN',

  head: [
    // Google AdSense — 请替换为实际发布者 ID（发布后从 AdSense 控制台获取）
    ['script', { 'data-ad-client': 'ca-pub-XXXXXXXXXXXXXXXX', 'async': 'async' }],
    ['meta', { name: 'google-adsense-account', content: 'ca-pub-XXXXXXXXXXXXXXXX' }],
    // Open Graph
    ['meta', { property: 'og:locale:alternate', content: 'en_US' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
  ],

  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      link: '/',
      title: 'Codex 从零到一',
      description: '让 AI 帮你搞定编程与办公',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'Codex from Zero to One',
      description: 'Master AI-powered programming and productivity',
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '课程', link: '/' },
      { text: 'About', link: '/about.md' },
    ],
    sidebar: {
      '/': [
        {
          text: '课程介绍',
          items: [
            { text: '课程简介', link: '/' },
            { text: '课前准备清单', link: '/appendix/prep-checklist.md' },
            { text: '术语速查表', link: '/appendix/glossary.md' },
            { text: '常见问题 FAQ', link: '/appendix/faq.md' },
            { text: '课后反馈表', link: '/appendix/feedback.md' },
          ],
        },
        {
          text: '模块一：认识 Codex',
          collapsed: false,
          items: [
            { text: '第 1 课：AI 编程助手是什么？', link: '/modules/module-1/lesson-1.md' },
            { text: '第 2 课：Codex 能帮你做什么？', link: '/modules/module-1/lesson-2.md' },
            { text: '第 3 课：Codex vs 其他工具', link: '/modules/module-1/lesson-3.md' },
          ],
        },
        {
          text: '模块二：上手准备',
          collapsed: false,
          items: [
            { text: '第 4 课：准备工作', link: '/modules/module-2/lesson-4.md' },
            { text: '第 5 课：安装 Codex 桌面 App', link: '/modules/module-2/lesson-5.md' },
            { text: '第 6 课：认识 Codex 界面', link: '/modules/module-2/lesson-6.md' },
            { text: '第 7 课：第一次对话', link: '/modules/module-2/lesson-7.md' },
          ],
        },
        {
          text: '模块三：核心功能',
          collapsed: false,
          items: [
            { text: '第 8 课：文件操作', link: '/modules/module-3/lesson-8.md' },
            { text: '第 9 课：自然语言驱动', link: '/modules/module-3/lesson-9.md' },
            { text: '第 10 课：联网与资料检索', link: '/modules/module-3/lesson-10.md' },
            { text: '第 11 课：自动化任务', link: '/modules/module-3/lesson-11.md' },
          ],
        },
        {
          text: '模块四：实用技巧',
          collapsed: false,
          items: [
            { text: '第 12 课：如何写出更好的指令', link: '/modules/module-4/lesson-12.md' },
            { text: '第 13 课：安全与权限管理', link: '/modules/module-4/lesson-13.md' },
            { text: '第 14 课：Codex 的"技能"', link: '/modules/module-4/lesson-14.md' },
          ],
        },
        {
          text: '模块五：项目实战',
          collapsed: false,
          items: [
            { text: '项目一：整理你的电脑', link: '/modules/module-5/project-1.md' },
            { text: '项目二：生成一份 PPT 报告', link: '/modules/module-5/project-2.md' },
            { text: '项目三：做一个简单网页', link: '/modules/module-5/project-3.md' },
            { text: '项目四：待办事项管理小工具', link: '/modules/module-5/project-4.md' },
          ],
        },
        {
          text: '模块六：总结与进阶',
          collapsed: false,
          items: [
            { text: '第 15 课：课程回顾与学习路径', link: '/modules/module-6/lesson-15.md' },
            { text: '第 16 课：下一步可以学什么', link: '/modules/module-6/lesson-16.md' },
          ],
        },
      ],
      '/en/': [
        {
          text: 'Course Introduction',
          items: [
            { text: 'Course Overview', link: '/en/' },
            { text: 'Preparation Checklist', link: '/en/appendix/prep-checklist.md' },
            { text: 'Glossary', link: '/en/appendix/glossary.md' },
            { text: 'FAQ', link: '/en/appendix/faq.md' },
          ],
        },
        {
          text: 'Module 1: Understanding Codex',
          collapsed: false,
          items: [
            { text: 'Lesson 1: What is an AI Programming Assistant?', link: '/en/modules/module-1/lesson-1.md' },
            { text: 'Lesson 2: What Can Codex Do?', link: '/en/modules/module-1/lesson-2.md' },
            { text: 'Lesson 3: Codex vs Other Tools', link: '/en/modules/module-1/lesson-3.md' },
          ],
        },
        {
          text: 'Module 2: Getting Started',
          collapsed: false,
          items: [
            { text: 'Lesson 4: Preparation', link: '/en/modules/module-2/lesson-4.md' },
            { text: 'Lesson 5: Installing Codex Desktop App', link: '/en/modules/module-2/lesson-5.md' },
            { text: 'Lesson 6: Understanding the Codex Interface', link: '/en/modules/module-2/lesson-6.md' },
            { text: 'Lesson 7: Your First Conversation', link: '/en/modules/module-2/lesson-7.md' },
          ],
        },
        {
          text: 'Module 3: Core Features',
          collapsed: false,
          items: [
            { text: 'Lesson 8: File Operations', link: '/en/modules/module-3/lesson-8.md' },
            { text: 'Lesson 9: Natural Language Driven', link: '/en/modules/module-3/lesson-9.md' },
            { text: 'Lesson 10: Web Search & Research', link: '/en/modules/module-3/lesson-10.md' },
            { text: 'Lesson 11: Automation Tasks', link: '/en/modules/module-3/lesson-11.md' },
          ],
        },
        {
          text: 'Module 4: Practical Tips',
          collapsed: false,
          items: [
            { text: 'Lesson 12: Writing Better Prompts', link: '/en/modules/module-4/lesson-12.md' },
            { text: 'Lesson 13: Security & Permissions', link: '/en/modules/module-4/lesson-13.md' },
            { text: 'Lesson 14: Codex Skills', link: '/en/modules/module-4/lesson-14.md' },
          ],
        },
        {
          text: 'Module 5: Projects',
          collapsed: false,
          items: [
            { text: 'Project 1: Organize Your Computer', link: '/en/modules/module-5/project-1.md' },
            { text: 'Project 2: Create a PPT Report', link: '/en/modules/module-5/project-2.md' },
            { text: 'Project 3: Build a Simple Website', link: '/en/modules/module-5/project-3.md' },
            { text: 'Project 4: Todo List App', link: '/en/modules/module-5/project-4.md' },
          ],
        },
        {
          text: 'Module 6: Summary & Next Steps',
          collapsed: false,
          items: [
            { text: 'Lesson 15: Course Review & Learning Path', link: '/en/modules/module-6/lesson-15.md' },
            { text: 'Lesson 16: What to Learn Next', link: '/en/modules/module-6/lesson-16.md' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/qlxxkj/CodexCourse' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Codex Course Team',
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: { placeholders: '搜索课程内容...', },
          en: { placeholders: 'Search courses...', },
        },
      },
    },
  },
})
