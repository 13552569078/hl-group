#! /usr/bin/bash

# Do not run this file without setting the environment variables, you will end up fatal error
# If you wish to run this locally, please change the env variable before running this.
# echo "//${REGISTRY}/:_authToken=${TOKEN}" > .npmrc

cd dist/hongluan-ui
npm publish --access public
cd -

echo "✅ Publish completed"
