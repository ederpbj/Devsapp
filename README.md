# Devsapp
Semelhante ao watszap

## M16 Aula 01

Devsapp projeto react-native b7web

## Iniciando:

git::https://github.com/ederpbj/Devsapp.git

>Clone

    git clone https://github.com/ederpbj/Devsapp.git

>Criar projeto

    react-native init Devsapp

>Instalar libs necessárias

    npm install --save react-navigation react-native-firebase redux react-redux redux-thunk

    npm install --save firebase

    yarn add react-native-gesture-handler --save

>Instalar  react-native-vector-icons

    npm install react-native-vector-icons

    react-native link react-native-vector-icons

>Atualizar npm

    npm install -g npm

>Resolvendo porblema das dependências

    rm -rf node_modules && npm install

>Listar devices online

    adb devices

>Upload de imagens A39

    npm install react-native-image-picker@latest --save

>Alteração no android/build.gradle

    dependencies {
            classpath("com.android.tools.build:gradle:3.4.+")

>Permissões do manifest

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

>Linkar

    react-native link

>Limpar cach

    cd android
    
        gradlew clean

>Desinstalar uma biblioteca

    npm uninstall  react-native-image-picker

>Confirurando

colar no gandle.properties

android.useAndroidX=true
android.enableJetifier=true

>Instalar para corrigir bug, datePicker

A39-Adicionando icone de foto

    npm audit fix
    npm i --save-dev jetifier
    npx jetify