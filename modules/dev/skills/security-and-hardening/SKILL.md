---
name: security-and-hardening
description: Hardens code against vulnerabilities and runs adversarial red-team review (architecture conformance, stub detection, security, story gaps) that exposes weaknesses with failing tests. Use when handling user input, authentication, data storage, or external integrations. Use when building any feature that accepts untrusted data, manages user sessions, or interacts with third-party services, or when adversarially probing an implementation.
---

# Security and Hardening

## Overview

Security-first development practices for web applications. Treat every external input as hostile, every secret as sacred, and every authorization check as mandatory. Security isn't a phase — it's a constraint on every line of code that touches user data, authentication, or external systems.

## When to Use

- Building anything that accepts user input
- Implementing authentication or authorization
- Storing or transmitting sensitive data
- Integrating with external APIs or services
- Adding file uploads, webhooks, or callbacks
- Handling payment or PII data

## The Three-Tier Boundary System

### Always Do (No Exceptions)

- **Validate all external input** at the system boundary (API routes, form handlers)
- **Parameterize all database queries** — never concatenate user input into SQL
- **Encode output** to prevent XSS (use framework auto-escaping, don't bypass it)
- **Use HTTPS** for all external communication
- **Hash passwords** with bcrypt/scrypt/argon2 (never store plaintext)
- **Set security headers** (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
- **Use httpOnly, secure, sameSite cookies** for sessions
- **Run `npm audit`** (or equivalent) before every release

### Ask First (Requires Human Approval)

- Adding new authentication flows or changing auth logic
- Storing new categories of sensitive data (PII, payment info)
- Adding new external service integrations
- Changing CORS configuration
- Adding file upload handlers
- Modifying rate limiting or throttling
- Granting elevated permissions or roles

### Never Do

- **Never commit secrets** to version control (API keys, passwords, tokens)
- **Never log sensitive data** (passwords, tokens, full credit card numbers)
- **Never trust client-side validation** as a security boundary
- **Never disable security headers** for convenience
- **Never use `eval()` or `innerHTML`** with user-provided data
- **Never store sessions in client-accessible storage** (localStorage for auth tokens)
- **Never expose stack traces** or internal error details to users

## OWASP Top 10 Prevention

### 1. Injection (SQL, NoSQL, OS Command)

```typescript
// BAD: SQL injection via string concatenation
const query = `SELECT * FROM users WHERE id = '${userId}'`;

// GOOD: Parameterized query
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);

// GOOD: ORM with parameterized input
const user = await prisma.user.findUnique({ where: { id: userId } });
```

### 2. Broken Authentication

```typescript
// Password hashing
import { hash, compare } from 'bcrypt';

const SALT_ROUNDS = 12;
const hashedPassword = await hash(plaintext, SALT_ROUNDS);
const isValid = await compare(plaintext, hashedPassword);

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET,  // From environment, not code
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,     // Not accessible via JavaScript
    secure: true,       // HTTPS only
    sameSite: 'lax',    // CSRF protection
    maxAge: 24 * 60 * 60 * 1000,  // 24 hours
  },
}));
```

### 3. Cross-Site Scripting (XSS)

```typescript
// BAD: Rendering user input as HTML
element.innerHTML = userInput;

// GOOD: Use framework auto-escaping (React does this by default)
return <div>{userInput}</div>;

// If you MUST render HTML, sanitize first
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
```

### 4. Broken Access Control

```typescript
// Always check authorization, not just authentication
app.patch('/api/tasks/:id', authenticate, async (req, res) => {
  const task = await taskService.findById(req.params.id);

  // Check that the authenticated user owns this resource
  if (task.ownerId !== req.user.id) {
    return res.status(403).json({
      error: { code: 'FORBIDDEN', message: 'Not authorized to modify this task' }
    });
  }

  // Proceed with update
  const updated = await taskService.update(req.params.id, req.body);
  return res.json(updated);
});
```

### 5. Security Misconfiguration

```typescript
// Security headers (use helmet for Express)
import helmet from 'helmet';
app.use(helmet());

// Content Security Policy
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],  // Tighten if possible
    imgSrc: ["'self'", 'data:', 'https:'],
    connectSrc: ["'self'"],
  },
}));

// CORS — restrict to known origins
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true,
}));
```

### 6. Sensitive Data Exposure

```typescript
// Never return sensitive fields in API responses
function sanitizeUser(user: UserRecord): PublicUser {
  const { passwordHash, resetToken, ...publicFields } = user;
  return publicFields;
}

// Use environment variables for secrets
const API_KEY = process.env.STRIPE_API_KEY;
if (!API_KEY) throw new Error('STRIPE_API_KEY not configured');
```

## Input Validation Patterns

### Schema Validation at Boundaries

```typescript
import { z } from 'zod';

const CreateTaskSchema = z.object({
  title: z.string().min(1).max(200).trim(),
  description: z.string().max(2000).optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  dueDate: z.string().datetime().optional(),
});

// Validate at the route handler
app.post('/api/tasks', async (req, res) => {
  const result = CreateTaskSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(422).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input',
        details: result.error.flatten(),
      },
    });
  }
  // result.data is now typed and validated
  const task = await taskService.create(result.data);
  return res.status(201).json(task);
});
```

### File Upload Safety

```typescript
// Restrict file types and sizes
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function validateUpload(file: UploadedFile) {
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    throw new ValidationError('File type not allowed');
  }
  if (file.size > MAX_SIZE) {
    throw new ValidationError('File too large (max 5MB)');
  }
  // Don't trust the file extension — check magic bytes if critical
}
```

## Triaging npm audit Results

Not all audit findings require immediate action. Use this decision tree:

```
npm audit reports a vulnerability
├── Severity: critical or high
│   ├── Is the vulnerable code reachable in your app?
│   │   ├── YES --> Fix immediately (update, patch, or replace the dependency)
│   │   └── NO (dev-only dep, unused code path) --> Fix soon, but not a blocker
│   └── Is a fix available?
│       ├── YES --> Update to the patched version
│       └── NO --> Check for workarounds, consider replacing the dependency, or add to allowlist with a review date
├── Severity: moderate
│   ├── Reachable in production? --> Fix in the next release cycle
│   └── Dev-only? --> Fix when convenient, track in backlog
└── Severity: low
    └── Track and fix during regular dependency updates
```

**Key questions:**
- Is the vulnerable function actually called in your code path?
- Is the dependency a runtime dependency or dev-only?
- Is the vulnerability exploitable given your deployment context (e.g., a server-side vulnerability in a client-only app)?

When you defer a fix, document the reason and set a review date.

## Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// General API rate limit
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                   // 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
}));

