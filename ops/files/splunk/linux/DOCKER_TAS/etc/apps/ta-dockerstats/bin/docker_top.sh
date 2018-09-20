#!/bin/bash

DOCKER_BIN=$(which docker)
for container_id in $("$DOCKER_BIN" ps -q); do
  command_date=$(date -u +%Y-%m-%dT%H:%M:%S%z)
  "$DOCKER_BIN" top $container_id \
    -Ao pid,ppid,pgid,vsz,tty,user,group,comm,args | \
    tail -n +2 | \
    sed -E 's/"/""/g' | \
    sed -E 's/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/' | \
    sed -E "s/^(.*)$/\"$command_date\",\"$container_id\",\"\1\"/"
done
#    -Ao pid,ppid,pgid,pcpu,vsz,nice,etime,time,tty,ruser,user,rgroup,group,comm,args:1000 | \
#    sed -E 's/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/; s/  +/","/' | \
