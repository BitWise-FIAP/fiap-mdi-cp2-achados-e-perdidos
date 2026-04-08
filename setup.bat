@echo off
echo Instalando dependencias...
npm install --legacy-peer-deps
npm install expo-linking --legacy-peer-deps
npm install @react-native-async-storage/async-storage@2.2.0 --legacy-peer-deps
echo Dependencias instaladas. Agora execute 'npm start' para iniciar o projeto.
pause