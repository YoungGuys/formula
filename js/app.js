

Cx = 4070052;
index = 20;

function BT () {
	return NT / (1 - f);
}
/*
	9.1.	Расчет обычного резерва
 	ion, death = number
 	C, N, P, k = array
 	x, t, m = number
 */
function rezerv (ion, death, C, N, P, k, m, x, t) {
	var a = ( C[x + 1] - C[x + k] - ((m - 1) / 2 * m) / ( N[[x + 1] - N[x + k]]) )

	var v = N * P[ion + death] / m * (1 + y) - y * N * P[ion + death] *
		( a / N[x] );

	var Vgeneral_SOTY = (1 + y) * N * P[ion - death] / m + Vgeneral_EOTY;

	var Vgeneral_EOTY = S ( (R[x + t] - R[x + k]) * sigma + N[x + k] ) / N[x + t]
					  - (1 + y) * N * P[ion + death] * a / N[x + t];

}


/*
	9.2.	Расчет резерва бонусов
 */
function bonus_reserv (I, D, t, T, Bonus) {
	var VBonus_SOTY1 = [];
	var VBonus_EOTY1 = [];

	VBonus_SOTY1[0] = 0;
	VBonus_EOTY1[0] = 0;

	VBonus_SOTY1[t] = VBonus_EOTY1[t - 1] + I * D[t - 1];

	for (var i = 0; i < t - 1; i++) {
		VBonus_SOTY1[t] += Bonus;
	}

	VBonus_SOTY1[t] *= B * T[t] ^ Bonus;

}


/*
	9.3.	Расчет среднего резерва
 */
function vAverage () {
	return vAverage_SOTY + vAverage_EOTY + VBonus_SOTY + VBonus_EOTY
}



//9.4.	Расчет инвестиционного дохода по текущему году
function invest (i, average, Bonus) {
	return {
		ID: V[t] ^ average * i ^ Bonus,
		i: i ^ input - t
	}
}


// 9.5.	Расчет брутто тарифа для начисления бонусов
function bruttoTarif () {
	return (R[x + t] - R[x - k]) * (sigma + N[x + k]) / N[x + t] 
}

// 9.6.	Расчет бонуса по году
function bonus () {
	return I * D[t] / B * (T[t] ^ Bonus); 
}

// 9.7 Расчет страховой суммы с учетом бонусов
function sBonus_t(t, bonus, s) {
	var sBonus_t;

	for (var i = 0; i < t; i++) {
		sBonus_t += bonus[i]
	}

	sBonus_t += s;

	console.log(sBonus_t)
}

