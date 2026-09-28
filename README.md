# MOVE Lab 官方网站

这是可独立运行的 Jekyll / GitHub Pages 项目，保留已确认的官网设计。

## 本地运行

本机交付文件夹附带 `.runtime/` 便携依赖，双击 `start.cmd`，访问 http://127.0.0.1:8000/ 。保存 Markdown 后 Jekyll 会自动重建，刷新浏览器即可看到修改。端口占用时：`powershell -File start.ps1 -Port 8001`。

在另一台电脑上，从官方 https://rubyinstaller.org/ 安装 Ruby（macOS/Linux 使用系统适用的 Ruby 安装方式），然后在项目目录运行：

```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 8000
```

## 日常更新：改 Markdown，提交到 GitHub

| 内容 | 编辑位置 |
|---|---|
| 首页 Summary、顶部 affiliations | `_pages/about.md`（affiliations 在文件开头） |
| 招聘信息 | `_sections/02-positions.md` |
| 首页精选论文 | `_sections/03-publications.md` |
| 四个研究方向、配图、放大介绍 | `_interests/*.md` |
| 团队成员、学历、照片 | `_people/*.md` |
| Research / Publications / Teaching / Experience | `_pages/` 下对应 Markdown |
| 团队分组标题、导航 | `_data/team_groups.yml`、`_data/navigation.yml` |
| 域名、仓库子路径、网站设置 | `_config.yml` |
| 样式与页面布局 | `assets/style.css`、`_layouts/`、`_includes/` |

每个成员一个 Markdown；新增成员可复制同组成员文件，修改 `title`、`photo`、`order` 和正文。分组用 `postdoctoral`、`phd`、`graduated`、`visiting`、`alumni`。图片路径从 `/assets/` 开始，数字 `order` 控制排序。不需要编辑生成的 `_site/`，也不再需要运行原来的 Python 构建脚本。

## 迁移到原 GitHub 仓库

1. 先在原仓库创建迁移分支。将**本目录内的内容**放到仓库根目录，而不是再套一层 `Official Website`。
2. 如果覆盖旧主题，移除旧主题的 `_layouts`、`_includes`、`_sass`、`_pages` 和旧的预构建 `docs/`、`v1/` 后，再放入本版本；不要合并保留同路径的旧主题文件。旧仓库已在本次迁移备份中保存。
3. 保留原仓库自己的 `.git`；不要把其他目录的 `.git`、`.runtime/`、`_site/` 或本地缓存上传。
4. GitHub 仓库 Settings → Pages → Source 选择 **Deploy from a branch**，选择正式发布分支和 **/(root)**。这是 Jekyll 原生构建，不能选旧的 `/docs`。
5. `fangnizhang.github.io` 用户站点保持 `baseurl: ""`；项目站点改为 `baseurl: "/仓库名"`。同时按实际地址修改 `url` 和 `repository`。
6. 后续直接在 GitHub 上编辑 Markdown 并提交，Pages 就会重新构建。不需要手动导出 HTML。

官方说明：https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll

## Digital Website 边界

`demo-dase4122/` 是当前官网 Teaching 链接的**静态课程演示页**，可随官网部署到 GitHub Pages。原 Digital Website 的 Flask 后端、登录、数据库、上传、批改、课件等仍位于上一级 TDG_website，独立运行。GitHub Pages 不运行 Flask 后端。若以后部署了完整课程系统，只需在 `_pages/teaching.md` 将 Digital Website 链接换为那个系统的网址。

## 验证

```sh
bundle exec jekyll build
python scripts/check_site.py _site
```

Python 只用于检查，不参与日常网站构建。

原始图片保存在 `source-images/`，实际页面配图在 `assets/`。本机附带的 `.runtime/` 不进入 GitHub 源码包。旧文件清理与备份位置见 MIGRATION.md。
