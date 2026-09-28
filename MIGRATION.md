# 官网独立迁移记录

完成日期：2026-09-27。

- 独立官网：`E:\yjj_all_files\TDG_website\Official Website`。
- 当前代码保留原仓库 Git 历史和 origin，位于本地 `official-website-migration` 分支。未提交、推送或更改线上站点。
- 旧 `_pages/about.md` 中的 Summary 和 affiliations → `_pages/about.md`；招聘与精选论文 → `_sections/`；研究方向 → `_interests/`；成员 → `_people/`。这些都是日常维护的 Markdown 源文件。
- 当前生效的图片位于 `assets/`，原 `pic/` 原图位于 `source-images/`（不发布到生成站点）。
- 旧的 `lab_site_v1/` 整个目录（含 `.git`、未提交内容、`docs/`、`v1/`、`v1-src/`、旧主题）以及原 `pic/` 已在清理前打包，逐文件 SHA-256 校验通过。
- 备份：`C:\Users\DCKJ\Documents\Codex\2026-09-27\new-chat\migration-backup\official-before-migration.zip`；校验清单在同目录 `manifest.json`。需要恢复时解压回 TDG_website 即可。
- `main.py`、`requirements.txt`、`templates/`、`static/`、`instance/`、`uploads/`、`Slides/`、`static_showcase/` 保留在 TDG_website。没有将数据库、账号信息、上传文件或服务端配置打包进官网源码。
- Digital Website 继续在 TDG_website 下运行 `python main.py`，原端口 5001；官网默认端口 8000，两者相互独立。

请按 README.md 完成一次 GitHub Pages 的根目录发布设置，之后继续编辑 Markdown 并提交即可。GitHub Pages 的自动部署结果需要上传后才能验证；本次未执行线上部署。
