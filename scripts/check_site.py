"""Check generated routes, local assets, editable content, and subpath links."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else '_site').resolve()
base = sys.argv[2].rstrip('/') if len(sys.argv) > 2 else ''

class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        ref = attrs.get('href' if tag in ('a', 'link') else 'src' if tag in ('img', 'script') else '')
        if ref:
            self.refs.append(ref)

for route in ('', 'research', 'team', 'publications', 'teaching', 'experience', 'demo-dase4122'):
    page = root / route / 'index.html'
    html = page.read_text(encoding='utf-8')
    assert '{{' not in html and '{%' not in html, page
    parser = References()
    parser.feed(html)
    for ref in parser.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc or not url.path:
            continue
        path = unquote(url.path)
        if path.startswith('/'):
            assert not base or path == base or path.startswith(base + '/'), (page, ref)
            target = root / path[len(base):].lstrip('/')
        else:
            target = page.parent / path
        if target.is_dir():
            target /= 'index.html'
        assert target.is_file(), (page, ref)

home = (root/'index.html').read_text(encoding='utf-8')
team = (root/'team/index.html').read_text(encoding='utf-8')
teaching = (root/'teaching/index.html').read_text(encoding='utf-8')
assert home.count('class="interest-card"') == 4
captions = re.findall(r'<p class="interest-description" hidden>(.*?)</p>', home)
assert len(captions) == 4 and all(len(c.split()) == 30 for c in captions)
assert home.count('<dialog') == 1
assert team.count('class="person-card"') == 14
assert team.count('class="alumni-row"') == 4
assert 'DASE 4122/IMSE4122' in teaching and 'Digital Website' in teaching
assert 'teaching-demo' not in teaching
for private in ('main.py', 'instance', 'uploads', '.runtime', 'README.md', 'scripts', '_people', 'start.ps1'):
    assert not (root/private).exists(), f'Unexpected private/build source in output: {private}'
print('PASS: seven routes, images, four captions, 18 members, course link, and publication boundaries.')
