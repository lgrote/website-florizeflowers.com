#!/bin/bash

# GCP Setup Script for Florize Flowers
# Creates bucket, load balancer, SSL certificate, and configures for https://preview.florizeflowers.com/

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="${GCP_PROJECT_ID:-}"
BUCKET_NAME="florizeflowers-website"
DOMAIN="preview.florizeflowers.com"
BACKEND_BUCKET_NAME="florize-flowers-backend"
URL_MAP_NAME="florize-flowers-lb"
TARGET_HTTPS_PROXY="florize-flowers-https-proxy"
FORWARDING_RULE="florize-flowers-https-rule"
SSL_CERT_NAME="florize-flowers-ssl-cert"
REGION="us-central1"

echo -e "${BLUE}🌸 Florize Flowers GCP Setup${NC}"
echo -e "${BLUE}================================================${NC}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: gcloud CLI is not installed.${NC}"
    echo -e "${YELLOW}Install it from: https://cloud.google.com/sdk/docs/install${NC}"
    exit 1
fi

# Check if project ID is set
if [ -z "$PROJECT_ID" ]; then
    echo -e "${YELLOW}No GCP_PROJECT_ID environment variable set.${NC}"
    echo -e "${YELLOW}Please enter your GCP Project ID:${NC}"
    read -p "Project ID: " PROJECT_ID

    if [ -z "$PROJECT_ID" ]; then
        echo -e "${RED}Error: Project ID is required${NC}"
        exit 1
    fi
fi

# Set the project
echo -e "${BLUE}📋 Setting GCP project to: ${PROJECT_ID}${NC}"
gcloud config set project "$PROJECT_ID"

# Enable required APIs
echo -e "${BLUE}🔧 Enabling required GCP APIs...${NC}"
gcloud services enable compute.googleapis.com
gcloud services enable storage-api.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable secretmanager.googleapis.com

# Create storage bucket for website
echo -e "${BLUE}🪣 Creating storage bucket: ${BUCKET_NAME}${NC}"
if gsutil ls -b "gs://${BUCKET_NAME}" 2>/dev/null; then
    echo -e "${YELLOW}Bucket ${BUCKET_NAME} already exists, skipping creation${NC}"
else
    gsutil mb -c STANDARD -l ${REGION} "gs://${BUCKET_NAME}"
    echo -e "${GREEN}✅ Bucket created${NC}"
fi

# Set bucket to serve static website
echo -e "${BLUE}🌐 Configuring bucket for static website hosting...${NC}"
gsutil web set -m index.html -e 404.html "gs://${BUCKET_NAME}"

# Make bucket publicly readable
echo -e "${BLUE}🔓 Making bucket publicly readable...${NC}"
gsutil iam ch allUsers:objectViewer "gs://${BUCKET_NAME}"

