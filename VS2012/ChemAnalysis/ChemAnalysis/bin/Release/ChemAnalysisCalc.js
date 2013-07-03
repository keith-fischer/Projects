/* File Created: May 9, 2012 */
/*TestRunnerHelper*/
var MetalItem = {
    Metal: '',
    CalcIndex: 0,
    CalcFormula: '',
    SliderValues: [],
    TestIndex: [],
    ExcelRow: 2
}

var TR = {/*TestRunnerHelper object used for TestRunner App*/
    Rnd: function (multi) {
        return Math.round((Math.random() * multi));
    },
//    Rnd0: function () {
//        return this.Rnd(1);
//    },
//    Rnd1: function () {
//        return this.Rnd(10);
//    },
//    Rnd2: function () {
//        return this.Rnd(100);
//    },
//    Rnd3: function () {
//        return this.Rnd(1000);
//    },
//    Rnd4: function () {
//        return this.Rnd(10000);
//    },
//    Rnd5: function () {
//        return this.Rnd(100000);
//    },
//    Rnd6: function () {
//        return this.Rnd(1000000);
//    },
    VARS: [],
    METALS: [],
    LastErr: '',
    SetVar: function (key, data) {
        var er = '';
        try {
            if (key == undefined || key == null || key == '')
                return;
            if (data == undefined || data == null)
                return;
            this.VARS[key] = data;
        }
        catch (err) {
            er = err;
        }

        this.LastErr = er;
        return;
    },

    GetVar: function (key) {
        var er = '';
        try {
            if (key === undefined || key === null || key === '')
                return '';
            if (this.VARS[key] === undefined || this.VARS[key] === null)
                return '';
            else
                return this.VARS[key];
        } catch (err) {
            er = err;
        }
        this.LastErr = er;
        return '';

    }


    /*  End TestRunnerHelper object*/
}


function IsCalcJSReady() {
    TR.SetVar('TestRunnerStatus', 'Ready');
    console.Print('TestRunnerStatus: ' + TR.GetVar('TestRunnerStatus'));
    if (TR.GetVar('TestRunnerStatus') == 'Ready')
        return true;
    else
        return false;
}

function CalcInit() {
    var rc = false;
    TR.METALS['Aluminum']=new MetalItem();
    TR.METALS['Aluminum'].TestIndex=2;
    TR.METALS['Aluminum'].MetalItem=1;
    TR.METALS['Aluminum'].CalcFormula=1;
    TR.METALS['Aluminum'].ExcelRow=2;
    Antimony
Arsenic
Barium
Beryllium
Bismuth
Cadmium
Calcium
Chromium III
Chromium VI
Cobalt
Copper
Gold
Iron
Lead
Lithium
Magnesium
Manganese
Mercury
Molybdenum
Nickel
Palladium
Platinum
Potassium
Rhodium
Selenium
Silver
Sodium
Strontium
Tellurium
Thallium
Tin
TItanium
Uranium
Vanadium
Zinc
Tungsten


    return rc;
}
IsCalcJSReady();
