# Request Scripting and Chaining

The `postman request` command supports pre-request and post-response scripts using the Postman scripting sandbox (pm.* API).

## Post-response scripts

Use `--script-post-request` to run JavaScript after receiving the response:

```bash
# validate response
postman request https://api.example.com/health \
  --script-post-request "pm.test('Health check', function() { pm.expect(pm.response.json().status).to.equal('healthy'); });"

# extract and log data
postman request POST https://api.example.com/login \
  --body '{"user":"admin","pass":"secret"}' \
  --script-post-request "const token = pm.response.json().token; console.log('Token:', token);"
```

## Chaining requests

Use shell command substitution with `--response-only` to chain requests:

```bash
# get a token, then use it in the next request
TOKEN=$(postman request POST https://api.example.com/login \
  --body '{"username":"admin","password":"pass"}' \
  --response-only | jq -r '.token')

postman request https://api.example.com/protected \
  --auth-bearer-token "$TOKEN"
```

## Collection scripts

Collection files (.yaml or .json) can include scripts at the collection, folder, and request levels:

```yaml
# in a request YAML file
scripts:
  - type: afterResponse
    code: |-
      pm.test('Status 200', () => pm.response.to.have.status(200));
      const res = pm.response.json();
      pm.environment.set('_odoo_order_id', res);
    language: text/javascript
```

Script-managed variables (prefixed with `_`) are set during collection runs and chained between requests using `pm.environment.set()` and `{{variable}}` syntax.

## Available pm.* API in scripts

- `pm.response.json()` — parsed JSON response body
- `pm.response.to.have.status(code)` — assert status code
- `pm.expect(value)` — Chai BDD assertion
- `pm.environment.set(key, value)` — set environment variable for subsequent requests
- `pm.environment.get(key)` — get environment variable
- `pm.globals.set(key, value)` — set global variable
- `pm.globals.get(key)` — get global variable
- `console.log(...)` — log to terminal output

## Exit codes from tests

When scripts contain `pm.test()` assertions, the exit code equals the number of failed tests. This makes it suitable for CI/CD pipelines:

```bash
postman collection run ./collection --bail --failure
echo "Exit code: $?"
```
