import { Course, ToolGuide, BlogPost, InterviewQuestion } from './types';

export const TOOLS: ToolGuide[] = [
  {
    id: 'playwright',
    name: 'Playwright',
    description: 'Reliable end-to-end testing for modern web apps. Supports all modern rendering engines including Chromium, WebKit, and Firefox.',
    icon: '🎭',
    features: ['Cross-browser support', 'Auto-wait', 'Web-first assertions', 'Trace Viewer'],
    link: '/tools/playwright',
    relatedCourseId: 'playwright-automation',
    docLink: 'https://playwright.dev/docs/intro',
    repoLink: 'https://github.com/microsoft/playwright',
    summaryContent: `
Playwright is Microsoft's open-source framework for reliable web testing and automation across major browsers like Chromium, Firefox, and WebKit. It uses a single, consistent API to simulate real user interactions, making it faster and more dependable than alternatives like Selenium.

## Core Capabilities
It excels at end-to-end testing by auto-waiting for elements to be ready, handling dynamic content, and supporting mobile viewports or device emulation. Features include network interception for mocking APIs, screenshot/video capture for debugging, and parallel test execution to speed up suites.

## Language Support and Setup
Available in JavaScript/TypeScript, Python, Java, and .NET, installation is straightforward via npm, pip, or similar managers—e.g., \`npm init playwright@latest\`. Tests run in headless mode for CI/CD pipelines or headed for visual debugging.

## Advantages Over Competitors
Unlike Selenium's flakiness from timing issues, Playwright's direct browser control reduces failures by 50-80% in many cases. It's free, actively maintained on GitHub, and integrates with tools like Jest, pytest, or Playwright Test runner for assertions and reporting.
`
  },
  {
    id: 'testsprite',
    name: 'TestSprite',
    description: 'Autonomous AI testing agent that builds, runs, and maintains your test suite automatically.',
    icon: '🧚',
    features: ['Self-healing tests', 'Autonomous exploration', 'Bug reporting', 'CI/CD Integration'],
    link: '/tools/testsprite',
    relatedCourseId: 'testsprite-agent',
    docLink: 'https://docs.testsprite.com/mcp/getting-started/introduction',
    repoLink: 'https://github.com/TestSprite',
    summaryContent: `
## What is TestSprite?

TestSprite is a cutting-edge **Autonomous Testing Agent**. While frameworks like Playwright provide the *tools* to execute actions, TestSprite provides the *intelligence* to decide *what* to test.

### How it Works

TestSprite uses Large Language Models (LLMs) and computer vision to interact with your application just like a human user would.

1.  **Exploration:** You give TestSprite a URL and high-level goals (e.g., "Buy a product"). It autonomously crawls the site, identifying user flows.
2.  **Test Generation:** It automatically generates resilient test code based on its exploration.
3.  **Self-Healing:** If the UI changes (e.g., a button changes color or ID), TestSprite analyzes the new DOM, determines the intent, and updates the test automatically.

### The "No-Code" Advantage

TestSprite is designed to bridge the gap between manual testing and automation. It allows non-technical team members to define test requirements in plain English, while the agent handles the underlying code execution.

### Integration

It integrates directly into GitHub Actions and other CI/CD pipelines, providing a report of "flaky" tests vs "real bugs" with root cause analysis.
`
  },
  {
    id: 'cursor-mcp',
    name: 'Cursor + MCP',
    description: 'Use the Model Context Protocol to connect AI code editors directly to your testing infrastructure.',
    icon: '🤖',
    features: ['Context-aware coding', 'Direct test execution', 'Live debugging', 'Custom tools'],
    link: '/tools/cursor-mcp',
    relatedCourseId: 'mcp-workflows',
    docLink: 'https://cursor.com/docs',
    repoLink: 'https://github.com/cursor',
    summaryContent: `
## What is the Model Context Protocol (MCP)?

The Model Context Protocol (MCP) is an open standard that enables AI assistants (like Claude or the AI in Cursor) to connect to external systems.

### The Problem it Solves

Traditionally, when you ask an AI to fix a test, you have to copy-paste the error log, the test file, and the component code into the chat. This is slow and prone to missing context.

### The MCP Solution

By running an MCP Server connected to your testing framework, your AI editor can:

*   **Read Logs Directly:** The AI can query the latest test run logs without you pasting them.
*   **Execute Tests:** You can tell the AI "Run the login test," and it will trigger the Playwright runner and see the result.
*   **Access Database State:** The AI can check if a user was actually created in the DB after a test run.

### Cursor Integration

Cursor, the AI-first code editor, has native support for MCP. By setting up a "QA MCP Server," you turn your IDE into a powerful control center where the AI acts as a senior automation engineer that can run, debug, and fix tests autonomously.
`
  },
  {
    id: 'stagehand',
    name: 'Stagehand',
    description: 'The AI-native web automation framework. Build robust tests with natural language actions and observations.',
    icon: '🎬',
    features: ['Natural Language Actions', 'Data Extraction', 'Self-Healing', 'Playwright Compatible'],
    link: '/tools/stagehand',
    relatedCourseId: 'intro-to-stagehand',
    docLink: 'https://www.stagehand.dev/',
    repoLink: 'https://github.com/browserbase/stagehand',
    summaryContent: `
## What is Stagehand?

Stagehand is an AI-native web automation framework designed to make browser automation as simple as describing it. It abstracts away the complexity of DOM selectors by using AI to understand the page and execute actions based on natural language intent.

### Core Concepts

Stagehand simplifies automation into three main primitives:

1.  **Act:** Perform actions on the page.
    *   \`await page.act("Click the 'Add to Cart' button")\`
2.  **Extract:** Retrieve structured data from the page.
    *   \`const data = await page.extract("Extract the product name and price")\`
3.  **Observe:** Check the state of the page or wait for conditions.
    *   \`await page.observe("Wait for the success modal to appear")\`

### Why use Stagehand?

*   **Zero Flakiness:** Stagehand analyzes the accessibility tree and visual layout to find elements, making it immune to minor DOM changes that break traditional selectors.
*   **Fast Authoring:** Write tests at the speed of thought without inspecting HTML or fighting with CSS classes.
*   **Seamless Integration:** It is built on top of Playwright, so you can mix standard Playwright code with Stagehand's AI commands in the same script.

### Installation

\`npm install stagehand\`

Stagehand creates a bridge between the deterministic reliability of Playwright and the semantic understanding of LLMs, offering a "best of both worlds" approach for modern QA.
`
  }
];

