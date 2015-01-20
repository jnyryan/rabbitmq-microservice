#!/bin/bash

for orderId in {1..10}
do
  python ./utilities/bulk_insert.py 1 "test" "test.key" "{orderId:$orderId, productId:1}" &
done

for orderId in {1..10}
do
  python ./utilities/bulk_insert.py 1 "order" "new" "{orderId:$orderId, productId:1}" &
done

echo DONE