// Stricter limit for auth endpoints
app.use('/api/auth/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,  // 10 attempts per 15 minutes
}));
```

## Secrets Management

```
.env files:
  ├── .env.example  → Committed (template with placeholder values)
  ├── .env          → NOT committed (contains real secrets)
  └── .env.local    → NOT committed (local overrides)

.gitignore must include:
  .env
  .env.local
  .env.*.local
  *.pem
  *.key
```

**Always check before committing:**
```bash
# Check for accidentally staged secrets
git diff --cached | grep -i "password\|secret\|api_key\|token"
```

## Security Review Checklist

```markdown
### Authentication
- [ ] Passwords hashed with bcrypt/scrypt/argon2 (salt rounds ≥ 12)
- [ ] Session tokens are httpOnly, secure, sameSite
- [ ] Login has rate limiting
- [ ] Password reset tokens expire

### Authorization
- [ ] Every endpoint checks user permissions
- [ ] Users can only access their own resources
- [ ] Admin actions require admin role verification

### Input
- [ ] All user input validated at the boundary
- [ ] SQL queries are parameterized
- [ ] HTML output is encoded/escaped

### Data
- [ ] No secrets in code or version control
- [ ] Sensitive fields excluded from API responses
- [ ] PII encrypted at rest (if applicable)

