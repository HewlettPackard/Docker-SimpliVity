#!/bin/bash

DOCKER_BIN=$(which docker)

is_mgr=$("$DOCKER_BIN" info | awk '/Is Manager/ {print $3}')
is_mgr=${is_mgr,,}

if [ "$is_mgr" == "true" ]
then
  "$DOCKER_BIN" service ls  \
    | tail -n +2 \
    | sed -e "s/,/ /g" \
    | sed -E "s/\s\s+/,/g"
fi
