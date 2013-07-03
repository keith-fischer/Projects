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
    //-------------------------------------------
    TR.METALS['Antimony'] = new MetalItem();
    TR.METALS['Antimony'].TestIndex = 2;
    TR.METALS['Antimony'].MetalItem = 1;
    TR.METALS['Antimony'].CalcFormula = 1;
    TR.METALS['Antimony'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Arsenic'] = new MetalItem();
    TR.METALS['Arsenic'].TestIndex = 2;
    TR.METALS['Arsenic'].MetalItem = 1;
    TR.METALS['Arsenic'].CalcFormula = 1;
    TR.METALS['Arsenic'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Barium'] = new MetalItem();
    TR.METALS['Barium'].TestIndex = 2;
    TR.METALS['Barium'].MetalItem = 1;
    TR.METALS['Barium'].CalcFormula = 1;
    TR.METALS['Barium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Beryllium'] = new MetalItem();
    TR.METALS['Beryllium'].TestIndex = 2;
    TR.METALS['Beryllium'].MetalItem = 1;
    TR.METALS['Beryllium'].CalcFormula = 1;
    TR.METALS['Beryllium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Bismuth'] = new MetalItem();
    TR.METALS['Bismuth'].TestIndex = 2;
    TR.METALS['Bismuth'].MetalItem = 1;
    TR.METALS['Bismuth'].CalcFormula = 1;
    TR.METALS['Bismuth'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Cadmium'] = new MetalItem();
    TR.METALS['Cadmium'].TestIndex = 2;
    TR.METALS['Cadmium'].MetalItem = 1;
    TR.METALS['Cadmium'].CalcFormula = 1;
    TR.METALS['Cadmium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Calcium'] = new MetalItem();
    TR.METALS['Calcium'].TestIndex = 2;
    TR.METALS['Calcium'].MetalItem = 1;
    TR.METALS['Calcium'].CalcFormula = 1;
    TR.METALS['Calcium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Chromium III'] = new MetalItem();
    TR.METALS['Chromium III'].TestIndex = 2;
    TR.METALS['Chromium III'].MetalItem = 1;
    TR.METALS['Chromium III'].CalcFormula = 1;
    TR.METALS['Chromium III'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Chromium VI'] = new MetalItem();
    TR.METALS['Chromium VI'].TestIndex = 2;
    TR.METALS['Chromium VI'].MetalItem = 1;
    TR.METALS['Chromium VI'].CalcFormula = 1;
    TR.METALS['Chromium VI'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Cobalt'] = new MetalItem();
    TR.METALS['Cobalt'].TestIndex = 2;
    TR.METALS['Cobalt'].MetalItem = 1;
    TR.METALS['Cobalt'].CalcFormula = 1;
    TR.METALS['Cobalt'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Copper'] = new MetalItem();
    TR.METALS['Copper'].TestIndex = 2;
    TR.METALS['Copper'].MetalItem = 1;
    TR.METALS['Copper'].CalcFormula = 1;
    TR.METALS['Copper'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Gold'] = new MetalItem();
    TR.METALS['Gold'].TestIndex = 2;
    TR.METALS['Gold'].MetalItem = 1;
    TR.METALS['Gold'].CalcFormula = 1;
    TR.METALS['Gold'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Iron'] = new MetalItem();
    TR.METALS['Iron'].TestIndex = 2;
    TR.METALS['Iron'].MetalItem = 1;
    TR.METALS['Iron'].CalcFormula = 1;
    TR.METALS['Iron'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Lead'] = new MetalItem();
    TR.METALS['Lead'].TestIndex = 2;
    TR.METALS['Lead'].MetalItem = 1;
    TR.METALS['Lead'].CalcFormula = 1;
    TR.METALS['Lead'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Lithium'] = new MetalItem();
    TR.METALS['Lithium'].TestIndex = 2;
    TR.METALS['Lithium'].MetalItem = 1;
    TR.METALS['Lithium'].CalcFormula = 1;
    TR.METALS['Lithium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Magnesium'] = new MetalItem();
    TR.METALS['Magnesium'].TestIndex = 2;
    TR.METALS['Magnesium'].MetalItem = 1;
    TR.METALS['Magnesium'].CalcFormula = 1;
    TR.METALS['Magnesium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Manganese'] = new MetalItem();
    TR.METALS['Manganese'].TestIndex = 2;
    TR.METALS['Manganese'].MetalItem = 1;
    TR.METALS['Manganese'].CalcFormula = 1;
    TR.METALS['Manganese'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Mercury'] = new MetalItem();
    TR.METALS['Mercury'].TestIndex = 2;
    TR.METALS['Mercury'].MetalItem = 1;
    TR.METALS['Mercury'].CalcFormula = 1;
    TR.METALS['Mercury'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Molybdenum'] = new MetalItem();
    TR.METALS['Molybdenum'].TestIndex = 2;
    TR.METALS['Molybdenum'].MetalItem = 1;
    TR.METALS['Molybdenum'].CalcFormula = 1;
    TR.METALS['Molybdenum'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Nickel'] = new MetalItem();
    TR.METALS['Nickel'].TestIndex = 2;
    TR.METALS['Nickel'].MetalItem = 1;
    TR.METALS['Nickel'].CalcFormula = 1;
    TR.METALS['Nickel'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Palladium'] = new MetalItem();
    TR.METALS['Palladium'].TestIndex = 2;
    TR.METALS['Palladium'].MetalItem = 1;
    TR.METALS['Palladium'].CalcFormula = 1;
    TR.METALS['Palladium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Platinum'] = new MetalItem();
    TR.METALS['Platinum'].TestIndex = 2;
    TR.METALS['Platinum'].MetalItem = 1;
    TR.METALS['Platinum'].CalcFormula = 1;
    TR.METALS['Platinum'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Potassium'] = new MetalItem();
    TR.METALS['Potassium'].TestIndex = 2;
    TR.METALS['Potassium'].MetalItem = 1;
    TR.METALS['Potassium'].CalcFormula = 1;
    TR.METALS['Potassium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Rhodium'] = new MetalItem();
    TR.METALS['Rhodium'].TestIndex = 2;
    TR.METALS['Rhodium'].MetalItem = 1;
    TR.METALS['Rhodium'].CalcFormula = 1;
    TR.METALS['Rhodium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Selenium'] = new MetalItem();
    TR.METALS['Selenium'].TestIndex = 2;
    TR.METALS['Selenium'].MetalItem = 1;
    TR.METALS['Selenium'].CalcFormula = 1;
    TR.METALS['Selenium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Silver'] = new MetalItem();
    TR.METALS['Silver'].TestIndex = 2;
    TR.METALS['Silver'].MetalItem = 1;
    TR.METALS['Silver'].CalcFormula = 1;
    TR.METALS['Silver'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Sodium'] = new MetalItem();
    TR.METALS['Sodium'].TestIndex = 2;
    TR.METALS['Sodium'].MetalItem = 1;
    TR.METALS['Sodium'].CalcFormula = 1;
    TR.METALS['Sodium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Strontium'] = new MetalItem();
    TR.METALS['Strontium'].TestIndex = 2;
    TR.METALS['Strontium'].MetalItem = 1;
    TR.METALS['Strontium'].CalcFormula = 1;
    TR.METALS['Strontium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Tellurium'] = new MetalItem();
    TR.METALS['Tellurium'].TestIndex = 2;
    TR.METALS['Tellurium'].MetalItem = 1;
    TR.METALS['Tellurium'].CalcFormula = 1;
    TR.METALS['Tellurium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Thallium'] = new MetalItem();
    TR.METALS['Thallium'].TestIndex = 2;
    TR.METALS['Thallium'].MetalItem = 1;
    TR.METALS['Thallium'].CalcFormula = 1;
    TR.METALS['Thallium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Tin'] = new MetalItem();
    TR.METALS['Tin'].TestIndex = 2;
    TR.METALS['Tin'].MetalItem = 1;
    TR.METALS['Tin'].CalcFormula = 1;
    TR.METALS['Tin'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Titanium'] = new MetalItem();
    TR.METALS['Titanium'].TestIndex = 2;
    TR.METALS['Titanium'].MetalItem = 1;
    TR.METALS['Titanium'].CalcFormula = 1;
    TR.METALS['Titanium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Uranium'] = new MetalItem();
    TR.METALS['Uranium'].TestIndex = 2;
    TR.METALS['Uranium'].MetalItem = 1;
    TR.METALS['Uranium'].CalcFormula = 1;
    TR.METALS['Uranium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Vanadium'] = new MetalItem();
    TR.METALS['Vanadium'].TestIndex = 2;
    TR.METALS['Vanadium'].MetalItem = 1;
    TR.METALS['Vanadium'].CalcFormula = 1;
    TR.METALS['Vanadium'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Zinc'] = new MetalItem();
    TR.METALS['Zinc'].TestIndex = 2;
    TR.METALS['Zinc'].MetalItem = 1;
    TR.METALS['Zinc'].CalcFormula = 1;
    TR.METALS['Zinc'].ExcelRow = 2;
    //-------------------------------------------
    TR.METALS['Tungsten'] = new MetalItem();
    TR.METALS['Tungsten'].TestIndex = 2;
    TR.METALS['Tungsten'].MetalItem = 1;
    TR.METALS['Tungsten'].CalcFormula = 1;
    TR.METALS['Tungsten'].ExcelRow = 2;
    //-------------------------------------------
    //TR.METALS['METAL'] = new MetalItem();
    //TR.METALS['METAL'].TestIndex = 2;
    //TR.METALS['METAL'].MetalItem = 1;
    //TR.METALS['METAL'].CalcFormula = 1;
    //TR.METALS['METAL'].ExcelRow = 2;

    rc = true;
    return rc;
}
IsCalcJSReady();
