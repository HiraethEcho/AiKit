---
name: postman-cli
description: Runs Postman collections, sends HTTP requests, manages mock servers, lints API specs, and pushes workspace changes from the command line. Use this skill whenever the user wants to run API tests, execute collection runs, send ad-hoc HTTP requests, test endpoints, check if an API is working, hit a URL, run Postman tests against QA or staging, start mock servers, lint OpenAPI specs, manage Postman workspace sync, or do anything curl-like with environment variables and auth. Trigger even when the user says "test my API", "call this endpoint", "run the collection", or "send a request to..." — this skill replaces curl/wget with Postman's full feature set.
allowed-tools: Bash(postman:*)
---

# Postman CLI

## Quick start

```bash
# run a collection locally with an environment
postman collection run ./postman/collections/nada-to-odoo -e ./postman/environments/qa.postman_environment.yaml
# run a specific folder within a collection
postman collection run ./postman/collections/nada-to-odoo -i "sale.order"
# send a quick GET request
postman request https://api.example.com/health
# send a POST with body and auth
postman request POST https://api.example.com/orders --body '{"item":"test"}' --auth-bearer-token "$TOKEN"
```

## Commands

### Collection run

```bash
# run entire collection from local path
postman collection run <collectionPath> [options]

# run with environment file
postman collection run ./collection -e ./env.yaml

# run with environment variable overrides
postman collection run ./collection -e ./env.yaml --env-var "odoo_base_url=https://odoo.example.com" --env-var "odoo_db=test_db"

# run with global variables
postman collection run ./collection -g ./globals.json
postman collection run ./collection --global-var "api_version=v2"

# run specific folder(s) or request(s) by name or ID
postman collection run ./collection -i "sale.order"
postman collection run ./collection -i "sale.order" -i "res.partner"

# run with iteration data file (JSON or CSV)
postman collection run ./collection -d ./test-data.csv -n 5

# stop on first error
postman collection run ./collection --bail
postman collection run ./collection --bail --failure

# control timeouts (milliseconds)
postman collection run ./collection --timeout 60000 --timeout-request 10000 --timeout-script 5000

# add delay between requests
postman collection run ./collection --delay-request 500

# verbose output
postman collection run ./collection --verbose

# suppress exit code (always exit 0)
postman collection run ./collection -x

# use custom working directory for relative file paths
postman collection run ./collection --working-dir ./postman

# ignore redirects
postman collection run ./collection --ignore-redirects

# SSL options
postman collection run ./collection -k
postman collection run ./collection --ssl-client-cert ./cert.pem --ssl-client-key ./key.pem
postman collection run ./collection --ssl-extra-ca-certs ./ca.pem

# cookie jar
postman collection run ./collection --cookie-jar ./cookies.json --export-cookie-jar ./cookies-after.json
```

### Reporters

```bash
# default: CLI reporter only
postman collection run ./collection

# JSON report
postman collection run ./collection -r json

# multiple reporters
postman collection run ./collection -r cli,json,junit,html

# custom export path
postman collection run ./collection -r json --reporter-json-export ./reports/result.json
postman collection run ./collection -r junit --reporter-junit-export ./reports/result.xml
postman collection run ./collection -r html --reporter-html-export ./reports/result.html

# newman-compatible JSON structure
postman collection run ./collection -r json --reporter-json-structure newman

# omit sensitive data from reports
postman collection run ./collection -r json --reporter-json-omitRequestBodies --reporter-json-omitResponseBodies
postman collection run ./collection -r json --reporter-json-omitHeaders
postman collection run ./collection -r json --reporter-json-omitAllHeadersAndBody
```

Reports are saved to `./postman-cli-reports/` by default. Only the CLI reporter is supported for v3 format (YAML) collections. JSON, JUnit, and HTML reporters require v2 format (JSON) collections.

### Send a single request

```bash
# basic GET
postman request https://api.example.com/users

# explicit method
postman request GET https://api.example.com/users
postman request POST https://api.example.com/users
postman request PUT https://api.example.com/users/1
postman request PATCH https://api.example.com/users/1
postman request DELETE https://api.example.com/users/1

# with headers
postman request https://api.example.com/data -H "Content-Type:application/json" -H "X-API-Key:abc123"

# with body (inline, from file, or from stdin)
postman request POST https://api.example.com/users --body '{"name":"John"}'
postman request POST https://api.example.com/users --body @data.json
echo '{"name":"John"}' | postman request POST https://api.example.com/users --body -

# multipart form data
postman request POST https://api.example.com/upload -f "name=John" -f "avatar=@photo.jpg"

# with environment file (resolves {{variables}} in URL, headers, body)
postman request POST https://{{base_url}}/api/users -e dev.postman_environment.json --body '{"name":"{{test_user}}"}'

# authentication
postman request https://api.example.com/data --auth-bearer-token "mytoken123"
postman request https://api.example.com/data --auth-basic-username user --auth-basic-password pass
postman request https://api.example.com/data --auth-apikey-key "X-API-Key" --auth-apikey-value "abc123" --auth-apikey-in header

# with pre-request and post-response scripts
postman request POST https://api.example.com/login --body '{"user":"admin","pass":"secret"}' \
  --script-post-request "const token = pm.response.json().token; console.log('Token:', token);"

# timeout and retries
postman request https://api.example.com/health --timeout 5000 --retry 3 --retry-delay 1000

# redirect control
postman request https://api.example.com/redirect --redirects-ignore
postman request https://api.example.com/redirect --redirects-max 5

# output control
postman request https://api.example.com/data --response-only
postman request https://api.example.com/data --verbose
postman request https://api.example.com/data --debug
postman request https://api.example.com/data --output response.json

# pipe response to other tools
postman request https://api.example.com/data --response-only | jq '.results[]'
```

