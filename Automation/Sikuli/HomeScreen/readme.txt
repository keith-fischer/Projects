
Create local folders:
C:\Automation\Sikuli\HomeScreen
C:\Automation\Sikuli\HomeScreen\TestResults\


Copy Folder
G:\SWDev\Private\SQA Tests\Automation\Mobile\Sikuli\HomeScreen\HomeScreenRegression.sikuli
TO
C:\Automation\Sikuli\HomeScreen\

Copy File
G:\SWDev\Private\SQA Tests\Automation\Mobile\Sikuli\HomeScreen\StartHomeScreenRegression.bat
TO
C:\Automation\Sikuli\HomeScreen


Edit this line in the batch file and verify the the path to your sikuli folder:
"C:\Program Files\Sikuli-IDE\sikuli-script.cmd" -r "C:\Automation\Sikuli\HomeScreen\HomeScreenRegression.sikuli"