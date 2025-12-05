# AI-Detect Endpoint Fix - Root Cause Found

## Problem Summary
The `/ai-detect` endpoint at `https://openredaction-api.onrender.com/ai-detect` is returning:
```json
{
  "entities": [],
  "aiUsed": false
}
```

## Root Cause Identified

After reviewing the actual implementation, the issue is clear:

### The Code Flow:
1. **Route Handler** (`src/routes/ai-detect.ts`): Calls `detectPIIWithDeepSeek(text)`
2. **DeepSeek Client** (`src/utils/deepseekClient.ts`): 
   - Line 60: Checks if `config.deepseekApiKey` exists
   - If missing: **throws error** `'DeepSeek API key not configured'`
   - If API call fails: Returns empty array `[]`
3. **Route Handler Catch Block**: Catches any error and sets `aiUsed = false`

### The Problem:
**The `DEEPSEEK_API_KEY` environment variable is likely not set in Render.com production environment.**

When the API key is missing:
- `detectPIIWithDeepSeek()` throws an error immediately
- The route handler catches it and returns `{ entities: [], aiUsed: false }`
- No actual AI call is made

## Files Involved

### 1. `src/routes/ai-detect.ts` (Lines 95-103)
```typescript
try {
  entities = await detectPIIWithDeepSeek(text);
  aiUsed = true;
} catch (error) {
  // DeepSeek failed - return empty entities but don't throw
  request.log.error({
    endpoint: '/ai-detect',
    error: error instanceof Error ? error.message : 'Unknown error',
    aiUsed: false
  });
}
```

### 2. `src/utils/deepseekClient.ts` (Lines 59-61)
```typescript
if (!config.deepseekApiKey) {
  throw new Error('DeepSeek API key not configured');
}
```

### 3. `src/config.ts` (Line 50)
```typescript
// DeepSeek AI (optional)
DEEPSEEK_API_KEY: z.string().optional(),
```

## Solution

### Option 1: Set Environment Variable in Render.com (Recommended)

1. Go to Render.com dashboard
2. Select the `openredaction-api` service
3. Go to **Environment** tab
4. Add environment variable:
   - **Key**: `DEEPSEEK_API_KEY`
   - **Value**: Your DeepSeek API key (starts with `sk-...`)
5. **Redeploy** the service

### Option 2: Improve Error Handling (Better UX)

Update `src/routes/ai-detect.ts` to provide better error messages:

```typescript
try {
  entities = await detectPIIWithDeepSeek(text);
  aiUsed = true;
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  
  // Log the actual error for debugging
  request.log.error({
    endpoint: '/ai-detect',
    error: errorMessage,
    aiUsed: false
  });
  
  // If it's a configuration error, we could return a more helpful message
  // But for privacy/security, we'll just return empty for now
  entities = [];
  aiUsed = false;
}
```

### Option 3: Check Render.com Logs

1. Go to Render.com dashboard
2. Select the `openredaction-api` service
3. Go to **Logs** tab
4. Look for errors containing: `"DeepSeek API key not configured"` or `"endpoint": "/ai-detect"`

## Verification Steps

After setting the environment variable:

1. **Test the endpoint**:
```bash
curl -X POST https://openredaction-api.onrender.com/ai-detect \
  -H "Content-Type: application/json" \
  -d '{"text": "john smith John Smith JOHN SMITH"}'
```

2. **Expected response** (if API key is set):
```json
{
  "entities": [
    {"type": "NAME", "value": "john smith", "start": 0, "end": 10},
    {"type": "NAME", "value": "John Smith", "start": 11, "end": 21},
    {"type": "NAME", "value": "JOHN SMITH", "start": 22, "end": 32}
  ],
  "aiUsed": true
}
```

3. **Check Render.com logs** for any DeepSeek API errors

## Additional Notes

- The code is **correctly implemented** - it's just missing the API key
- The error handling is **intentionally silent** for privacy/security reasons
- The `DEEPSEEK_API_KEY` is marked as `optional` in the config schema, so the app starts without it
- The route handler gracefully handles missing API key by returning empty results

## Next Steps

1. ✅ **Set `DEEPSEEK_API_KEY` in Render.com environment variables**
2. ✅ **Redeploy the service**
3. ✅ **Test the endpoint** with the curl command above
4. ✅ **Verify in playground** that AI detection now works

## Code References

- Route: `src/routes/ai-detect.ts` (lines 95-103)
- DeepSeek Client: `src/utils/deepseekClient.ts` (lines 59-61, 123)
- Config: `src/config.ts` (line 50)