export const COURSES: Course[] = [
  {
    id: 'ai-testing-fundamentals',
    title: 'AI Testing Fundamentals',
    description: 'A comprehensive deep-dive into the paradigm shift of Quality Assurance. Learn how Generative AI, LLMs, and Computer Vision are redefining test authoring, execution, and maintenance. This course covers the strategic transition from manual scripts to intelligent, self-healing automation.',
    difficulty: 'Beginner',
    duration: '3.5 hours',
    image: 'https://picsum.photos/seed/ai-fund/800/600',
    tags: ['Fundamentals', 'Strategy', 'LLMs'],
    modules: [
      {
        id: 'mod-1',
        title: 'The AI QA Landscape',
        lessons: [
          { 
            id: 'l1', 
            title: 'Evolution of Testing', 
            duration: '15 min', 
            content: 'Trace the history from manual execution to script-based automation (Selenium) and finally to intent-based AI automation. Understand why previous tools failed to be "intelligent" and why LLMs change the game.' 
          },
          { 
            id: 'l2', 
            title: 'Types of AI in Testing', 
            duration: '20 min', 
            content: 'Distinguish between Generative AI (creating test code), Visual AI (analyzing UI layouts like a human), and Agentic AI (exploring apps autonomously without scripts).' 
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Core Mechanics',
        lessons: [
          { 
            id: 'l3', 
            title: 'Self-Healing Selectors', 
            duration: '25 min', 
            content: 'How AI analyzes the DOM tree structure to find elements even when IDs or classes change. We look at algorithms that weigh attributes like text, proximity, and ARIA labels.' 
          },
          { 
             id: 'l4',
             title: 'Synthetic Data & Edge Cases',
             duration: '20 min', 
             content: 'Using LLMs to generate diverse, realistic dataset permutations (e.g., valid addresses, edge-case names, SQL injection strings) to improve test coverage.'
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'Strategy & Career',
        lessons: [
          {
            id: 'l5',
            title: 'The "Quality Architect" Role',
            duration: '15 min',
            content: 'Transitioning your career from writing step-by-step scripts to designing high-level testing strategies and supervising AI agents.'
          }
        ]
      }
    ]
  },
  {
    id: 'playwright-automation',
    title: 'Modern Automation with Playwright',
    description: 'Master Playwright for resilient end-to-end testing. The foundation for any AI testing workflow.',
    difficulty: 'Intermediate',
    duration: '4 hours',
    image: 'https://picsum.photos/seed/playwright/800/600',
    tags: ['Automation', 'Code'],
    modules: [
      {
        id: 'pw-1',
        title: 'Getting Started',
        lessons: [
          { 
            id: 'pw-l0', 
            title: 'Playwright for absolute beginners', 
            duration: '15 min', 
            content: `
## Prerequisites

- Install Node.js 18+ so \`npx\` works from your terminal.
- Install VS Code (stable or Insiders) and sign in with the account you will use for Gemini / Copilot.
- Install the Gemini Code Assist extension or Gemini CLI integration for VS Code, following Google’s setup guide.

## Install Playwright MCP

- Open a terminal and run: \`npx @playwright/mcp@latest\` once to download dependencies. (Let it finish; first run may be slow.)
- In VS Code, install the “Playwright MCP” server using its Marketplace entry or Git-based instructions from the official repo.
- Confirm it can start by running \`npx @playwright/mcp@latest --help\` in the terminal without errors.

## Connect Playwright MCP to VS Code

- In your project, create a \`.vscode/mcp.json\` (or use the MCP UI) and add a server named \`playwright\` that runs \`npx @playwright/mcp@latest\` as its command.
- Alternatively, run the VS Code CLI command (from the repo docs) like \`code --add-mcp '{ "name": "playwright", "command": "npx", "args": ["@playwright/mcp@latest"] }'\` to auto-create the config.
- Reload VS Code; you should now see Playwright listed as an available MCP server in the MCP/agent settings.

## Connect Gemini to MCP

- Install the Gemini CLI globally (\`npm i -g @google/gemini-cli\`) and authenticate with your Google account.
- Open your Gemini settings file (for example \`~/.gemini/settings.json\`) and add a \`playwright\` MCP server entry pointing to the same \`npx @playwright/mcp@latest\` command or URL, following the MCP server config pattern.
- In VS Code, ensure Gemini (or Gemini CLI MCP extension) is enabled so Gemini can call MCP servers inside the editor.

## First “beginner” test in VS Code

- Open a simple test folder in VS Code (can be empty) and open the Gemini / agent chat panel.
- Type a prompt like: “Use the Playwright browser tools to open https://demo.playwright.dev/todomvc and add a todo item.”
- Wait while Gemini calls the Playwright MCP tools, watches the browser actions, and then copies the generated Playwright test code into a \`.spec.ts\` file when suggested.

## Basic mental model (for beginners)

- Think of Gemini as “the brain” that understands your natural language and test goals.
- Think of Playwright MCP as “the hands and eyes” that actually open the browser, click, type, and read the page for Gemini.
` 
          },
          { 
            id: 'pw-l1', 
            title: 'Installation & Setup',
            duration: '20 min',
            content: `
## Initial Setup

Playwright is designed to be easy to install and configure.

### Project Initialization

Run the following command in your terminal:
\`npm init playwright@latest\`

This will prompt you to:
1. Choose between TypeScript or JavaScript (Select TypeScript).
2. Name of your Tests folder (default: tests).
3. Add a GitHub Actions workflow (Yes).
4. Install Playwright browsers (Yes).

### Configuration

The \`playwright.config.ts\` file is where you configure your test runs. You can set:
- \`testDir\`: Where your tests are located.
- \`fullyParallel\`: Run tests in parallel.
- \`use\`: Global settings like \`baseURL\`, \`trace\`, and browser settings.

### Running Tests

- Run all tests: \`npx playwright test\`
- Run a specific file: \`npx playwright test tests/example.spec.ts\`
- Run in headed mode: \`npx playwright test --headed\`
- Show report: \`npx playwright show-report\`
            `
          }
        ]
      }
    ]
  },
  {
    id: 'intro-to-stagehand',
    title: 'Introduction to Stagehand',
    description: 'Stagehand is an open-source browser automation SDK from Browserbase, built on Playwright with AI for natural language control. It simplifies web testing, scraping, and workflows by mixing code with plain English prompts, making scripts more reliable and readable.',
    difficulty: 'Beginner',
    duration: '2 hours',
    image: 'https://picsum.photos/seed/stagehand/800/600',
    tags: ['AI Automation', 'Playwright', 'SDK'],
    modules: [
      {
        id: 'mod-sh-1',
        title: 'Core Concepts',
        lessons: [
          {
            id: 'l-sh-1',
            title: 'Overview',
            duration: '10 min',
            content: `
Stagehand is an open-source browser automation SDK from Browserbase, built on Playwright with AI for natural language control. It simplifies web testing, scraping, and workflows by mixing code with plain English prompts, making scripts more reliable and readable.

It acts as a bridge between the deterministic reliability of Playwright and the semantic understanding of LLMs, offering a "best of both worlds" approach for modern QA.
`
          },
          {
            id: 'l-sh-2',
            title: 'Core Methods',
            duration: '20 min',
            content: `
## Core Methods

- **\`act("description")\`**: Performs actions like "click the login button and enter credentials"—AI handles selectors and waits automatically.
- **\`extract(schema)\`**: Pulls structured data (e.g., JSON) from pages using simple schemas, ideal for scraping tables or forms.
- **\`observe("query")\`**: Analyzes elements semantically, e.g., "find the product price near the add-to-cart button."
- **\`agent()\`**: Chains multi-step tasks into autonomous workflows with retries and self-healing.
`
          }
        ]
      },
      {
        id: 'mod-sh-2',
        title: 'Configuration',
        lessons: [
          {
            id: 'l-sh-3',
            title: 'Setup and Integration',
            duration: '20 min',
            content: `
## Setup and Integration

- **Install**: \`npm install stagehand\` (Node.js/TypeScript focus).
- **Usage**: Attach to a Playwright \`page\` object, e.g., \`const stagehand = new Stagehand(page);\`.
- **Modes**: Local headless, visual debugging, or cloud via Browserbase for scaling.
- **Tools**: Works with Jest, pytest, CrewAI; supports mocks, screenshots, videos, and parallel runs.
`
          }
        ]
      },
      {
        id: 'mod-sh-3',
        title: 'Use Cases',
        lessons: [
          {
            id: 'l-sh-4',
            title: 'Benefits & Scenarios',
            duration: '15 min',
            content: `
## Key Benefits
- Self-healing: Adapts to UI changes without breaking tests.
- Caching/Retries: Reduces LLM calls and flakiness vs. Selenium/Playwright alone.
- Readability: Tests read like stories, cutting maintenance by handling dynamic SPAs.

## Ideal Use Cases
- E2E testing on e-commerce or dashboards.
- AI agent automation for data extraction.

## Limitations
- Best with precise prompts; vague ones raise costs/errors.
- Free and actively updated on GitHub.
`
          }
        ]
      }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'playwright-mcp-beginners',
    title: 'Playwright MCP for absolute beginners',
    excerpt: 'Playwright MCP revolutionizes browser automation by letting AI agents control browsers through natural language instructions. This beginner-friendly guide explains MCP fundamentals, Playwright MCP specifics, and hands-on setup.',
    date: 'May 12, 2024',
    author: 'Elena Fisher',
    readTime: '6 min',
    category: 'MCP',
    content: `
# Playwright MCP for Absolute Beginners

Playwright MCP revolutionizes browser automation by letting AI agents control browsers through natural language instructions. This beginner-friendly guide explains MCP fundamentals, Playwright MCP specifics, and hands-on setup.

## What is MCP?

Model Context Protocol (MCP) standardizes how AI agents connect to external tools and data sources via open APIs. The MCP server exposes structured capabilities—like browser actions—as callable tools, while the MCP client in AI platforms (VS Code, Cursor) handles requests and responses.

AI agents interact seamlessly: the agent requests a tool (e.g., "click login button"), the client formats it via MCP, the server executes on a real browser, and returns structured feedback like accessibility tree snapshots instead of raw screenshots.

This protocol ensures deterministic, LLM-friendly automation without vision models, making agents more reliable for web tasks.

## Playwright MCP Explained

Playwright MCP is an MCP-compliant server wrapping Microsoft's Playwright framework, exposing 30+ browser tools for AI control across Chrome, Firefox, and WebKit.

Key tools include \`browser_navigate\` for URLs, \`browser_click\`/\`browser_type\` for interactions, \`browser_snapshot\` for semantic page state via accessibility trees, and utilities like screenshots or PDF generation.

It uses accessibility trees—semantic UI abstractions with roles, names, and states—for precise, structured feedback, outperforming pixel-based methods.

## Why Choose Playwright MCP?

Playwright MCP excels over manual coding by enabling AI-driven automation: agents explore sites, detect bugs, generate tests, and debug via natural prompts, slashing scripting time.

Manual Playwright requires locators and error-prone selectors; MCP uses semantic descriptions (e.g., "click submit button"), auto-generates locators, and handles dynamic UIs via real-time snapshots.

Benefits include speed (no vision processing), determinism, and scalability for testing, exploration, or E2E workflows—ideal for beginners avoiding code complexity.

## Quick Installation Guide

Install via npm: \`npx @playwright/mcp@latest\` (Node.js 18+ required).

**VS Code/Cursor Setup** (standard config in settings.json):
\`\`\`
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
\`\`\`
Restart your IDE; the server launches on demand. Add flags like \`--headless\` or \`--isolated\` for options.

Verify: Chat "Navigate to example.com and take a screenshot"—AI uses tools automatically.

## Hands-On Usage and Effectiveness

Prompt your AI: "Go to playwright.dev, click 'Get Started', fill email with 'test@example.com', and snapshot." The agent chains \`browser_navigate\` → \`browser_click\` → \`browser_type\` → \`browser_snapshot\`.

Effectiveness shines in test generation (\`browser_generate_playwright_test\`), bug hunting via console/network logs, and zero-code exploration—up to 10x faster than manual scripts per demos.

Start small, iterate prompts; persistent profiles retain logins for real-world flows.
    `
  },
  {
    id: 'ai-driven-qa',
    title: 'The Shift to AI-Driven QA',
    excerpt: 'How Large Language Models are transforming the way we write, maintain, and execute automated tests.',
    date: 'March 15, 2024',
    author: 'Elena Fisher',
    readTime: '5 min',
    category: 'Strategy',
    content: `
## The New Era of Quality Assurance

Gone are the days of brittle XPath selectors and endless maintenance of Selenium scripts. AI is introducing a paradigm shift: **Intent-based testing**.

### From Selectors to Semantics

Traditional automation relies on DOM structure (IDs, classes). If a developer changes a class name, the test breaks. AI agents, however, "see" the page like a human. They look for "The Login Button" regardless of its underlying markup.

### Self-Healing Tests

Modern tools can automatically detect when a selector fails and attempt to find the element using alternative attributes or visual matching, updating the test code in real-time.

## Conclusion

Embracing AI doesn't mean replacing QA engineers. It means elevating them to "Quality Architects" who design strategies rather than fixing broken scripts.
    `
  },
  {
    id: 'playwright-vs-cypress',
    title: 'Playwright vs Cypress: 2024 Edition',
    excerpt: 'A detailed comparison of the two leading automation frameworks and why Playwright is winning.',
    date: 'April 02, 2024',
    author: 'Marcus Chen',
    readTime: '8 min',
    category: 'Playwright',
    content: `
## Speed and Stability

Playwright uses the Chrome DevTools Protocol (CDP) to communicate directly with the browser, offering faster execution and greater stability compared to Cypress's in-browser execution model.

## Browser Support

Playwright supports all modern rendering engines (Chromium, WebKit, Firefox) with a single API. Cypress has historically struggled with full multi-browser support, especially WebKit.

## Parallelization

Playwright offers free, unlimited parallelization on your own machine. Cypress charges for this feature via their cloud service.

## Verdict

For modern, complex web applications, Playwright provides a more robust and flexible foundation for scaling your test suites.
    `
  },
  {
    id: 'visual-regression-ai',
    title: 'Visual Regression in the AI Era',
    excerpt: 'Pixel-perfect matching is brittle. Learn how AI-powered visual testing ignores dynamic content while catching real UI bugs.',
    date: 'April 10, 2024',
    author: 'Sarah Jenkins',
    readTime: '6 min',
    category: 'Strategy',
    content: `
## The Problem with Pixel Matching

Traditional visual testing tools compare screenshots pixel-by-pixel. If a single pixel shifts due to rendering differences or dynamic data (like dates), the test fails. This creates "noise" and fatigue.

## AI to the Rescue

Modern AI Visual tools (like Applitools or Percy's AI mode) analyze the *structure* and *content* of the page.

### Layout vs. Content
They can distinguish between:
*   **Layout changes:** The button moved 50px to the left (Bug?)
*   **Content changes:** The "Latest News" text changed (Expected)
*   **Dynamic regions:** Ads or rotating banners (Ignore)

## Implementation in Playwright

\`\`\`typescript
import { test, expect } from '@playwright/test';

test('AI visual check', async ({ page }) => {
  await page.goto('https://example.com');
  // Instead of standard toHaveScreenshot()
  await aiVisualCheck(page, 'Homepage'); 
});
\`\`\`
    `
  },
  {
    id: 'llms-test-data',
    title: 'Generating Synthetic Test Data with LLMs',
    excerpt: 'Stop using static JSON files. Use LLMs to generate diverse, edge-case rich user data on the fly for your test suites.',
    date: 'April 18, 2024',
    author: 'David Ross',
    readTime: '4 min',
    category: 'AI Agents',
    content: `
## The Data Problem

Testing is only as good as the data you feed it. Using the same 'John Doe' user for every test hides bugs related to:
*   Long names
*   Special characters
*   International addresses

## Using Gemini for Data Gen

You can use the Gemini API to generate a JSON array of users with specific characteristics during your test setup.

### Example Prompt
"Generate 5 user profiles for a banking app. One should be a minor, one should have a very long name, and one should have an address with non-ASCII characters."

### Integration

Call this API in your \`globalSetup\` or \`beforeAll\` hook in Playwright, seed your test database, and run your tests against this fresh, diverse data.
    `
  }
];

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'q1',
    question: 'What is the main difference between Playwright and Selenium?',
    answer: 'Playwright interacts directly with the browser engine via protocols like CDP, making it faster and less flaky. Selenium uses the WebDriver protocol which requires an intermediate server and HTTP requests for each action.',
    category: 'Playwright'
  },
  {
    id: 'q2',
    question: 'Explain the concept of "Auto-waiting" in Playwright.',
    answer: 'Playwright performs a range of actionability checks on elements before performing actions. It ensures an element is attached to DOM, visible, stable, receives events, and is enabled before clicking or typing, eliminating the need for arbitrary sleeps.',
    category: 'Playwright'
  },
  {
    id: 'q3',
    question: 'How can AI Agents improve test maintenance?',
    answer: 'AI agents can use "Self-Healing" mechanisms. When a test fails due to a changed selector, the agent analyzes the page structure to find the element based on its visual appearance or text content and updates the test script automatically.',
    category: 'AI Agents'
  },
  {
    id: 'q4',
    question: 'What is the Model Context Protocol (MCP)?',
    answer: 'MCP is a standard that allows AI models (like in Cursor or Claude) to connect to external tools and data contexts. In QA, it enables an AI editor to directly read test logs, run tests, and inspect the database without manual copy-pasting.',
    category: 'MCP'
  },
  {
    id: 'q5',
    question: 'What is Visual Regression Testing?',
    answer: 'Visual regression testing verifies that the visual appearance of the application has not changed unexpectedly. It compares screenshots of the current build against baseline screenshots, often using AI to ignore minor rendering differences.',
    category: 'General'
  },
  {
    id: 'q6',
    question: 'How do you handle authentication in Playwright to save time?',
    answer: 'Playwright allows you to save the browser storage state (cookies, local storage) to a JSON file after logging in once. You can then configure your test suite to reuse this state file, bypassing the login screen for subsequent tests.',
    category: 'Playwright'
  },
  {
    id: 'q7',
    question: 'What is MCP, and how does Playwright MCP implement it?',
    answer: 'MCP (Model Context Protocol) standardizes AI agent communication with tools like browsers through structured APIs. Playwright MCP is a server that exposes Playwright\'s browser controls (e.g., navigate, click, snapshot) as MCP tools, allowing LLMs in VS Code or Cursor to execute actions via natural language without custom code.',
    category: 'MCP'
  },
  {
    id: 'q8',
    question: 'Explain the role of accessibility trees in Playwright MCP versus traditional screenshots.',
    answer: 'Accessibility trees provide semantic page structure (roles, names, states) for precise, text-based feedback to AI agents, enabling reliable element targeting without vision models. Screenshots are pixel-based and flaky for dynamic UIs; trees make interactions deterministic and faster.',
    category: 'MCP'
  },
  {
    id: 'q9',
    question: 'Walk through setting up Playwright MCP in VS Code and a sample AI prompt workflow.',
    answer: 'Add to settings.json: `{"mcpServers": {"playwright": {"command": "npx", "args": ["@playwright/mcp@latest"]}}}`. Restart VS Code, then prompt: "Navigate to example.com, click \'Submit\', and snapshot." The agent chains tools like `browser_navigate` and `browser_snapshot` automatically.',
    category: 'MCP'
  },
  {
    id: 'q10',
    question: 'Compare Playwright MCP to manual Playwright scripting for test generation.',
    answer: 'MCP lets AI auto-generate tests via `browser_generate_playwright_test` from exploration, handling locators semantically. Manual coding needs explicit selectors and waits, making it slower for beginners or exploratory tasks but more precise for complex logic.',
    category: 'Playwright'
  }
];
