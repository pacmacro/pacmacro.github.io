#!/usr/bin/env sh
#
# This shell script deploys all necessary files from this project to an
# SFU webspace configured at the SSH host named "sfu".
#
# Details on the SSH setup: https://www.sfu.ca/itservices/publishing/publish_howto/SFTPpublishing.html

if [ $# -lt 1 ] ; then
  echo "Usage: ./deploy_sfu-webspace.sh DEPLOYMENT_PATH"
  exit
fi

PACMACRO_DIR="pub_html/pac-macro"
PROJECT_DIR="${PACMACRO_DIR}/$1"

cd `dirname $0`
cd ../

echo "Removing previous project files..."
ssh sfu "chmod 777 ${PROJECT_DIR} && rm -rf ${PROJECT_DIR}"

echo "Creating directory '${PROJECT_DIR}' for the project files..."
ssh sfu "mkdir -p ${PROJECT_DIR}"

echo "Sending project files to the webspace..."
scp index.html sfu:${PROJECT_DIR}/index.html
scp -r assets sfu:${PROJECT_DIR}/

echo "Modifying project file permissions..."
ssh sfu "chmod 755 ${PACMACRO_DIR} ${PROJECT_DIR}"
ssh sfu "chmod 644 ${PROJECT_DIR}/*.* ${PROJECT_DIR}/assets/**/*.*"

echo "The program has been deployed to http://sfu.ca/~{STUDENT_ID}/pac-macro/${1}."
