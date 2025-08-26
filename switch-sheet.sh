#!/bin/bash

if [ "$1" == "kls" ]; then
    cp ./employee_case_completion/.kls.json ./employee_case_completion/.clasp.json
elif [ "$1" == "demo" ]; then
    cp ./employee_case_completion/.demo.json ./employee_case_completion/.clasp.json
else 
    echo "Args: kls or demo"
fi