### Infrastructure
- [ ] Security headers configured (CSP, HSTS, etc.)
- [ ] CORS restricted to known origins
- [ ] Dependencies audited for vulnerabilities
- [ ] Error messages don't expose internals
```
## Red team

Adversarial review mode. Find weaknesses and expose them with failing tests — never fix them, never modify implementation. Only write NEW test files.

### Priorities (work in order)

1. **Architecture conformance** — every dependency/pattern in the architecture doc is actually imported/used in source
2. **Stub/scaffolding detection** — no hardcoded, faked, or placeholder implementations shipped as done
3. **Security and edge cases** — input boundaries defended, auth enforced, data handled safely
4. **Story completeness** — every acceptance criterion implemented and tested

Skip a priority only when its input (architecture doc / stories) is unavailable.

### Attack categories

**Architecture conformance** — for each dependency in the architecture doc's Dependencies table:

```bash
grep -r "from ['\"]${DEPENDENCY}['\"]" src/ --include="*.ts" --include="*.js"
```

Missing import → write a conformance test that fails:

```typescript
it("should import ${dependency} (per architecture doc)", () => {
  const source = readFileSync("src/services/${file}", "utf-8");
  expect(source).toMatch(/import.*from\s+['"]${dependency}['"]/);
});
```

Also verify: integration patterns followed, file structure matches arch doc, expected exports exist.

**Stub detection** — scan for hardcoded returns, TODO/FIXME/STUB markers, `NotImplementedError`, regex classifiers where LLM/API calls are specified, empty bodies, console.log as error handling:

```bash
# Hardcoded returns
grep -rn "return.*{.*:.*}" src/ --include="*.ts" | grep -v "test\|spec\|mock"

# Explicit markers
grep -rn "TODO\|FIXME\|STUB\|HACK\|XXX\|PLACEHOLDER" src/ --include="*.ts"

# Not implemented
grep -rn "throw.*not.*implement\|NotImplementedError\|TODO" src/ --include="*.ts"

# Regex where LLM calls should be
grep -rn "new RegExp\|\.match(\|\.test(" src/ --include="*.ts" | grep -v "test\|spec"
```

For each stub, write a test exposing it (different inputs → different outputs):

```typescript
it("should produce different outputs for different inputs (not hardcoded)", () => {
  const result1 = process(input1);
  const result2 = process(input2);
  expect(result1).not.toEqual(result2);
});
```

**Security** — at input boundaries, probe: null/undefined/empty inputs, unbounded strings/numbers, auth bypass via crafted inputs, unparameterized SQL, unsanitized rendering, hardcoded secrets, sensitive data logged. Payloads:

```
SQL injection:   '; DROP TABLE users; --
XSS:            <script>alert('xss')</script>
Command inj.:   ; rm -rf /
Path traversal: ../../etc/passwd
SSRF:           internal URLs in user-controlled fields
```

Each issue → a failing test:

```typescript
it("should reject SQL injection in search query", () => {
  expect(() => search("'; DROP TABLE users; --"))
    .toThrow(); // or return error, not execute the injection
});
```

**Story completeness** — map each acceptance criterion to a test, each edge case to a test, each negative case ("what happens when X fails") to a test. Gap → failing test.

### Stub verification strategy

For each suspected stub, write a test that fails if the stub is real:

1. **Different inputs → different outputs** — identical output across meaningfully different inputs = hardcoded
2. **Side effects happen** — verify the DB write / API call occurred; stubs skip side effects
3. **Error cases error** — invalid input must validate and reject; stubs return success regardless
4. **Performance correlates with work** — N vs 1 item should produce proportionally different results

Reduce false positives — exclude `*.config.*`, `*.d.ts`, `*.test.*` / `*.spec.*`, legit constant returns (error messages, defaults), and early-return guard clauses. When in doubt, read the surrounding context.

### Report

```markdown
## Red Team Report

### Architecture Conformance
- {N} violations found, {M} tests written
- Missing dependencies: {list}
- Pattern violations: {list}

### Stub Detection
- {N} stubs found, {M} tests written
- {list of stub locations}

### Security
- {N} issues found, {M} tests written
- {list of issues}

### Story Completeness
- {N} gaps found, {M} tests written
- {list of missing criteria}

### New Test Files
- {path}: {what it tests}
```

### Validate (red team)

- [ ] Every architecture dependency checked for import in source
- [ ] Stub detection scan ran on all implementation files
- [ ] Every finding has a NEW failing test (not a comment or note)
- [ ] No implementation code modified — only new test files created
- [ ] New tests actually fail when run (verified, not just written)

## See Also

For detailed security checklists and pre-commit verification steps, see `references/security-checklist.md`.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "This is an internal tool, security doesn't matter" | Internal tools get compromised. Attackers target the weakest link. |
| "We'll add security later" | Security retrofitting is 10x harder than building it in. Add it now. |
| "No one would try to exploit this" | Automated scanners will find it. Security by obscurity is not security. |
| "The framework handles security" | Frameworks provide tools, not guarantees. You still need to use them correctly. |
| "It's just a prototype" | Prototypes become production. Security habits from day one. |

## Red Flags

- User input passed directly to database queries, shell commands, or HTML rendering
- Secrets in source code or commit history
- API endpoints without authentication or authorization checks
- Missing CORS configuration or wildcard (`*`) origins
- No rate limiting on authentication endpoints
- Stack traces or internal errors exposed to users
- Dependencies with known critical vulnerabilities

## Verification

After implementing security-relevant code:

- [ ] `npm audit` shows no critical or high vulnerabilities
- [ ] No secrets in source code or git history
- [ ] All user input validated at system boundaries
- [ ] Authentication and authorization checked on every protected endpoint
- [ ] Security headers present in response (check with browser DevTools)
- [ ] Error responses don't expose internal details
- [ ] Rate limiting active on auth endpoints
