#!/bin/bash

for i in {1..10}
do
    #ranNum=$[RANDOM%10+300]
    #echo $ranNum
    #echo 'posting ...'
    curl --header "Content-Type: application/json" --request POST --data '{"temperature":23.0,"humidity":23,"pressure":23}' http://192.168.1.163:8000/api/endpoint/
    echo ""
    sleep 1
done


