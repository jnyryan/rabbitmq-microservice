#!/bin/bash

for orderId in {1..10}
do
  python ./utilities/bulk_insert.py 1 "new" "{orderId:$orderId, productId:1}" &
done

echo DONE
