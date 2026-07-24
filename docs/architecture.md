# Sentra Architecture

## Purpose

Sentra is an AI Security Evaluation Platform designed to help developers, students, and security enthusiasts evaluate the security of AI-powered applications through safe, defensive testing.

The platform focuses on identifying common AI security risks such as prompt injection, jailbreak attempts, and unsafe AI responses in a controlled local environment.

It is intended for learning, research, and defensive security practices only.

## Target Users

Sentra is designed for:

- Students learning AI and cybersecurity.
- Developers building AI-powered applications.
- Security researchers exploring AI security concepts.
- Cybersecurity professionals who want to safely evaluate AI applications.
- Beginners who want to understand AI security concepts through guided explanations and safe experiments.

The platform is intended for educational, research, and defensive security purposes. It is not designed to facilitate attacks against real-world systems.

## Project Goals

Version 1 of Sentra aims to:

- Provide a safe environment to test AI prompts.
- Detect common prompt injection attempts.
- Analyze AI responses for potential security risks.
- Generate clear and beginner-friendly security reports.
- Help users understand why a prompt or response is considered risky.
- Maintain a modular architecture that can be extended with new AI security modules in the future.

## Version 1 Scope

### Included

- Local AI chat interface.
- Prompt injection detection.
- AI response analysis.
- Risk scoring for prompts and responses.
- Logging of interactions.
- Security report generation.

### Not Included

- Cloud deployment.
- User authentication.
- Multi-user support.
- RAG security testing.
- Vision model security.
- MCP security testing.
- Plugin marketplace.

## Core Modules

### Home

Provides an overview of Sentra, recent activity, and quick navigation to security testing modules.

### Prompt Injection

Allows users to test prompts for common prompt injection techniques and view detection results.

### AI Response Analysis

Evaluates AI-generated responses for unsafe behavior, policy violations, or suspicious outputs.

### Reports

Displays previously generated security reports and allows users to export findings.

### History

Stores previous prompt evaluations, responses, timestamps, and risk scores for future reference.

### Settings

Provides configuration options such as AI model selection, application preferences, and future feature settings.

## User Workflow

1. User opens Sentra.
2. User enters a prompt.
3. Sentra analyzes the prompt for security risks.
4. Sentra displays the analysis results and recommendations.
5. The user chooses whether to send the prompt to the AI.
6. The AI generates a response.
7. Sentra analyzes the AI response.
8. The interaction is saved to the history.
9. The user can generate a security report.
