count=1
while [ $count -le 20 ]; do
    timeout 1s node dist/producer.js
    ((count++))
done