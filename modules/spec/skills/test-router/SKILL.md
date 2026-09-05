---
name: test-router
description: Detects project type, runs appropriate tests, validates against spec scenarios, and reports results.
---

# Test Router

## Overview

The Test Router handles testing and validation after implementation. It detects the project type and test framework, runs appropriate tests, validates against spec scenarios, reports results with clear feedback, and suggests fixes for failures.

## How It Works

The Test Router follows a four-phase workflow: detect the project type, run the appropriate tests, validate that spec scenarios are covered, and report the results with actionable feedback.

**Workflow:**

1. Detect project type and test framework
2. Run appropriate tests
3. Validate against spec scenarios
4. Report results
5. Suggest fixes for failures

## Usage

### Phase 1: Detect Project Type

```
Test Router:
- Check for package.json (Node.js)
- Check for pyproject.toml (Python)
- Check for go.mod (Go)
- Identify test framework
```

### Phase 2: Run Tests

```
Test Router:
- Run project tests
- Capture output
- Parse results
```

### Phase 3: Validate Scenarios

```
Test Router:
- Read spec scenarios
- Map scenarios to tests
- Verify all scenarios covered
```

### Phase 4: Report Results

```
Test Router:
- Pass/Fail summary
- Failed test details
- Coverage information
- Scenario validation status
```

## Project Detection

### Node.js

```bash
cat package.json | jq '.scripts.test'
npm test
```

### Python

```bash
cat pyproject.toml | grep -A5 '\[tool.pytest\]'
pytest
```

### Go

```bash
cat go.mod
go test ./...
```

## Test Types

| Type                | Purpose                            | When                              |
| ------------------- | ---------------------------------- | --------------------------------- |
| Unit Tests          | Test individual functions/methods  | After each implementation task    |
| Integration Tests   | Test component interactions        | After multiple tasks              |
| Spec Scenario Tests | Validate against spec requirements | After all implementation complete |

## Scenario Validation

### Read Spec Scenarios

```markdown
#### Scenario: Login endpoint

- **WHEN** user provides valid credentials
- **THEN** system returns JWT token
```

### Map to Tests

```
Scenario: Login endpoint
→ Test: test_login_success()
→ Verify: returns JWT token
```

### Validate Coverage

```
Scenarios: 5
Tests: 5
Coverage: 100%
```

## Output

Test results with pass/fail summary, failed test details with file:line references, coverage information, and scenario validation status.

### Success

```
✓ All tests passed
✓ All scenarios covered
✓ Ready for archival
```

### Failure

```
✗ 2 tests failed
  - test_login_invalid_password (line 42)
  - test_login_expired_token (line 58)
✗ 1 scenario not covered
  - "WHEN user account is locked"
```

### Fix Suggestions

```
For test_login_invalid_password:
- Check error handling in auth/login.ts:42
- Verify error message format

For test_login_expired_token:
- Check JWT validation in auth/jwt.ts:58
- Verify token expiration logic
```

## Integration

### With Build Agent

```
Build Agent → Test Router
Input: Implemented code, spec scenarios
Output: Test results, validation status
```

### With Archive

```
Test Router → Archive
Input: Passing tests, scenario coverage
Output: Ready for archival
```

### With Lightspec

```
lightspec update <id> --task <task-id> --status testing
lightspec update <id> --task <task-id> --status done
```

## Present Results

Present test results organized by severity: blocking failures first, then warnings, then coverage gaps. For each failure, provide file:line references and suggested fixes.

## Troubleshooting

- **No test framework detected**: If the project has no recognizable test framework, suggest one appropriate to the project type.
- **All tests fail**: Check if the project builds first. A build failure before test execution suggests a configuration issue.
- **Missing scenario coverage**: If spec scenarios have no corresponding tests, flag them as untested and suggest test additions.
