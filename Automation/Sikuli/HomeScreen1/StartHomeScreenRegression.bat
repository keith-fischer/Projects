

set jpath = "C:\Program Files (x86)\Java\jre6\bin\java"


set sikuli_path = "C:\Program Files\Sikuli-IDE\sikuli-script.jar"
set start_test_path = "C:\Users\kf\Desktop\GitHub\MobileAutomation\Sikuli\HomeScreen\Options_Help.sikuli"

set a1 = arg1
set a2 = arg2
set a3 = arg3


set testrun = %jpath% %sikuli_path% %start_test_path%

::%testrun%

:: %jpath% -jar %sikuli_path% %start_test_path%
:: java -jar -%SIKULI_HOME%\sikuli-script.jar %3
:: --args a1 a2 a3 -s,--stderr
C:

"C:\Program Files\Sikuli-IDE\sikuli-script.cmd" -r "C:\Automation\Sikuli\HomeScreen\HomeScreenRegression.sikuli"

::"C:\Program Files\Java\jre6\bin\java" -jar "C:\Program Files\Sikuli-IDE\sikli-script.cmd" "C:\Users\kf\Desktop\GitHub\MobileAutomation\Sikuli\HomeScreen\Options_Help.sikuli"
::"C:\Program Files (x86)\Java\jre6\bin\java" -jar "C:\Program Files (x86)\Sikuli X\sikuli-script.jar" "C:\Users\keith.fischer\Documents\Sikuli\HomeScreen\add remove people.sikuli" --s,--stderr
::  "C:\Program Files (x86)\Java\jre6\bin\java" -jar "C:\Program Files (x86)\Sikuli X\sikuli-script.jar" start_test_path

pause



