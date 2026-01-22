#!/usr/bin/env node

/**
 * Post-build script to automatically index portfolio content
 * This runs after `next build` completes
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

async function triggerIndexing() {
  console.log('🚀 Post-build: Triggering portfolio indexing...');
  console.log(`Site URL: ${SITE_URL}`);

  try {
    const response = await fetch(`${SITE_URL}/api/index-portfolio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clearFirst: true })
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Portfolio indexed successfully');
      console.log('Stats:', JSON.stringify(data.stats, null, 2));
    } else {
      console.error('❌ Indexing failed:', data.error);
      // Don't fail the build, just warn
      console.warn('⚠️  Build will continue. You can manually index later with POST /api/index-portfolio');
    }
  } catch (error) {
    console.error('❌ Error triggering indexing:', error.message);
    // Don't fail the build, just warn
    console.warn('⚠️  Continuing without indexing. Run POST /api/index-portfolio manually after deployment.');
  }
}

// Only run if not in CI or if explicitly enabled
if (process.env.SKIP_POST_BUILD_INDEX !== 'true') {
  triggerIndexing();
} else {
  console.log('Skipping post-build indexing (SKIP_POST_BUILD_INDEX=true)');
}
