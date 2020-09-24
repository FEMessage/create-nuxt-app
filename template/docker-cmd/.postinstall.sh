#!/bin/bash
if [ ! -f 'Dockerfile' ]; then
  npx @femessage/dockerize-cli init
else
  echo dockerize inited
fi
