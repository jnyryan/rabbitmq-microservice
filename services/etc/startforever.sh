#!/bin/bash

mkdir -p ./logs

forever start \
-al ./all.log \
-ao ./all.log \
-ae ./all.log \
-w \
./services/order-manager.js

forever start \
-al ./all.log \
-ao ./all.log \
-ae ./all.log \
-w \
./services/dispatch-manager.js
