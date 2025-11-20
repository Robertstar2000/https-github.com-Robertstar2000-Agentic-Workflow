
import type { LLMSettings, WorkflowState } from "../types";

const API_URL = '/api/workflow';

const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

/**
 * Executes a single iteration of the workflow using the backend API.
 * @param {WorkflowState} currentState - The state of the workflow before the iteration.
 * @param {LLMSettings} settings - The configured LLM provider settings.
 * @param {string} [ragContent] - Optional knowledge content for the RAG system.
 * @returns {Promise<WorkflowState>} The workflow state after the iteration.
 */
export const runWorkflowIteration = async (currentState: WorkflowState, settings: LLMSettings, ragContent?: string): Promise<WorkflowState> => {
    const response = await fetch(`${API_URL}/run`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentState, settings, ragContent })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Workflow execution failed: ${errorText}`);
    }

    return await response.json();
};

/**
 * Tests the connection to the currently configured LLM provider via the backend.
 * @param {LLMSettings} settings - The LLM settings to test.
 * @returns {Promise<boolean>} A promise that resolves to true if the connection is successful.
 */
export const testProviderConnection = async (settings: LLMSettings): Promise<boolean> => {
    const response = await fetch(`${API_URL}/test-connection`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ settings })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Connection test failed: ${errorText}`);
    }

    const data = await response.json();
    return data.success;
};
