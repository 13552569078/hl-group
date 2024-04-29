#! /usr/bin/bash

read -p "输入服务器用户名: " username

ssh "$username"@10.255.134.231 "cd /home/www/hongluan-ui-docs/1x; rm -rf *"

scp -r ./website-dist/*  "$username"@10.255.134.231:/home/www/hongluan-ui-docs/1x
