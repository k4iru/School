# Assignment 1 question 7
# Written by Kyle Cheung
# Feburary 6, 2018

# import random
size = 1000003
load = [.25, .5, 2/3.0, .75, .8, .9, .95]


class _MapEntry:
    def __init__(self, key, val):
        self.key = key
        self.val = val


class HashTable_LinearProbing:
    def __init__(self, probes=0):
        self.array = [] * size
        self.probes = probes

    def hashFunc(self, key):
        return (abs(hash(key)) % size) - 1

    def insert(self, key, value):
        ind = self.hashFunc(key)
        temp = _MapEntry(key, value)

        for x in range(size):
            if self.array[ind] is None or self.array[ind] == "REMOVED":
                self.array[ind] = temp
                break
            ind = ind + 1 % size

    def search(self, key):
        ind = self.hashFunc(key)
        for x in range(size):
            if self.array[ind].key == key:
                return ind
            ind = (ind + 1) % size
            self.probes += 1
        return "Not in Table"

    def remove(self, key):
        ind = self.search(key)
        if ind is str:
            return "Not Found"
        else:
            self.array[ind] = "REMOVED"


class HashTable_DoubleHashing:
    def __init__(self, probes=0):
        self.array = [] * size
        self.probes = probes

    def hashFunc(key):
        return (abs(hash(key)) % size)

    def reHash(oldhash):
        return (1 + abs(hash(oldhash)) % (size - 2))

    def insert(self, key, value):
        ind = self.hashFunc(key)
        temp = _MapEntry(key, value)
        for x in range(size):
            if self.array[ind] is None or self.array[ind] == "REMOVED":
                self.array[ind] = temp
                break
            ind = self.reHash(ind)

    def search(self, key):
        ind = self.hashFunc(key)
        for x in range(size):
            if self.array[ind].key == key:
                return ind
            ind = self.reHash(ind)
            self.probes += 1
        return "Not in Table"

    def remove(self, key):
        ind = self.search(key)
        if ind is str:
            return "Not Found"
        else:
            self.array[ind] = "REMOVED"


arr = [6]
arr[0] = _MapEntry(4, 3)
print(arr[0].key)
