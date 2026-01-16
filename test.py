import time

MATRIX_SIZE = 10000
SCALAR = 2

def scalar_mul_stupid_with_while(mat: list[list[int]], scalar: int):
    x, y = 0, 0
    while x < len(mat[0]):
        y = 0
        while y < len(mat):
            mat[y][x] *= scalar
            y += 1
        x += 1

def scalar_mul_stupid(mat: list[list[int]], scalar: int):
    for x in range(len(mat[0])):
        for y in range(len(mat)):
            mat[y][x] *= scalar

def scalar_mul_correct(mat: list[list[int]], scalar: int):
    for y in range(len(mat)):
        for x in range(len(mat[0])):
            mat[y][x] *= scalar

def scalar_mul_correct_4x(mat: list[list[int]], scalar: int):
    leftover_x = 0
    for y in range(len(mat)):
        for x in range(0, len(mat[0]), 4):
            mat[y][x] *= scalar

            leftover_x = x + 1
            try:
                mat[y][x + 1] *= scalar
                mat[y][x + 2] *= scalar
                mat[y][x + 3] *= scalar
            except: # out of bounds, clear leftover stuff
                for x in range(leftover_x, len(mat[0])):
                    mat[y][x] *= scalar
                break 



def log_time(matrix, function, name:str):
    start = time.time()
    function(matrix, SCALAR)
    end = time.time()

    print(f"{name}: {end - start}s")


def test():
    matrix = [[1 for _ in range(MATRIX_SIZE)] for _ in range(MATRIX_SIZE)]

    log_time(matrix, scalar_mul_stupid_with_while, "stupid with while")
    log_time(matrix, scalar_mul_stupid, "stupid")
    log_time(matrix, scalar_mul_correct, "correct loop order")
    log_time(matrix, scalar_mul_correct_4x, "correct loop order + 4 at a time")

    # result on my computer shows that (in python):
    # 1- while is almost 2x slower than using `for in range(len)` !!
    # 2- the order of for loops doesn't matter that much (correct is 1.3x~ faster than stupid order)
    # 3- doing 4 at a time is a little slower than one by one which is weird.
    # 4- python is actually slower than javascript by a suprising amount (excluding C modules of course)


if __name__ == "__main__":
    test()

