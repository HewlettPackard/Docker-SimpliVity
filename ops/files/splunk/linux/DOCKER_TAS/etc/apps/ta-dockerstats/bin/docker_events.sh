#!/bin/bash

DOCKER_BIN=$(which docker)
"$DOCKER_BIN" events