### Authentication

```bash
# sign in via browser
postman login

# sign in with API key (for CI/CD)
postman login --with-api-key ABCD-1234-1234-1234-1234-1234

# EU data residency
postman login --with-api-key ABCD-1234-1234-1234-1234-1234 --region eu

# sign out
postman logout
```

### Collection migration

```bash
# migrate v2.1 (JSON) collection to v3 (YAML) format
postman collection migrate ./my-collection.json
postman collection migrate ./my-collection.json --output ./path/to/new-collection
```

### Mock servers

```bash
# start a local mock server from a manifest file
postman mock run ./mock-manifest.json

# start mock in background, run collection against it, then stop
postman mock run ./postman/mocks/odoo-mock.json &
MOCK_PID=$!
postman collection run ./postman/collections/nada-to-odoo \
  -e ./postman/environments/qa.postman_environment.yaml \
  --env-var "odoo_base_url=http://localhost:3000"
kill $MOCK_PID
```

### Spec linting

```bash
# lint a local API specification file
postman spec lint ./openapi.yaml
postman spec lint ./openapi.json

# lint by specification ID (requires login)
postman spec lint 12345678-abcd-1234-abcd-1234567890ab
```

### Flows

```bash
# list all flows
postman flows list

# run a flow from a local file
postman flows run ./path/to/flow.json

# deploy a flow (required before triggering)
postman flows deploy <flowId>

# trigger a deployed flow
postman flows trigger <flowId>

# update a deployed flow's settings
postman flows update <flowId>

# list run history
postman flows list-runs

# analyze a specific flow run
postman flows get-run
```

### Workspace sync

```bash
# validate and prepare local collections/environments for push
postman workspace prepare

# push local changes to Postman workspace
postman workspace push
```

### Basic

```bash
# version
postman --version

# help
postman --help
postman <command> --help
postman collection run --help

# global options (available on all commands)
postman --silent <command>
postman --color off <command>
```

## Exit codes

- `0` — Success (all tests passed, or for `request`: 2xx-3xx response)
- `N` — Number of failed tests (e.g., exit code 3 means 3 tests failed)
- `1` — General error (invalid options, file not found, network error)

## Project-specific usage

This project stores Postman collections and environments in the `postman/` directory:

```
postman/
  collections/
    nada-to-odoo/          # Nada API calls to Odoo
      delivery.carrier/
      product.template/
      res.partner/
      sale.order/
      stock.location/
      stock.quant/
    odoo-to-nada/          # Odoo webhook push calls to Nada
  environments/
    qa.postman_environment.yaml
  flows/
  globals/
  mocks/
  specs/
```

### Run the nada-to-odoo collection against QA

```bash
postman collection run ./postman/collections/nada-to-odoo \
  -e ./postman/environments/qa.postman_environment.yaml \
  --env-var "odoo_base_url=https://odoo-qa.drops.com" \
  --env-var "odoo_db=drops_qa"
```

### Run only the sale.order folder

```bash
postman collection run ./postman/collections/nada-to-odoo \
  -e ./postman/environments/qa.postman_environment.yaml \
  -i "sale.order" \
  --env-var "odoo_base_url=https://odoo-qa.drops.com"
```

### Run the odoo-to-nada collection (webhook push tests)

```bash
postman collection run ./postman/collections/odoo-to-nada \
  -e ./postman/environments/qa.postman_environment.yaml \
  --env-var "nada_base_url=https://nada-qa.drops.me"
```

### Generate a JSON report for CI

```bash
postman collection run ./postman/collections/nada-to-odoo \
  -e ./postman/environments/qa.postman_environment.yaml \
  -r cli,json \
  --reporter-json-export ./postman-cli-reports/nada-to-odoo.json
```

### Quick ad-hoc request to Odoo

```bash
postman request POST "https://odoo-qa.drops.com/json/2/res.partner/search_read" \
  --auth-bearer-token "$ODOO_API_TOKEN" \
  -H "Content-Type:application/json" \
  -H "X-Odoo-Database:drops_qa" \
  --body '{"domain": [["is_company","=",true]], "fields": ["name","email"], "limit": 5}' \
  --response-only | jq .
```

## Specific tasks

* **Reporters and report customization** [references/reporters.md](references/reporters.md) — Read when generating CI reports, customizing output format, or omitting sensitive data from exports
* **Request scripting and chaining** [references/request-scripting.md](references/request-scripting.md) — Read when writing post-response scripts, chaining multiple requests, or using the pm.* API
* **Environment and variable management** [references/environments.md](references/environments.md) — Read when working with environment files, variable precedence, Vault secrets, or CLI overrides
