# GCP Deployment for Florize Flowers

This guide explains how to deploy the Florize Flowers site to Google Cloud Platform (GCP) at https://preview.florizeflowers.com/

## Prerequisites

1. **GCP Project**: You need access to a GCP project
2. **gcloud CLI**: Install from https://cloud.google.com/sdk/docs/install
3. **Permissions**: You need appropriate permissions in the GCP project:
   - Compute Admin
   - Storage Admin
   - Secret Manager Admin
   - Cloud Build Editor

## Initial Setup (One-time)

### 1. Set up GCP infrastructure

Run the setup script to create all necessary GCP resources:

```bash
# Set your GCP project ID
export GCP_PROJECT_ID="your-project-id"

# Run the setup script
./setup-gcp.sh
```

This script will:
- ✅ Create a storage bucket for the website
- ✅ Configure the bucket for static website hosting
- ✅ Reserve a static IP address
- ✅ Create a backend bucket
- ✅ Set up a load balancer with URL map
- ✅ Create a managed SSL certificate for `preview.florizeflowers.com`
- ✅ Configure HTTPS forwarding
- ✅ Set up Secret Manager for Sanity API token

### 2. Configure DNS

After the setup script completes, it will display a static IP address. You need to:

1. Add an **A record** in your DNS provider:
   - **Name**: `preview` (or `preview.florizeflowers.com` depending on your DNS provider)
   - **Type**: A
   - **Value**: The static IP address shown by the setup script
   - **TTL**: 3600 (or your preference)

### 3. Update Sanity API Token

The setup script creates a placeholder secret. Update it with your actual Sanity API token:

```bash
echo -n 'YOUR_ACTUAL_SANITY_TOKEN' | gcloud secrets versions add sanity-read-token --data-file=-
```

### 4. Wait for SSL Certificate Provisioning

The SSL certificate will be automatically provisioned by Google once:
- DNS is properly configured
- The domain points to the load balancer

Check the certificate status:

```bash
gcloud compute ssl-certificates describe florize-flowers-ssl-cert
```

Status will change from `PROVISIONING` to `ACTIVE` (usually takes 10-30 minutes).

## Deploying Updates

Once the initial setup is complete, deploy updates using:

```bash
gcloud builds submit --config=cloudbuild.yaml
```

This will:
1. Install dependencies
2. Build the Astro site
3. Deploy to the GCS bucket
4. Set appropriate cache headers

## Manual Deployment (Alternative)

If you prefer to deploy without Cloud Build:

```bash
# Build the site locally
npm run build

# Deploy to GCS
gsutil -m rsync -r -c -d dist/ gs://florizeflowers-website/

# Set cache headers
gsutil -m setmeta -h "Cache-Control:public, max-age=300, must-revalidate" -r "gs://florizeflowers-website/**/*.html"
gsutil -m setmeta -h "Cache-Control:public, max-age=31536000, immutable" -r "gs://florizeflowers-website/**/*.{js,css,jpg,jpeg,png,gif,svg,webp,woff,woff2,ttf,eot,ico}"
```

## Monitoring & Troubleshooting

### Check deployment status

```bash
# View recent Cloud Build logs
gcloud builds list --limit=5

# View specific build details
gcloud builds describe [BUILD_ID]
```

### Check bucket contents

```bash
gsutil ls -r gs://florizeflowers-website/
```

### Check load balancer status

```bash
# Check backend bucket
gcloud compute backend-buckets describe florize-flowers-backend

# Check SSL certificate
gcloud compute ssl-certificates describe florize-flowers-ssl-cert

# Check forwarding rule
gcloud compute forwarding-rules describe florize-flowers-https-rule --global
```

### View website access logs

```bash
gsutil logging get gs://florizeflowers-website
```

## Cost Optimization

The setup includes:
- **CDN Enabled**: Reduces bandwidth costs and improves performance
- **Cache Headers**: Long-term caching for static assets (1 year)
- **Short cache for HTML**: 5 minutes to ensure fresh content

Typical monthly costs for a static site:
- Storage: ~$0.50-2/month (depending on site size)
- CDN/Bandwidth: ~$1-10/month (depending on traffic)
- Load Balancer: ~$18/month (fixed cost)
- SSL Certificate: Free (Google-managed)

## Cleanup

If you need to delete all resources:

```bash
# Delete forwarding rule
gcloud compute forwarding-rules delete florize-flowers-https-rule --global

# Delete target proxy
gcloud compute target-https-proxies delete florize-flowers-https-proxy

# Delete SSL certificate
gcloud compute ssl-certificates delete florize-flowers-ssl-cert

# Delete URL map
gcloud compute url-maps delete florize-flowers-lb

# Delete backend bucket
gcloud compute backend-buckets delete florize-flowers-backend

# Delete static IP
gcloud compute addresses delete florize-flowers-ip --global

# Delete storage bucket (WARNING: This deletes all website files)
gsutil rm -r gs://florizeflowers-website
```

## Environment Variables

The build uses these environment variables (configured in `cloudbuild.yaml`):

- `_BUCKET_NAME`: GCS bucket name (`florizeflowers-website`)
- `_SANITY_PROJECT_ID`: Sanity project ID (`hr1riv5w`)
- `_SANITY_DATASET`: Sanity dataset (`production`)
- `SANITY_API_READ_TOKEN`: Stored in Secret Manager

## Support

For issues with:
- **GCP Setup**: Check the [GCP Console](https://console.cloud.google.com)
- **DNS**: Verify with `dig preview.florizeflowers.com`
- **SSL Certificate**: Allow 10-30 minutes after DNS configuration
- **Build Failures**: Check Cloud Build logs in GCP Console
