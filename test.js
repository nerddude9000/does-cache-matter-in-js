function scalarMulStupid(mat, scalar) {
	const result = mat;

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

function scalarMulCorrect4x(mat, scalar) {
	const result = mat;

	for (let y = 0; y < mat.length; y++) {
		for (let x = 0; x < mat[0].length; x += 4) {
			result[y][x] *= scalar;

			if (x + 3 >= mat[0].length) {
				// clean leftovers incase MATRIX_SIZE % 4 != 0
				for (let leftoverX = x + 1; leftoverX < mat[0].length; leftoverX++)
					result[y][leftoverX] *= scalar;
				break;
			} else {
				result[y][x + 1] *= scalar;
				result[y][x + 2] *= scalar;
				result[y][x + 3] *= scalar;
			}
		}
	}

	return result;
}

function test() {
	const MATRIX_SIZE = 10000;
	const matrix = Array.apply(null, Array(MATRIX_SIZE)).map(_ =>
		Array.apply(null, Array(MATRIX_SIZE)).map(_ => 1)
	);

	const SCALAR = 10 // value shouldn't matter.

	// NOTE: these timing are on my machine on MATRIX_SIZE 10000 using node

	// 1x faster (baseline)
	console.time("stupid loop order");
	scalarMulStupid(matrix, SCALAR);
	console.timeEnd("stupid loop order");


	// 12x~ faster
	console.time("correct loop order");
	scalarMulCorrect(matrix, SCALAR);
	console.timeEnd("correct loop order");

	// 16.5x~ faster (20x~ without out-of-bounds check)
	console.time("correct loop order + 4 at a time");
	scalarMulCorrect4x(matrix, SCALAR);
	console.timeEnd("correct loop order + 4 at a time");
}

test();

