---
agent: agent
description: 'Self-review current vs v6 branch - identify KISS violations, code issues, and PR feedback items'
---

# Self-Review: Current vs v6 Branch

Please perform a comprehensive self-review of the current compared to v6 branch:

## Analysis Focus Areas:

1. **KISS Principle Violations** - Identify overly complex solutions that could be simplified
2. **Code Quality Issues** - Spot potential bugs, security issues, performance problems
3. **Best Practice Deviations** - Find patterns that don't follow project conventions
4. **Architecture Concerns** - Identify design decisions that may cause future maintenance issues
5. **Testing Gaps** - Areas that lack proper test coverage
6. **Documentation Issues** - Missing or unclear documentation

## Review Process:

1. Compare all changed files between current and v6 branch
2. Analyze the diff for each file focusing on the areas above
3. Look for patterns across multiple files that suggest systemic issues
4. Prioritize feedback by impact: Critical > Major > Minor > Nit

## Output Format:

Provide structured feedback with:

- **File:Line** references for specific issues
- **Category** (KISS/Quality/Practice/Architecture/Testing/Docs)
- **Impact Level** (Critical/Major/Minor/Nit)
- **Issue Description** with clear explanation
- **Suggested Fix** with concrete improvement
- **Colorful Output** for readability and emphasis
