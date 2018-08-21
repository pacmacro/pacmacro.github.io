#!/usr/bin/env python
#
# This Python script packages the Electron distributables using
# electron-packager, then zips each OS-specific package and renames them to
# human-readable files.

from subprocess import call
import os
import shutil

current_dir = os.path.dirname(os.path.realpath(__file__))

print("Building release files to " + current_dir)
call(["electron-packager", current_dir + "/../", "--all", "--out", current_dir])
print("")

renames = [
    ("darwin-x64", "Darwin 64-bit"),
    ("linux-arm64", "Linux ARM 64-bit"),
    ("linux-armv7l", "Linux ARMv7 32-bit"),
    ("linux-ia32", "Linux Intel 32-bit"),
    ("linux-x64", "Linux Intel 64-bit"),
    ("mas-x64", "Microsoft Assembler 64-bit"),
    ("win32-ia32", "Windows 32-bit"),
    ("win32-x64", "Windows 64-bit") ]

for filename in os.listdir(current_dir):
    if filename.startswith("pac-macro") and not filename.endswith(".zip"):
        print("Zipping " + filename)
        shutil.make_archive(filename, "zip", current_dir, filename)

        # Move zipped file back into build/ directory if it is not already there
        zipped_filename = filename + ".zip"
        shutil.move(zipped_filename, os.path.join(current_dir, zipped_filename))

        for r in renames:
            if r[0] in zipped_filename:
                new_filename = "Pac Macro (" + r[1] + ").zip"
                print("Renaming file \"" + zipped_filename + "\" to \"" +
                        new_filename + "\"")
                os.rename(
                        os.path.join(current_dir, zipped_filename),
                        os.path.join(current_dir, new_filename) )
                break