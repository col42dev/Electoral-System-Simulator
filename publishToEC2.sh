#!/bin/bash  
echo Publishing
# scp -r /Users/colinmoore/cmoore2.pem ./dist/. ec2-user@ec2-54-201-237-107.us-west-2.compute.amazonaws.com:~/nginx/html/stv/.
scp -r ./dist/. ec2-user@ec2-54-201-237-107.us-west-2.compute.amazonaws.com:~/nginx/html/stv/.

