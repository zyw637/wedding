# 电子婚礼请帖 · 一键部署
# 纯静态站点：用 nginx 托管 4 个 HTML 页 + 素材
FROM nginx:alpine

# 站点文件（.dockerignore 已排除 .git、DS_Store 等）
COPY . /usr/share/nginx/html/

# 默认放开 80 端口（映射到宿主机端口由 compose/-p 决定）
EXPOSE 80

# nginx 镜像默认 CMD 即以前台启动，无需额外命令