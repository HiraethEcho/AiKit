# Reporters and Report Customization

The Postman CLI has built-in reporters to generate collection run reports. Four reporters are available: CLI, JSON, JUnit, and HTML.

**Important:** JSON, JUnit, and HTML reporters only work with v2 format (JSON) collections. v3 format (YAML) collections only support the CLI reporter.

## Available reporters

### CLI (default)

Displays a report in the terminal. Always shown unless `--silent` is used.

```bash
postman collection run ./collection -r cli
```

### JSON

Creates a JSON file with full run details including request/response data.

```bash
postman collection run ./collection -r json
postman collection run ./collection -r json --reporter-json-export ./reports/result.json

# use Newman-compatible JSON structure
postman collection run ./collection -r json --reporter-json-structure newman
```

### JUnit

Creates an XML file compatible with CI/CD tools that consume JUnit format.

```bash
postman collection run ./collection -r junit
postman collection run ./collection -r junit --reporter-junit-export ./reports/result.xml
```

### HTML

Creates an interactive HTML report. You can filter iterations by test failures or errors.

```bash
postman collection run ./collection -r html
postman collection run ./collection -r html --reporter-html-export ./reports/result.html
```

## Multiple reporters

Combine reporters with comma-separated list:

```bash
postman collection run ./collection -r cli,json,junit,html
```

## Custom export paths

By default, reports are saved to `./postman-cli-reports/` with filenames like `collection-name-yyyy-mm-dd-hh-mm-ss`. Override with:

```bash
--reporter-json-export <path>
--reporter-junit-export <path>
--reporter-html-export <path>
```

If the path is an existing directory, the report file is saved inside it. If the directory does not exist, it is created automatically.

## Omitting sensitive data

Remove request/response bodies and headers from reports:

```bash
# omit request bodies
--reporter-json-omitRequestBodies
--reporter-html-omitRequestBodies

# omit response bodies
--reporter-json-omitResponseBodies
--reporter-html-omitResponseBodies

# omit all headers
--reporter-json-omitHeaders
--reporter-html-omitHeaders

# omit everything (headers + bodies)
--reporter-json-omitAllHeadersAndBody
--reporter-html-omitAllHeadersAndBody
```

## CI/CD usage

```bash
# generate JUnit report for CI consumption, fail on test errors
postman collection run ./collection -r junit --reporter-junit-export ./test-results/postman.xml --bail
```
