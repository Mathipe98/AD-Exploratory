#!/bin/bash

# check if db exist
if [ -z "$DBNAME" ]
then
      echo "\$DBNAME is empty.Exit"
      exit 1
else
  if [ -d "/dbs/${DBNAME}" ] 
  then
    echo "Directory /dbs/${DBNAME} exists." 
  else
tee /dbs/${DBNAME}.sql <<EOF
    connect 'jdbc:derby:${DBNAME};user=${DERBY_USER};create=true';
EOF
    /derby/bin/ij /dbs/${DBNAME}.sql
  fi
fi

rm -Rf /dbs/${DBNAME}.sql 

java -Dderby.stream.error.field=java.lang.System.out org.apache.derby.drda.NetworkServerControl start -h 0.0.0.0