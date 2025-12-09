# Add Proteomorphic Chatbot to All Pages
Write-Host "`n🤖 Proteomorphic Chatbot Integration Script" -ForegroundColor Cyan

$projectRoot = "c:\Users\lenovo\report\proteomorphic"

# Root-level pages
$rootPages = @("index.html", "knowledge.html", "iot-monitoring.html", "admin.html")

# Subfolder pages
$subfolderPages = @("analysis\input.html", "auth\login.html", "auth\signup.html", "report\view.html")

# Process root pages
Write-Host "`nProcessing root-level pages..." -ForegroundColor Yellow
foreach ($page in $rootPages) {
    $filePath = Join-Path $projectRoot $page
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        if ($content -notmatch "chatbot\.js") {
            $chatbotCode = "`n    <!-- Proteomorphic Chatbot Widget -->`n    <link rel=`"stylesheet`" href=`"css/chatbot.css`">`n    <script src=`"js/chatbot.js`"></script>`n</body>"
            $newContent = $content -replace "</body>", $chatbotCode
            Set-Content $filePath $newContent
            Write-Host "  ✓ Added chatbot to $page" -ForegroundColor Green
        } else {
            Write-Host "  ○ Already has chatbot: $page" -ForegroundColor DarkGray
        }
    }
}

# Process subfolder pages
Write-Host "`nProcessing subfolder pages..." -ForegroundColor Yellow
foreach ($page in $subfolderPages) {
    $filePath = Join-Path $projectRoot $page
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        if ($content -notmatch "chatbot\.js") {
            $chatbotCode = "`n    <!-- Proteomorphic Chatbot Widget -->`n    <link rel=`"stylesheet`" href=`"../css/chatbot.css`">`n    <script src=`"../js/chatbot.js`"></script>`n</body>"
            $newContent = $content -replace "</body>", $chatbotCode
            Set-Content $filePath $newContent
            Write-Host "  ✓ Added chatbot to $page" -ForegroundColor Green
        } else {
            Write-Host "  ○ Already has chatbot: $page" -ForegroundColor DarkGray
        }
    }
}

Write-Host "`n✅ Chatbot integration complete!" -ForegroundColor Green
Write-Host "💡 Test by opening any page in your browser.`n" -ForegroundColor Cyan
