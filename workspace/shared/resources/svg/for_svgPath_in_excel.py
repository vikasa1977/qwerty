import csv
import os
from sys import argv
import pandas as pd

input_file = argv[1]

if input_file.endswith('.csv'):
    foot = ""
    footer = ""
    print("Operation started...")
    with open(input_file, 'r') as f:
        rowNo = 0
        reader = csv.reader(f)
        reader = zip(*reader)
        for i, row in enumerate(reader):
            colNo = 0
            if i == 1:
                iconNames = row[1:]
            elif i == 2:
                iconPath = row[1:]
            elif i>2:
                for j,col in enumerate(row):
                    if j==0:
                        fo = open(col+"-icons-svg.js", "w")
                        head = "var "+ col +"_icons = '"+"\\\n"
                        head2 = "<svg style="+'"'+"position: absolute; width: 0; height: 0;"+'"'+" version="+'"'+"1.1"+'"'+" xmlns="+'"'+"http://www.w3.org/2000/svg"+'"'+" xmlns:xlink="+'"'+"http://www.w3.org/1999/xlink"+'"'+">\\\n"
                        head3 = "<defs>\\\n"
                        foot =  " </defs>"+"\\"+"\n</svg>"+"'\n\n"
                        footer = "$(document).ready(function () {"+"\n\t"+"$("+'"'+"body"+'"'+").prepend("+col+"_icons);"+"\n"+"});\n"
                        footer = foot + footer
                        fo.write(head+head2+head3)
                    else:
                        if col == "Yes":
                            fo.write(iconPath[j-1])
                fo.write(footer_total)
                fo.close()

    print("Operation ended...")

elif input_file.endswith('.xlsx'):
    print("Operation started...")
    data_xls = pd.read_excel(input_file, 'Sheet1', index_col=None)
    data_xls.to_csv('your_csv.csv', encoding='utf-8')
    with open('your_csv.csv', 'r') as f:
        rowNo = 0
        reader = csv.reader(f)
        reader = zip(*reader)
        for i, row in enumerate(reader):
            colNo = 0
            if i == 1:
                print(len(row))
                iconNames = row[1:]
            elif i == 2:
                iconPath = row[1:]
            elif i > 2:
                for j,col in enumerate(row):
                    if j==0:
                        fo = open(col+"-icons-svg.js", "w")
                        head = "var "+ col +"_icons = '"+"\\\n"
                        head2 = "<svg style="+'"'+"position: absolute; width: 0; height: 0;"+'"'+" version="+'"'+"1.1"+'"'+" xmlns="+'"'+"http://www.w3.org/2000/svg"+'"'+" xmlns:xlink="+'"'+"http://www.w3.org/1999/xlink"+'"'+">\\\n"
                        head3 = "<defs>\\\n"
                        foot =  " </defs>"+"\\"+"\n</svg>"+"'\n\n"
                        footer = "$(document).ready(function () {"+"\n\t"+"$("+'"'+"body"+'"'+").prepend("+col+"_icons);"+"\n"+"});\n"
                        footer = foot + footer
                        fo.write(head+head2+head3)
                    else:
                        if col == "Yes":
                            fo.write(iconPath[j-1])

                fo.write(footer)
                fo.close()
                
    print("Operation ended...")
    os.remove("your_csv.csv")
else:
    print("File format not supported.")