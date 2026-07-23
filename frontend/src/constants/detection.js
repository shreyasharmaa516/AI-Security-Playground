/**
 * Shared detection-category contract.
 * Both the Analysis feature (live scanning) and the History feature
 * (viewing past results) need the same category list — this is the single
 * source of truth so the two never drift apart.
 */
export const DETECTION_CATEGORIES = [
  { id: 'prompt_injection', label: 'Prompt Injection' },
  { id: 'jailbreak', label: 'Jailbreak Attempt' },
  { id: 'sensitive_info', label: 'Sensitive Information Disclosure' },
  { id: 'role_manipulation', label: 'Role Manipulation' },
  { id: 'unsafe_instructions', label: 'Unsafe Instructions' },
];

export const CONTEXT_OPTIONS = [
  { value: 'system_prompt', label: 'System Prompt' },
  { value: 'user_input', label: 'User Input' },
  { value: 'agent_tool_output', label: 'Agent Tool Output' },
];
