# OpenAI Vector Store Migration - Setup Guide

## Migration Complete! 🎉

Your RAG system has been successfully migrated from PostgreSQL + Gemini to OpenAI Vector Store + Assistants API.

---

## Next Steps

### Step 1: Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Create a new API key
5. Copy the key (starts with `sk-proj-...`)

### Step 2: Add OpenAI API Key to Environment

Add this to your `.env.local` file:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-your-actual-key-here

# These will be generated in Step 3
OPENAI_ASSISTANT_ID=
OPENAI_VECTOR_STORE_ID=

# Keep existing (for contacts and email)
RESEND_API_KEY=your_existing_resend_key
NOTIFICATION_EMAIL=your_existing_email
POSTGRES_URL=your_existing_postgres_url
```

### Step 3: Run One-Time Setup Script

This script will create your OpenAI Assistant and Vector Store:

```bash
npx tsx scripts/setup-openai.ts
```

**Expected output:**
```
🚀 OpenAI Assistant & Vector Store Setup
==================================================

📦 Step 1: Creating Vector Store...
✅ Vector Store created: vs_abc123...

📝 Step 2: Preparing portfolio content...
✅ Prepared 10 content files

⬆️  Step 3: Uploading files to OpenAI...
  ✓ personal_info.txt → file_abc123
  ✓ about_journey.txt → file_def456
  ... (10 files total)
✅ Uploaded 10 files

🔗 Step 4: Adding files to Vector Store...
✅ Files added to Vector Store

🤖 Step 5: Creating Assistant...
✅ Assistant created: asst_xyz789...

==================================================
✅ Setup Complete!

📋 Add these to your .env.local file:

OPENAI_ASSISTANT_ID=asst_xyz789...
OPENAI_VECTOR_STORE_ID=vs_abc123...
==================================================
```

### Step 4: Update .env.local with IDs

Copy the `OPENAI_ASSISTANT_ID` and `OPENAI_VECTOR_STORE_ID` from the output and add them to your `.env.local` file:

```env
OPENAI_API_KEY=sk-proj-...
OPENAI_ASSISTANT_ID=asst_xyz789...
OPENAI_VECTOR_STORE_ID=vs_abc123...
```

### Step 5: Test Locally

Start your development server:

```bash
npm run dev
```

Visit http://localhost:3000 and test the chatbot:
- Ask: "What are your skills?"
- Ask: "Tell me about your projects"
- Ask: "What is your experience?"

### Step 6: Deploy to Vercel

1. Add environment variables to Vercel:
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add OPENAI_ASSISTANT_ID
   vercel env add OPENAI_VECTOR_STORE_ID
   ```

2. Deploy:
   ```bash
   git add .
   git commit -m "feat: Migrate to OpenAI Vector Store for RAG"
   git push
   ```

3. Vercel will automatically deploy your changes

---

## What Changed?

### Removed Dependencies
- ❌ `@google/generative-ai` (Gemini)
- ❌ PostgreSQL pgvector for embeddings

### Added Dependencies
- ✅ `openai` package
- ✅ `tsx` for running TypeScript scripts

### Architecture Changes

**Before:**
```
User Query → Generate Embedding (Gemini) → Search PostgreSQL →
Build Prompt → Generate Response (Gemini)
```

**After:**
```
User Query → OpenAI Assistant Thread →
File Search (automatic) → Generate Response with Citations
```

### Key Benefits
1. **No Database Management** - OpenAI handles everything
2. **Automatic Embeddings** - No manual generation needed
3. **Built-in Citations** - Sources automatically included
4. **Conversation Threading** - Context maintained server-side
5. **Easier Deployment** - No pgvector setup required

---

## Troubleshooting

### "OPENAI_API_KEY not configured"
- Check `.env.local` has the correct API key
- Restart your dev server after adding the key

### "OPENAI_ASSISTANT_ID not configured"
- Make sure you ran the setup script: `npx tsx scripts/setup-openai.ts`
- Add the IDs output by the script to `.env.local`

### "Setup script fails"
- Verify your OpenAI API key is valid
- Check you have sufficient credits in your OpenAI account
- Ensure you have internet connection

### "Chat responses are slow"
- OpenAI Assistants API has 1-3 second latency due to File Search
- This is normal and expected behavior

### "No relevant answers"
- Check that the setup script successfully uploaded files
- Visit http://localhost:3000/api/index-portfolio to verify indexing status
- Re-run indexing: `POST http://localhost:3000/api/index-portfolio`

---

## Cost Estimates

### OpenAI Pricing (as of 2024)
- **GPT-4o-mini**: $0.15/1M input tokens, $0.60/1M output tokens
- **Text Embeddings**: $0.02/1M tokens (automatically handled)
- **Vector Store Storage**: $0.10/GB/day

### Typical Usage
- **10 chat messages/day**: ~$0.01/day
- **100 chat messages/day**: ~$0.10/day
- **Portfolio storage**: ~$0.10/month

**Total estimated cost**: $3-10/month for moderate usage

---

## Database Notes

### PostgreSQL Still Used For
- ✅ Contact form submissions
- ✅ Contact management admin panel

### No Longer Used For
- ❌ Vector embeddings
- ❌ RAG context storage

You can keep your Vercel Postgres database for contacts functionality.

---

## Testing Endpoints

### Check Vector Store Status
```bash
curl http://localhost:3000/api/index-portfolio
```

### Re-index Portfolio
```bash
curl -X POST http://localhost:3000/api/index-portfolio
```

### Test Chat
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your skills?"}'
```

---

## Need Help?

- **OpenAI Documentation**: https://platform.openai.com/docs/assistants/overview
- **Assistants API Guide**: https://platform.openai.com/docs/assistants/tools/file-search
- **Check Setup Script**: Review `scripts/setup-openai.ts` for setup details

---

## Summary

Your RAG system is now powered by OpenAI's managed infrastructure!

**Completed:**
- ✅ Installed OpenAI SDK
- ✅ Created setup script
- ✅ Migrated all RAG code to use OpenAI
- ✅ Updated chat endpoint
- ✅ Updated ChatbotWidget
- ✅ Cleaned up PostgreSQL vector code

**Next:**
1. Get OpenAI API key
2. Add to `.env.local`
3. Run setup script
4. Add Assistant/Vector Store IDs
5. Test and deploy!

Good luck! 🚀
