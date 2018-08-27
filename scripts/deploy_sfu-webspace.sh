#!/usr/bin/env sh
#
# This shell script deploys all necessary files from this project to an
# SFU webspace configured at the SSH host named SFU.
#
# Details on the SSH setup: https://www.sfu.ca/itservices/publishing/publish_howto/SFTPpublishing.html

cd `dirname $0`
cd ../

ssh sfu "mkdir -p pub_html/pac-macro"
scp index.html sfu:pub_html/pac-macro/index.html
scp -r assets/ sfu:pub_html/pac-macro/

ssh sfu "chmod 644 pub_html/pac-macro/*.* pub_html/pac-macro/assets/**/*.*"
