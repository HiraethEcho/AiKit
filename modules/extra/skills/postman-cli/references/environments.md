# Environment and Variable Management

The Postman CLI resolves `{{variable}}` placeholders in URLs, headers, and request bodies using environment files and CLI overrides.

## Variable precedence (highest to lowest)

1. `--env-var` CLI overrides
2. `--global-var` CLI overrides
3. Environment file (`-e`)
4. Globals file (`-g`)
5. Postman Vault secrets (only available when signed in)

## Environment files

Environment files are YAML or JSON. Specify with `-e`:

```bash
postman collection run ./collection -e ./postman/environments/qa.postman_environment.yaml
```

Example environment file (YAML):

```yaml
name: QA
values:
  - key: odoo_base_url
    value: "https://odoo-qa.drops.com"
    enabled: true
    description: "Base URL without trailing slash"
  - key: odoo_db
    value: "drops_qa"
    enabled: true
  - key: _odoo_partner_id
    value: ""
    enabled: true
    description: "Script-managed — set after running Create Partner"
```

## CLI variable overrides

Override individual variables without modifying the environment file:

```bash
# override environment variables
postman collection run ./collection -e ./env.yaml \
  --env-var "odoo_base_url=https://odoo-staging.drops.com" \
  --env-var "odoo_db=drops_staging"

# override global variables
postman collection run ./collection \
  --global-var "api_version=v2" \
  --global-var "timeout=30000"
```

## Globals files

Global variables have lower precedence than environment variables and can be overridden by them:

```bash
postman collection run ./collection -g ./postman/globals/globals.json
```

## Variable resolution in requests

Variables are resolved in:
- URLs: `{{odoo_base_url}}/json/2/sale.order/create`
- Headers: `Authorization: Bearer {{odoo_api_token}}`
- Body: `{"partner_id": {{_odoo_partner_id}}}`

## Script-managed variables

Variables prefixed with `_` are set dynamically during collection runs via scripts:

```javascript
// in post-response script
pm.environment.set('_odoo_order_id', pm.response.json());
```

These are used to chain requests within a collection run (e.g., create a partner, then use the partner ID to create an order).

## Postman Vault

Secrets like `vault:odoo_api_token` and `vault:nada_x_odoo_api_key` are stored in the Postman Vault (not in environment files). They are only available when signed in to Postman. For local runs without sign-in, pass secrets via `--env-var`:

```bash
postman collection run ./collection -e ./env.yaml \
  --env-var "odoo_api_token=$ODOO_API_TOKEN"
```

## Exporting variables after a run

The Postman CLI does not support exporting the final environment state after a collection run. Script-managed variables (set via `pm.environment.set()`) are only available within the scope of the current run and are not persisted to the environment file.
