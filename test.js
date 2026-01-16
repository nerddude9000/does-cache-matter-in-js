function scalarMulFalse(mat, scalar) {
	const result = mat;

	// This order causes significantly more cache misses in C, let's see if it's the same in JS.
	for (let x = 0; x < mat[0].length; x++) {
		for (let y = 0; y < mat.length; y++) {
			result[y][x] *= scalar;
		}
	}

	return result;
}

function scalarMulCorrect(mat, scalar) {
	const result = mat;

	for (let y = 0; y < mat.length; y++) {
		for (let x = 0; x < mat[0].length; x++) {
			result[y][x] *= scalar;
		}
	}

	return result;
}

function scalarMulEvenFaster(mat, scalar) {
	const result = mat;

	for (let y = 0; y < mat.length; y++) {
		for (let x = 0; x < mat[0].length; x += 4) {
			result[y][x] *= scalar;
			result[y][x + 1] *= scalar;
			result[y][x + 2] *= scalar;
			result[y][x + 3] *= scalar;
		}
	}

	return result;
}

function test() {
	const MATRIX_SIZE = 10000;
	const matrix = Array.apply(null, Array(MATRIX_SIZE)).map(_ =>
		Array.apply(null, Array(MATRIX_SIZE)).map(_ => 1)
	);

	const SCALAR = 10. // it's value shouldn't matter.

	// NOTE: these timing are on my machine

	// 1x faster (baseline)
	console.time("stupid loop order");
	scalarMulFalse(matrix, SCALAR);
	console.timeEnd("stupid loop order");


	// 12x~ faster
	console.time("correct loop order");
	scalarMulCorrect(matrix, SCALAR);
	console.timeEnd("correct loop order");

	// 20x~ faster
	console.time("correct loop order + 4 at a time");
	scalarMulEvenFaster(matrix, SCALAR);
	console.timeEnd("correct loop order + 4 at a time");
}

test();

