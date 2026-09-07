# 检查项目状态
Write-Host "=== 检查项目状态 ==="

# 检查 node_modules
if (Test-Path "node_modules") {
    $count = (Get-ChildItem "node_modules").Count
    Write-Host "✓ node_modules 目录存在，包含 $count 个项目"
} else {
    Write-Host "✗ node_modules 目录不存在"
}

# 检查 out
if (Test-Path "out") {
    $count = (Get-ChildItem "out").Count
    Write-Host "✓ out 目录存在，包含 $count 个项目"
} else {
    Write-Host "✗ out 目录不存在"
}

# 检查 .git
if (Test-Path ".git") {
    Write-Host "✓ .git 目录存在"
} else {
    Write-Host "✗ .git 目录不存在"
}

Write-Host "`n=== 检查完成 ==="
