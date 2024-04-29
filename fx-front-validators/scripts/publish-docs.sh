#! /usr/bin/bash

read -p "输入服务器用户名: " username

ssh "$username"@10.255.134.231 "cd /home/www/fx-front-validators-docs; rm -rf *"

scp -r ./docs/.vitepress/dist/*  "$username"@10.255.134.231:/home/www/fx-front-validators-docs