import time

SIZE = 10000
SCALAR = 2

# TODO: use while for all of them to be fair, and maybe also add one function using enumerate to see how slow it is for this use case.
def scalar_mul_stupid(mat: list[list[int]], scalar: int):
    for x, _ in enumerate(mat[0]):
        for y, _ in enumerate(mat):
            mat[y][x] *= scalar

def scalar_mul_correct(mat: list[list[int]], scalar: int):
    for y, _ in enumerate(mat):
        for x, _ in enumerate(mat[0]):
            mat[y][x] *= scalar

def scalar_mul_correct_4x(mat: list[list[int]], scalar: int):
    # TODO: implement correctly
    x = 0
    for y, _ in enumerate(mat):
        while x < len(mat[0]):
            try:
                mat[y][x] *= scalar
                mat[y][x + 1] *= scalar
                mat[y][x + 2] *= scalar
                mat[y][x + 3] *= scalar
                x += 4 
            except:
                print("Crashed, probably list size wasn't a multiple of 4")

def clean_matrix(size: int): 
    return [[1 for _ in range(size)] for _ in range(size)]

def log_time(function, name:str):
    matrix = clean_matrix(SIZE)

    start = time.time()
    function(matrix, SCALAR)
    end = time.time()

    print(f"{name}: {end - start}s")


def test():
    log_time(scalar_mul_stupid, "stupid")
    log_time(scalar_mul_correct, "correct loop order")
    log_time(scalar_mul_correct_4x, "correct loop order + 4 at a time")

if __name__ == "__main__":
    test()

