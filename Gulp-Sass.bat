@echo off 
Pushd "%~dp0" 
attrib -r /s workspace/shared/resources/css/*.* 
gulp sass 