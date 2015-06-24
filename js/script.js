

var i = 0.04; //�������������� ������ ��������������� ������ ������������ �� ������ ���������� ������ �����������
var gender = "man"; // ��� man || girl
var OMEGA = 100;  //������������ ������� � ������� ���������� (100)
var x = 30;  // ������� �� ������ ���������� ��������
var k = 20;  // ���������� ��� ������ ���������� �������
var m = 2;  // ���������� ����� � ���
var n = 20;  // ���� �������� �������� �����������
var delta = Math.log(1 + i);  // �� ���




// ���������� �������� �� �������� index
var l = function (index) {
    var lTable = {
        man: [100000, 98515, 98327, 98224, 98153, 98094, 98043, 97997, 97947, 97900, 97858, 97814, 97771, 97731, 97686, 97627, 97555, 97459, 97337, 97184, 97015, 96797, 96562, 96307, 96043, 95765, 95482, 95172, 94864, 94547, 94184, 93768, 93371, 92928, 92464, 91956, 91407, 90847, 90265, 89632, 88953, 88183, 87422, 86617, 85729, 84798, 83793, 82740, 81625, 80455, 79159, 77830, 76482, 75004, 73536, 71931, 70238, 68524, 66722, 64880, 62890, 60807, 58752, 56608, 54394, 52159, 49947, 47682, 45305, 42829, 40322, 37861, 35366, 32911, 30520, 28161, 25844, 23605, 21415, 19330, 17218, 15092, 13258, 11561, 9858, 8257, 6853, 5616, 4524, 3618, 2838, 2119, 1534, 1073, 722, 465, 285, 165, 90, 46, 22, 9],
        girl: [100000, 98934, 98762, 98690, 98638, 98588, 98549, 98518, 98488, 98460, 98437, 98411, 98386, 98360, 98332, 98300, 98260, 98212, 98162, 98099, 98038, 97979, 97911, 97843, 97770, 97694, 97607, 97523, 97426, 97332, 97221, 97108, 96994, 96868, 96741, 96605, 96458, 96307, 96139, 95955, 95766, 95541, 95316, 95059, 94787, 94489, 94165, 93816, 93431, 93003, 92528, 92004, 91469, 90882, 90296, 89636, 88919, 88149, 87318, 86425, 85448, 84409, 83291, 82061, 80700, 79229, 77733, 76131, 74366, 72456, 70429, 68251, 65862, 63363, 60707, 57784, 54698, 51550, 48186, 44867, 41140, 37144, 33645, 30137, 26447, 22835, 19441, 16363, 13472, 10581, 8389, 6640, 5169, 3955, 2972, 2192, 1585, 1123, 779, 528, 350, 226]
    };

    return lTable[gender][index];
};


// �� ���
var v = function () {
    var result = 1 / (1 + i);
    //console.log("v (" + ' ) = ' + result);
    return result;
};

// ������������� �����
var D = function (index) {
    var result = (l(index) * (v() ^ index));
    //console.log("D (" + index + " = " + result);
    return result;
};

// ������������� �����
var N = function (index) {
    var result = 0;
    for (i = index; i < OMEGA; i++) {
        result += D(i);
    }
    //console.log("N (" + index + ") = " + result);
    return result;
};


/*
    ����������� ����� ������� �� ������ �������� ���������
    ������ ���� ������ ��������������
 */

var NTlongevity_risk = (D(x + k) / ( N(x) - N(x+k) - ((m-1)/(2*m))*(D(x) - D(x+k))));
console.log("NTlongevity_risk = " + NTlongevity_risk);


// ������������� �����
var C = function (index) {
    var result = d(index) * (v()^(index+1));
    return result;
};

// ���������� ������� � �������� index
var d = function(index) {
    var result = l(index) - l(index + 1);

    return result;
};
console.log(" d ( " + 20 + " ) = " + d(20));
// ������������� �����
var M = function (index) {
    var result = 0;
    for (i = index; i < OMEGA; i++) {
        result += C(i);
    }
    console.log(" m (" + index + " ) = " + result);
    return result;
};






/*
 ����������� ����� ������� �� ������ �������� ���������
 ������ ���� ������ ��������������
 */

var NTdeath_risk = ((M(x) - M(x+n))*(i/delta))/(( N(x) - N(x+k) - ((m-1)/(2*m))*(D(x) - D(x+k))));
console.log("NTdeath_risk = " + NTdeath_risk);