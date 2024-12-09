echo "Building Client"
cd client
npm i
npm run build
cp -r dist/* ../backend/build/

echo "Installing Server Dependencies"
cd ../backend
npm i