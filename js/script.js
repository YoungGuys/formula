
console.time("f");
var app = angular.module('app',[]);

app.controller('formCtrl', ['$scope', function ($scope) {
    $scope.summ = function () {
        var res = model($scope.x, $scope.k, $scope.m, $scope.s);
        $scope.sum = res[0];
        $scope.BPdeath = res[1];
        $scope.BPlongevity = res[2];
        $scope.BTlongevity = res[3];
        $scope.BTdeath = res[4];
        $scope.res = res[5];
        var arr = res[5];
        var txt = "";
        arr.forEach(function(item, i, arr) {
            txt += "<li>"+i+" год - " + Math.round(item) +"UAH</li>";
        });
        document.getElementById("el").innerHTML = txt;
        //document('#el').html(txt);
    }
}]);

var model = function(x, k,m, summ) {
    var i = 0.04; //?????????????? ?????? ??????????????? ?????? ???????????? ?? ?????? ?????????? ?????? ???????????
    var gender = "man"; // ??? man || girl
    var OMEGA = 100;  //???????????? ??????? ? ??????? ?????????? (100)
   /* var x = 30;  // ??????? ?? ?????? ?????????? ????????
    var k = 20;  // ?????????? ??? ?????? ?????????? ???????
    var m = 2;  // ?????????? ????? ? ???
*/
    var n = 20;  // ???? ???????? ???????? ???????????
    var delta = i / (Math.log(1 + i));  // ?? ???
    //var summ = 80000;
    var gamma = 0.05;
    var iInput = 0.1;


// ?????????? ???????? ?? ???????? index
    var l = function (index) {
        var lTable = {
            man: [100000, 98515, 98327, 98224, 98153, 98094, 98043, 97997, 97947, 97900, 97858, 97814, 97771, 97731, 97686, 97627, 97555, 97459, 97337, 97184, 97015, 96797, 96562, 96307, 96043, 95765, 95482, 95172, 94864, 94547, 94184, 93768, 93371, 92928, 92464, 91956, 91407, 90847, 90265, 89632, 88953, 88183, 87422, 86617, 85729, 84798, 83793, 82740, 81625, 80455, 79159, 77830, 76482, 75004, 73536, 71931, 70238, 68524, 66722, 64880, 62890, 60807, 58752, 56608, 54394, 52159, 49947, 47682, 45305, 42829, 40322, 37861, 35366, 32911, 30520, 28161, 25844, 23605, 21415, 19330, 17218, 15092, 13258, 11561, 9858, 8257, 6853, 5616, 4524, 3618, 2838, 2119, 1534, 1073, 722, 465, 285, 165, 90, 46, 22, 9],
            girl: [100000, 98934, 98762, 98690, 98638, 98588, 98549, 98518, 98488, 98460, 98437, 98411, 98386, 98360, 98332, 98300, 98260, 98212, 98162, 98099, 98038, 97979, 97911, 97843, 97770, 97694, 97607, 97523, 97426, 97332, 97221, 97108, 96994, 96868, 96741, 96605, 96458, 96307, 96139, 95955, 95766, 95541, 95316, 95059, 94787, 94489, 94165, 93816, 93431, 93003, 92528, 92004, 91469, 90882, 90296, 89636, 88919, 88149, 87318, 86425, 85448, 84409, 83291, 82061, 80700, 79229, 77733, 76131, 74366, 72456, 70429, 68251, 65862, 63363, 60707, 57784, 54698, 51550, 48186, 44867, 41140, 37144, 33645, 30137, 26447, 22835, 19441, 16363, 13472, 10581, 8389, 6640, 5169, 3955, 2972, 2192, 1585, 1123, 779, 528, 350, 226]
        };

        return lTable[gender][index];
    };


// ?? ???
    var v = function () {
        var result = 1 / (1 + i);
        //console.log("v (" + ' ) = ' + result);
        return result;
    };

// ????????????? ?????
    var D = function (index) {
        var result = (l(index) * (Math.pow(v(), index)));
        //console.log("D (" + index + " = " + result);
        return result;
    };

// ????????????? ?????
    var N = function (index) {
        var result = 0;
        for (var i = index; i <= OMEGA; i++) {
            result += D(i);
        }
        //console.log("N (" + index + ") = " + result);
        return result;
    };


    /*
     ??????????? ????? ??????? ?? ?????? ???????? ?????????
     ?????? ???? ?????? ??????????????
     */

    var NTdeath_risk = (D(x + k) / ( N(x) - N(x + k) - ((m - 1) / (2 * m)) * (D(x) - D(x + k))));

// ????????????? ?????
    var C = function (index) {
        var result = d(index) / (Math.pow((1 + i), (index + 1)));
        //console.log("C = " + result);
        return result;
    };

// ?????????? ??????? ? ???????? index
    var d = function (index) {
        var result = l(index) - l(index + 1);

        return result;
    };
// ????????????? ?????
    var M = function (index) {
        var result = 0;
        for (var i = index; i <= OMEGA; i++) {
            result += C(i);
        }
        //console.log(" C (" + 20 + " ) = " + C(20));
        return result;
    };


    /*
     ??????????? ????? ??????? ?? ?????? ???????? ?????????
     ?????? ???? ?????? ??????????????
     */

    var NTlongevity_risk = ((M(x) - M(x + n)) * (delta)) / (( N(x) - N(x + k) - ((m - 1) / (2 * m)) * (D(x) - D(x + k))));
    console.log("NTdeath_risk = " + NTdeath_risk);

    console.log("NTlongevity_risk = " + NTlongevity_risk);


    var R = function (index) {
        var result = 0;
        for (var i = index; i <= OMEGA; i++) {
            result += M(i);
        }
        //console.log("R (" + index + ")= " + result);
        return result;
    };

    var NP = function (NT) {
        var result = NT * summ;
        //console.log(result);
        return result;
    };


    var BT = function (NT) {
        var result = NT * n;

        return result;
    }

    var BP = summ * BT(NTlongevity_risk) / m;

    var S = BP / BT(NTlongevity_risk);


//var a = ( C(x + 1) - C(x + k) - ((m - 1) / 2 * m) / ( N(x + 1) - N(x + k)) );

    /*var VSOTY1 = (NP(NTlongevity_risk + NTdeath_risk) / m) * (1 + gamma) - gamma * NP(NTlongevity_risk + NTdeath_risk) *
     ( ( C(x + 1) - C(x + k)  - ((m - 1) /(2 * m)) * ( N(x + 1) - N(x + k)) ) / N(x));*/


    var VSOTY1 = (NP(NTlongevity_risk + NTdeath_risk) / m) * (1 + gamma) - gamma * NP(NTlongevity_risk + NTdeath_risk) *
        ( ( N(x + 1) - N(x + k) - ((m - 1) / (2 * m)) * ( D(x + 1) - D(x + k)) ) / D(x));


    var VSOTY = function (t) {
        var result = ((1 + gamma) * (NP(NTlongevity_risk) + NP(NTdeath_risk)) / m) + VEOTY(t - 1);
        //console.log("VSOTY ( " + t + " ) = " + result);
        return result;
    };

    /*
     var VEOTY = function (t) {
     var result = (summ*((R(x+t) - R(x+k))*delta + N(x+k))/N(x+t)) - (1+gamma)*(NP(NTlongevity_risk) + NP(NTdeath_risk)) *
     ( ( C(x + t) - C(x + k) - ((m - 1) / (2 * m)) * ( N(x + t) - N(x + k)) ) / N(x+t));
     console.log("VEOTY ( " + t  + " ) = " + result);
     return result;
     };*/


    var VEOTY = function (t) {
        var result = (summ * ((M(x + t) - M(x + k)) * delta + D(x + k)) / D(x + t)) - (1 + gamma) * (NP(NTlongevity_risk) + NP(NTdeath_risk)) *
            ( ( N(x + t) - N(x + k) - ((m - 1) / (2 * m)) * ( D(x + t) - D(x + k)) ) / D(x + t));
        //console.log("VEOTY ( " + t  + " ) = " + result);
        /*console.log((1+gamma)*(NP(NTlongevity_risk) + NP(NTdeath_risk)) *
         ( ( N(x + t) - N(x + k) - ((m - 1) / (2 * m)) * ( D(x + t) - D(x + k)) ) / D(x+t)));
         console.log( ((m - 1) / (2 * m)) * ( D(x + t) - D(x + k))  / D(x+t));*/
        //console.log(((M(x+t) - M(x+k))*delta + D(x+k))/D(x+t));
        return result;
    };


// 9.2
    var VBONUSSOTY = [0];
    var VBONUSEOTY = [0];
    var SUMMBONUS = 0;

    var VBONUSSOTY = function (t) {
        var result = VBONUSEOTY[t - 1] + ID(t - 1);
        var result = fVBONUSEOTY(t - 1) + ID(t - 1);
        //console.log( " V Bonus SOTY ( " + t + " ) = " + result);
        return result;
    };
    var fVBONUSEOTY = function (t) {
        var result = SUMMBONUS;
        /*for (var i = 1; i <= t-1; i++) {
         result += BONUS(i);
         }*/
        result *= BTBONUS(t);
        SUMMBONUS += result;
        //console.log("VBONUSEOTY ( " + t + ") =" + result);
        return result;
    };

    var VAVE = function (t) {
        var result = ((VSOTY(t) + VEOTY(t) + VBONUSSOTY(t) + VBONUSEOTY(t))) / (2 * (1 + i));
        //console.log("V average ( " + t + " ) = " + result);
        return result;
    };

    var iBonus = iInput - i;

    var ID = function (t) {
        var result = VAVE(t) * iBonus * 0.9;
        //console.log("ID ( "+t+") = " + result);
        return result;
    };

    var BTBONUS = function (t) {
        var result = (((M(x + t) - M(x + k)) * delta) + D(x + k)) / D(x + t);
        //console.log("BTBONUS ( "+t+")= " + result);
        return result;
    };

    var BONUS = function (t) {
        var result = ID(t) / BTBONUS(t);
        //console.log("BONUS (" + t + ") = " + result);
        return result;
    };

    var SBONUS = function (t) {
        var result = 0;
        for (var i = 1; i <= t; i++) {
            result += BONUS(i);
        }
        //console.log("SBONUS (" + t + ")= " + result);
        return result;
    };


    function rozr() {
        var Vsoty = [],
            Veoty = [],
            ID = [],
            iBonus = iInput - i,
            Bon = summ,
            Vave = [],
            SSB = [],
            VBeoty = [], VBsoty = [], BTB = [], Bonus = [];
        Vsoty[0] = 0;
        Veoty[0] = 0;
        ID[0] = 0;
        for (var j = 1; j < 21; j++) {
            var su = arr_summ(Bonus);
            BTB[j] = BTBONUS(j);
            Vsoty[j] = Veoty[j - 1] + ID[j - 1];
            Veoty[j] = su * BTB[j];
            if (j == 1) {
                vs = VSOTY1;
                ve = VEOTY(j);
            }
            else {
                vs = VSOTY(j);
                ve = VEOTY(j);
            }
            /*
             console.log(vs);
             console.log(ve);
             console.log((vs + ve + Veoty[j] + Vsoty[j])*(1-i)/2);
             console.log(Bonus);*/
            Vave[j] = (vs + ve + Veoty[j] + Vsoty[j]) * (1 - i) / 2;
            ID[j] = Vave[j] * iBonus * 0.9;
            Bonus[j] = ID[j] / BTB[j];
            Bon = arr_summ(Bonus) + summ;
            SSB[j] = Bon;
            //ID[i] =
        }

        function arr_summ(arr) {
            var s = 0;
            for (var i = 1; i < arr.length; i++) {
                s += arr[i];
            }
            return s;
        }

        return SSB;

        /*console.log(" V start = ");
         console.log(Vsoty);
         console.log(" V end = ");
         console.log(Veoty);
         console.log(" V ave = ");
         console.log(Vave);
         console.log(" ID = ");
         console.log(ID);
         console.log(" BTB = ");
         console.log(BTB);
         console.log(" Bonus = ");
         console.log(Bonus);
         console.log(" summ Bonus = ");
         console.log(arr_summ(Bonus));
         console.log(" Summ with Bonus = ");
         console.log(summ + arr_summ(Bonus));*/
    }

    var f = 0.18;
    var BTdeath = NTdeath_risk/(1 - f);
    var BTlongevity = NTlongevity_risk/(1 - f);
    var BPdeath = summ*(BTdeath + BTlongevity);
    var BPlongevity = summ*BTlongevity/m;
    var result = [summ, BPdeath, BPlongevity, BTdeath, BTlongevity, rozr()];
    //console.log(rozr());
    return result;

}
console.timeEnd("f");