source ~/.nvm/nvm.sh
nvm use 14.17.0
pnpm build
source ~/.nvm/nvm.sh
nvm use 10.14.2
cd dist/fx-front-framework
npm publish
source ~/.nvm/nvm.sh
nvm use 14.17.0

echo "Publish completed"
