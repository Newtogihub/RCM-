This Applicaiton has an Auto Deployment Configured to Hostiner VPS which is running a docker image.
Test It

### Option A: Push Any Change
Make any small change to your code and push:

git add .
git commit -m "Test CI/CD"
git push origin main

### Option B: Manual Trigger

1. Go to: **https://github.com/Newtogihub/RCM-/actions**
2. Click **"Deploy to VPS"** workflow
3. Click **"Run workflow"** → **"Run workflow"**

## Step 5: Watch Deployment

1. Go to: **https://github.com/Newtogihub/RCM-/actions**
2. Click on the running workflow
3. Watch the logs in real-time
4. Green checkmark ✅ = Success!
