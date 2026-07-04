PROMPT_INJECTION_RULES = {
    "ignore previous instructions": {
        "severity": "High",
        "score": 90,
        "description": "Attempts to override previous instructions."
    },
    "system prompt": {
        "severity": "High",
        "score": 90,
        "description": "Attempts to reveal the system prompt."
    },
    "developer mode": {
        "severity": "Medium",
        "score": 70,
        "description": "Attempts to enter developer mode."
    },
    "jailbreak": {
        "severity": "High",
        "score": 95,
        "description": "Known jailbreak attempt."
    },
    "dan": {
        "severity": "High",
        "score": 95,
        "description": "Attempts to invoke DAN jailbreak."
    },
    "bypass": {
        "severity": "Medium",
        "score": 60,
        "description": "Attempts to bypass restrictions."
    },
    "forget your instructions": {
        "severity": "High",
        "score": 90,
        "description": "Attempts to ignore original instructions."
    }
}


def detect_prompt_injection(prompt: str):
    prompt_lower = prompt.lower()

    detections = []

    for keyword, details in PROMPT_INJECTION_RULES.items():
        if keyword in prompt_lower:
            detections.append({
                "rule": keyword,
                "severity": details["severity"],
                "score": details["score"],
                "description": details["description"]
            })

    return detections