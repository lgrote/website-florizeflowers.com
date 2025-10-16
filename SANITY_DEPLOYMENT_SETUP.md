# Sanity Schema Deployment Setup

This document explains how the Sanity schema is automatically deployed as part of the Cloud Build process.

## Overview

The `cloudbuild.yaml` now includes a step that automatically deploys the Sanity schema whenever code is pushed. This ensures that schema changes (like adding new services to the dropdown) are immediately available in Sanity Studio.

## Build Process

The build pipeline now includes these steps:

1. **Install dependencies** - Install npm packages
2. **Deploy Sanity schema** (NEW) - Deploy schema to Sanity
3. **Build Astro site** - Build static site
4. **Deploy to GCS** - Upload to Google Cloud Storage
5. **Set cache headers** - Configure caching

## Prerequisites

### 1. Create Sanity Deploy Token

You need a Sanity deploy token with write permissions:

1. Go to https://www.sanity.io/manage
2. Select your project (Florize Flowers - `vm53xzke`)
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Settings:
   - **Name**: `Florize Cloud Build Deploy Token`
   - **Permissions**: **Editor** (needs write access to deploy schema)
6. Copy the token (you'll only see it once!)

### 2. Add Token to Google Cloud Secret Manager

Store the Sanity deploy token securely in Google Cloud:

```bash
# Create the secret
echo -n "YOUR_SANITY_DEPLOY_TOKEN" | gcloud secrets create florize-sanity-deploy-token \
  --data-file=- \
  --replication-policy="automatic" \
  --project=YOUR_PROJECT_ID

# Grant Cloud Build access to the secret
gcloud secrets add-iam-policy-binding florize-sanity-deploy-token \
  --member=serviceAccount:YOUR_PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
  --role=roles/secretmanager.secretAccessor \
  --project=YOUR_PROJECT_ID
```

Replace:
- `YOUR_SANITY_DEPLOY_TOKEN` with the token from step 1
- `YOUR_PROJECT_ID` with your GCP project ID
- `YOUR_PROJECT_NUMBER` with your GCP project number

### 3. Verify Secret Configuration

The `cloudbuild.yaml` already references the secret:

```yaml
availableSecrets:
  secretManager:
    - versionName: projects/${PROJECT_ID}/secrets/florize-sanity-deploy-token/versions/latest
      env: "SANITY_DEPLOY_TOKEN"
```

## What Gets Deployed

During the Sanity deployment step:

1. **Schema extraction**: Validates schema structure
2. **Schema deployment**: Uploads schema to Sanity
3. **Studio deployment**: Deploys the Studio interface (optional)

The schema files deployed include:
- `/schemas/index.ts` - Main schema export
- `/schemas/florizeConfig.ts` - Florize configuration schema
- `/studio/sanity.config.ts` - Studio configuration

## Testing

### Test Locally

Before pushing, test the schema deployment locally:

```bash
cd studio
npm install
npx sanity schema extract --enforce-required-fields
npx sanity deploy
```

### Verify in Cloud Build

After pushing:

1. Go to [Cloud Build Console](https://console.cloud.google.com/cloud-build/builds)
2. Find your build
3. Check the "Deploy Sanity schema" step
4. Verify it completed successfully

### Verify in Sanity Studio

1. Go to your Sanity Studio URL
2. Navigate to Florize Configuration
3. Check that new services appear in the dropdown
4. Verify schema changes are reflected

## Troubleshooting

### Error: "Invalid token"

**Cause**: Deploy token is missing or incorrect

**Solution**:
1. Generate a new deploy token from Sanity dashboard
2. Update the secret in Google Cloud Secret Manager:
   ```bash
   echo -n "NEW_TOKEN" | gcloud secrets versions add florize-sanity-deploy-token --data-file=-
   ```

### Error: "Insufficient permissions"

**Cause**: Token doesn't have Editor permissions

**Solution**:
1. Delete the old token in Sanity dashboard
2. Create a new token with **Editor** permissions
3. Update the secret in Google Cloud

### Error: "Schema validation failed"

**Cause**: Schema has syntax errors or invalid definitions

**Solution**:
1. Run locally: `cd studio && npx sanity schema extract --enforce-required-fields`
2. Fix any errors reported
3. Test locally before pushing

### Error: "Secret not found"

**Cause**: Secret not created in Google Cloud

**Solution**:
Follow step 2 in Prerequisites to create the secret

### Schema Not Updating in Studio

**Cause**: Studio might be cached

**Solution**:
1. Hard refresh Studio (Cmd+Shift+R or Ctrl+Shift+R)
2. Clear browser cache
3. Wait a few minutes for changes to propagate

## Manual Schema Deployment

If needed, you can deploy schema manually:

```bash
# From project root
cd studio
npm install

# Set your Sanity auth token
export SANITY_AUTH_TOKEN="your_deploy_token_here"

# Deploy schema
npx sanity schema extract --enforce-required-fields
npx sanity deploy

# Or use the npm script
npm run deploy
```

## Adding New Services to Schema

When adding a new service (like we did with Eflorist):

1. **Update the schema file**: `schemas/florizeConfig.ts`
   ```typescript
   { title: 'New Service', value: 'new-service' }
   ```

2. **Commit and push**:
   ```bash
   git add schemas/florizeConfig.ts
   git commit -m "Add new service to Sanity schema"
   git push
   ```

3. **Cloud Build automatically**:
   - Deploys the schema to Sanity
   - New service appears in Studio dropdown

4. **No manual intervention needed!**

## Security Notes

- **Never commit** Sanity tokens to git
- Use Secret Manager for all sensitive credentials
- Deploy tokens should have minimum necessary permissions
- Rotate tokens periodically (every 6-12 months)
- Monitor Cloud Build logs for unauthorized access

## Benefits

✅ **Automatic deployment** - Schema updates deploy with code
✅ **No manual steps** - Push code, schema updates automatically
✅ **Consistent state** - Schema always matches codebase
✅ **Version controlled** - Schema changes tracked in git
✅ **Fast feedback** - Build fails if schema is invalid

## Further Reading

- [Sanity CLI Documentation](https://www.sanity.io/docs/cli)
- [Google Cloud Build Secrets](https://cloud.google.com/build/docs/securing-builds/use-secrets)
- [Sanity Schema Deployment](https://www.sanity.io/docs/deployment)
