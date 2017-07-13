# MasterClass-Streaming Server

  ![Version](https://img.shields.io/npm/v/npm.svg)
  ![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)
  ![Build](https://img.shields.io/vso/build/larsbrinkhoff/953a34b9-5966-4923-a48a-c41874cfb5f5/1.svg)

  This is platform for streaming server  
# Installation
```
npm install
```
# Configure
Please following this guide to install ffmpeg

## Ubuntu users
```
http://ubuntuhandbook.org/index.php/2017/05/install-ffmpeg-3-3-in-ubuntu-16-04-14-04/
```
And install some packages
```
https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu
```
## Mac users 
The simplest way to install ffmpeg on Mac OS X is with Homebrew.

Once you have Homebrew installed install ffmpeg from the Terminal with the following:
```
brew install ffmpeg
```
# Usage
## Development 

```
npm run dev
```

## Functional Test

```
npm test
```

## Native test

1 . Create video folder and add one mp4 video to this folder

2 . Rename your video name to '1.mp4'

3 . Run ``` npm run dev ``` 
# License
MIT