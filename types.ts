
export interface ProviderSettings {
    apiKey?: string;
    model: string;
    baseURL?: string;
}

export interface LLMSettings {
    provider: 'google' | 'openai' | 'claude' | 'openrouter' | 'ollama';
    google: ProviderSettings;
    openai: ProviderSettings;
    claude: ProviderSettings;
    openrouter: ProviderSettings;
    ollama: ProviderSettings;
}

export interface RunLogEntry {
    iteration: number;
    agent: 'Planner' | 'Worker' | 'QA';
    summary: string;
}

export interface Artifact {
    key: string;
    /** The content of the artifact. If it's a complex object or array, it should be a JSON string. */
    value: string;
}

export interface InternalState {
    goal: string;
    steps: string[];
    /** A record of the initial plan created by the Planner. This should not be modified after creation. */
    initialPlan?: string[];
    artifacts: Artifact[];
    notes: string;
    progress: string;
}

export type WorkflowStatus = 'running' | 'completed' | 'needs_clarification' | 'error';

export interface WorkflowState {
    goal: string;
    maxIterations: number;
    currentIteration: number;
    status: WorkflowStatus;
    runLog: RunLogEntry[];
    state: InternalState;
    finalResultMarkdown: string;
    finalResultSummary: string;
}
