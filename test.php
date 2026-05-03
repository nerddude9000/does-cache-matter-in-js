<?php

ini_set('memory_limit', '4G');

function scalarMulStupid($mat, float $scalar)
{
	$result = $mat;

	for ($x = 0; $x < count($mat[0]); $x++) {
		for ($y = 0; $y < count($mat); $y++) {
			$result[$y][$x] *= $scalar;
		}
	}

	return $result;
}

function scalarMulCorrect($mat, float $scalar)
{
	$result = $mat;

	for ($y = 0; $y < count($mat[0]); $y++) {
		for ($x = 0; $x < count($mat); $x++) {
			$result[$y][$x] *= $scalar;
		}
	}

	return $result;
}

function scalarMulCorrect4x($mat, float $scalar)
{
	$result = $mat;

	for ($y = 0; $y < count($mat[0]); $y++) {
		for ($x = 0; $x < count($mat); $x += 4) {
			$result[$y][$x] *= $scalar;

			if ($x + 3 >= count($mat[0])) {
				// clean leftovers incase MATRIX_SIZE % 4 != 0
				for ($leftoverX = $x + 1; $leftoverX < count($mat[0]); $leftoverX++)
					$result[$y][$leftoverX] *= $scalar;
				break;
			} else {
				$result[$y][$x + 1] *= $scalar;
				$result[$y][$x + 2] *= $scalar;
				$result[$y][$x + 3] *= $scalar;
			}
		}
	}

	return $result;
}

// This unsafe version doesn't do the leftover check, so MATRIX_SIZE % 4 = 0 must be true
function scalarMulCorrect4xUnsafe($mat, float $scalar)
{
	$result = $mat;

	for ($y = 0; $y < count($mat[0]); $y++) {
		for ($x = 0; $x < count($mat); $x += 4) {
			$result[$y][$x] *= $scalar;
			$result[$y][$x + 1] *= $scalar;
			$result[$y][$x + 2] *= $scalar;
			$result[$y][$x + 3] *= $scalar;
		}
	}

	return $result;
}


function exec_time($fn, $mat, float $scalar): float
{
	$start = microtime(true);
	$fn($mat, $scalar);
	$end = microtime(true);

	return $end - $start;
}

function test()
{
	define("MATRIX_SIZE", 6_000);

	// value shouldn't matter.
	define("SCALAR", 10);

	// initialize a MATRIX_SIZE * MATRIX_SIZE array with 1s.
	// we use SplFixedArray because it's an actual array an not a hashmap like the default one.
	$matrix = new SplFixedArray(MATRIX_SIZE);
	for ($i = 0; $i < MATRIX_SIZE; $i++) {
		$row = new SplFixedArray(MATRIX_SIZE);
		for ($j = 0; $j < MATRIX_SIZE; $j++) {
			$row[$j] = 1;
		}
		$matrix[$i] = $row;
	}

	// === Results
	// === In my machine, with MATRIX_SIZE = 6000 (php is very slow)
	$stupidTime = exec_time("scalarMulStupid", $matrix, SCALAR);  // 1x baseline
	echo "Stupid loop order:", $stupidTime, "s\n";
	$correctTime = exec_time("scalarMulCorrect", $matrix, SCALAR); // ~3.11x faster than baseline
	echo "Correct loop order:", $correctTime, "s\n";
	$correctTime4x = exec_time("scalarMulCorrect4x", $matrix, SCALAR); // ~2.77x faster than baseline
	echo "Correct loop order + 4 at a time:", $correctTime4x, "s\n";
	$correctTime4xUnsafe = exec_time("scalarMulCorrect4xUnsafe", $matrix, SCALAR); // ~3.3x faster than baseline (fastest)
	echo "Correct loop order + 4 at a time WITHOUT leftover check (unsafe):", $correctTime4xUnsafe, "s\n";

	// === Conclusion: C knowledge wins once again.
}

test();
