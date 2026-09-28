param([int]$Port = 8000)
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$ruby = Join-Path $PSScriptRoot '.runtime/ruby/bin/ruby.exe'
if (Test-Path -LiteralPath $ruby) {
    $env:GEM_HOME = Join-Path $PSScriptRoot '.runtime/gems'
    $env:GEM_PATH = $env:GEM_HOME
    $env:GEM_SPEC_CACHE = Join-Path $PSScriptRoot '.runtime/gem-cache'
    & $ruby (Join-Path $env:GEM_HOME 'bin/jekyll') serve --host 127.0.0.1 --port $Port
} else {
    if (-not (Get-Command bundle -ErrorAction SilentlyContinue)) { throw 'Install Ruby + Bundler, then run bundle install. See README.md.' }
    bundle exec jekyll serve --host 127.0.0.1 --port $Port
}
exit $LASTEXITCODE
