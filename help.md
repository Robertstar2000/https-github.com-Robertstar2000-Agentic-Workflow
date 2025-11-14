### Welcome to the AI Workflow System!

This guide will walk you through setting up and using the platform to automate complex tasks.

---

### 1. What is this?

The AI Workflow System is a powerful tool that uses a team of AI agents (Planner, Worker, and QA) to achieve a goal you provide. It breaks down your objective into smaller steps, executes them one by one, and checks its work along the way, correcting course as needed. This allows it to handle much more complex tasks than a simple single-prompt request.

---

### 2. Getting Started: Your First Workflow

#### Step 1: Configure Your LLM Provider
Before you can run a workflow, you need to tell the system which Large Language Model (LLM) to use.

1.  Click the **Settings icon (⚙️)** in the top-right corner.
2.  Select your desired LLM provider from the list on the left (e.g., Google, OpenAI, Ollama).
3.  Fill in the required information. This typically includes an **API Key** and a **Model Name**. For local providers like Ollama, you may need to provide an **Endpoint URL**.
4.  Use the **"Test Connection"** button to ensure your settings are correct. You should see a green checkmark if the connection is successful.
5.  Your settings are saved automatically.

#### Step 2: Define Your Goal
In the main input area, describe what you want the AI to do. For best results, be clear and specific.

*   **Good example:** "Analyze the provided JSON data of user feedback, identify the top 3 most common complaints, and generate a summary report in Markdown format."
*   **Vague (but still works!):** "Improve our system's performance." The AI will attempt to create a plan to investigate and suggest improvements.

#### Step 3: Run the Workflow
Click the **"Run Workflow"** button. The system will now begin its Planner -> Worker -> QA loop. You can watch its progress in the results panel below.

---

### 3. Understanding the Interface

*   **Status Panel:** Shows the current status (Running, Completed, etc.) and the current iteration number.
*   **Result:** Once the workflow is complete, the final result will be displayed here in Markdown format.
*   **User-facing summary:** A brief, plain-language summary of the outcome or the current state of the workflow.
*   **JSON Payload:** The complete, final state of the workflow, including all steps, artifacts, and logs. This is useful for debugging or programmatic use.
*   **Download Buttons:** You can download the final result as a PDF or Markdown file, the summary as a text file, and the JSON state.

---

### 4. Supported LLM Providers

*   **Google:** Uses the API key provided by the execution environment. No special configuration is needed.
*   **OpenAI / Claude / OpenRouter:** Require an API key and the specific model name you wish to use.
*   **Ollama:** Designed for running local models. Requires the model name (e.g., `llama3`) and the URL of your Ollama server (defaults to `http://localhost:11434`).

---

### 5. Security

Your API keys are sensitive. This application encrypts them using the browser's native Web Crypto API before saving them to your browser's local storage. They are never stored in plaintext.

---

### 6. Troubleshooting

*   **Connection Error:** If a "Test Connection" fails, double-check your API Key and Endpoint URL. Ensure there are no extra spaces or typos.
*   **Model Returned Invalid Response:** This can sometimes happen if the LLM produces a malformed JSON object. Simply try running the workflow again. If the problem persists, try a different model or simplify your goal.