# Add CORS configuration for the bucket
echo -e "${BLUE}🔀 Setting CORS configuration...${NC}"
cat > /tmp/cors.json <<EOF
[
  {
    "origin": ["*"],
    "method": ["GET", "HEAD"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF
gsutil cors set /tmp/cors.json "gs://${BUCKET_NAME}"
rm /tmp/cors.json

# Reserve a static IP address
echo -e "${BLUE}🌍 Reserving static IP address...${NC}"
if gcloud compute addresses describe florize-flowers-ip --global 2>/dev/null; then
    echo -e "${YELLOW}IP address already reserved${NC}"
    STATIC_IP=$(gcloud compute addresses describe florize-flowers-ip --global --format="value(address)")
else
    gcloud compute addresses create florize-flowers-ip --global
    STATIC_IP=$(gcloud compute addresses describe florize-flowers-ip --global --format="value(address)")
    echo -e "${GREEN}✅ Static IP reserved: ${STATIC_IP}${NC}"
fi

# Create backend bucket
echo -e "${BLUE}🗄️  Creating backend bucket...${NC}"
if gcloud compute backend-buckets describe "${BACKEND_BUCKET_NAME}" 2>/dev/null; then
    echo -e "${YELLOW}Backend bucket already exists, updating...${NC}"
    gcloud compute backend-buckets update "${BACKEND_BUCKET_NAME}" \
        --gcs-bucket-name="${BUCKET_NAME}" \
        --enable-cdn
else
    gcloud compute backend-buckets create "${BACKEND_BUCKET_NAME}" \
        --gcs-bucket-name="${BUCKET_NAME}" \
        --enable-cdn
    echo -e "${GREEN}✅ Backend bucket created${NC}"
fi

# Create URL map
echo -e "${BLUE}🗺️  Creating URL map...${NC}"
if gcloud compute url-maps describe "${URL_MAP_NAME}" 2>/dev/null; then
    echo -e "${YELLOW}URL map already exists, updating...${NC}"
    gcloud compute url-maps set-default-service "${URL_MAP_NAME}" \
        --default-backend-bucket="${BACKEND_BUCKET_NAME}"
else
    gcloud compute url-maps create "${URL_MAP_NAME}" \
        --default-backend-bucket="${BACKEND_BUCKET_NAME}"
    echo -e "${GREEN}✅ URL map created${NC}"
fi

# Create or update managed SSL certificate
echo -e "${BLUE}🔒 Creating managed SSL certificate for ${DOMAIN}...${NC}"
if gcloud compute ssl-certificates describe "${SSL_CERT_NAME}" 2>/dev/null; then
    echo -e "${YELLOW}SSL certificate already exists${NC}"
else
    gcloud compute ssl-certificates create "${SSL_CERT_NAME}" \
        --domains="${DOMAIN}" \
        --global
    echo -e "${GREEN}✅ SSL certificate created (will be provisioned after DNS is configured)${NC}"
fi

# Create HTTPS target proxy
echo -e "${BLUE}🎯 Creating HTTPS target proxy...${NC}"
if gcloud compute target-https-proxies describe "${TARGET_HTTPS_PROXY}" 2>/dev/null; then
    echo -e "${YELLOW}Target HTTPS proxy already exists, updating...${NC}"
    gcloud compute target-https-proxies update "${TARGET_HTTPS_PROXY}" \
        --ssl-certificates="${SSL_CERT_NAME}" \
        --url-map="${URL_MAP_NAME}"
else
    gcloud compute target-https-proxies create "${TARGET_HTTPS_PROXY}" \
        --ssl-certificates="${SSL_CERT_NAME}" \
        --url-map="${URL_MAP_NAME}"
    echo -e "${GREEN}✅ Target HTTPS proxy created${NC}"
fi

# Create forwarding rule
echo -e "${BLUE}➡️  Creating forwarding rule...${NC}"
if gcloud compute forwarding-rules describe "${FORWARDING_RULE}" --global 2>/dev/null; then
    echo -e "${YELLOW}Forwarding rule already exists${NC}"
else
    gcloud compute forwarding-rules create "${FORWARDING_RULE}" \
        --global \
        --target-https-proxy="${TARGET_HTTPS_PROXY}" \
        --address="florize-flowers-ip" \
        --ports=443
    echo -e "${GREEN}✅ Forwarding rule created${NC}"
fi

# Store Sanity API token in Secret Manager (if not already exists)
echo -e "${BLUE}🔐 Checking Secret Manager for Sanity token...${NC}"
if gcloud secrets describe florize-sanity-read-token 2>/dev/null; then
    echo -e "${YELLOW}Secret already exists${NC}"
else
    echo -e "${YELLOW}Creating placeholder secret (update this with your actual Sanity API token)${NC}"
    echo -n "your-sanity-api-token-here" | gcloud secrets create florize-sanity-read-token \
        --data-file=- \
        --replication-policy="automatic"
    echo -e "${GREEN}✅ Secret created (remember to update with actual token)${NC}"
fi

# Grant Cloud Build access to secrets
echo -e "${BLUE}🔑 Granting Cloud Build access to secrets...${NC}"
PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format="value(projectNumber)")
gcloud secrets add-iam-policy-binding florize-sanity-read-token \
    --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor" \
    2>/dev/null || echo -e "${YELLOW}Permission already granted${NC}"

echo -e "${GREEN}✅ Setup complete!${NC}"
echo -e ""
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}📋 Next Steps:${NC}"
echo -e "${BLUE}================================================${NC}"
echo -e ""
echo -e "1. ${YELLOW}Configure DNS:${NC}"
echo -e "   Add an A record for ${DOMAIN} pointing to: ${STATIC_IP}"
echo -e ""
echo -e "2. ${YELLOW}Update Sanity API Token:${NC}"
echo -e "   Run: echo -n 'YOUR_ACTUAL_TOKEN' | gcloud secrets versions add florize-sanity-read-token --data-file=-"
echo -e ""
echo -e "3. ${YELLOW}Deploy your site:${NC}"
echo -e "   Run: gcloud builds submit --config=cloudbuild.yaml"
echo -e ""
echo -e "4. ${YELLOW}SSL Certificate:${NC}"
echo -e "   The SSL certificate will be automatically provisioned after DNS is configured."
echo -e "   Check status: gcloud compute ssl-certificates describe ${SSL_CERT_NAME}"
echo -e ""
echo -e "${GREEN}Your site will be available at: https://${DOMAIN}${NC}"
echo -e ""
