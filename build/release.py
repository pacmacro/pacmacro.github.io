#!/usr/bin/env python

from subprocess import call
import os
import shutil

current_dir = os.path.dirname(os.path.realpath(__file__))

print("Building release files to " + current_dir)
call(["electron-packager", current_dir + "/../", "--all"])
print()

for filename in os.listdir(current_dir):
    if filename.startswith("pac-macro-") and not filename.endswith(".zip"):
        print("Zipping " + filename)
        shutil.make_archive(filename, "zip", current_dir, current_dir + "/" + filename)