#!/bin/bash
JQ_BIN=$(dirname "$0")/jq
DOCKER_BIN=$(which docker)
"$DOCKER_BIN" inspect $("$DOCKER_BIN" ps -aq) | "$JQ_BIN" -c -M -r ".[]"
