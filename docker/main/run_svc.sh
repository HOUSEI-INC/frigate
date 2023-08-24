#!/bin/bash

# 启动frigate
python3 -m frigate &

# 进入web目录并运行npm命令
cd web && npm run dev

