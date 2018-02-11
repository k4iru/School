# Python 3
# A1, Question 7.
#
# Author: Kyle Cheung

import random
data = []
size = 1000003
load = [.25, .5, 2/3.0, .75, .8, .9, .95]


class _MapEntry:
    """container class for key value pairs."""
    def __init__(self, key, value):
        self.key = key
        self.value = value


class HashTable_LinearProbing:
    """Hash table, linear probing implementation"""
    def __init__(self):
        self.array = [None] * size
        self.probes_put = 0
        self.probes_get = 0

    def hashFunc(self, key):
        return abs(hash(key)) % size

    def step(self, key):
        return (key + 1) % size

    def get(self, key):
        i = self.hashFunc(key)
        self.probes_get += 1
        while self.array[i] is not None:
            if self.array[i].key == key:
                return self.array[i]
            self.probes_get += 1
            i = self.step(i)
        return None

    def put(self, key, value):
        i = self.hashFunc(key)
        self.probes_put += 1
        temp = _MapEntry(key, value)
        while self.array[i] is not None:
            if self.array[i].key == key or self.array[i].key == "REMOVED":
                self.array[i] = temp
            self.probes_put += 1
            i = self.step(i)
        self.array[i] = temp

    def remove(self, key):
        i = self.hashFunc(key)
        while self.array[i] is not None:
            if self.array[i].key == key:
                temp = self.array[i]
                self.array[i] = _MapEntry("REMOVED", None)
                return temp
            i = self.step(i)
        return None

    def set_zero(self):
        self.probes_get = 0
        self.probes_put = 0


class HashTable_DoubleHashing:
    """Hash table, double hashing implementation"""
    def __init__(self):
        self.array = [None] * size
        self.probes_get = 0
        self.probes_put = 0

    def hashFunc(self, key):
        return abs(hash(key)) % size

    def doubleHash(self, key):
        return 1 + abs(hash(key)) % (size - 2)

    def get(self, key):
        i = self.hashFunc(key)
        self.probes_get += 1
        while self.array[i] is not None:
            if self.array[i].key == key:
                return self.array[i]
            self.probes_get += 1
            j = 1
            i = (i + (j * (1 + abs(hash(key))))) % size
            j += 1
        return None

    def put(self, key, value):
        self.probes_put += 1
        i = self.hashFunc(key)
        temp = _MapEntry(key, value)
        while self.array[i] is not None:
            if self.array[i].key == key or self.array[i].key == "REMOVED":
                self.array[i] = temp
            self.probes_put += 1
            j = 1
            i = (i + (j * (1 + abs(hash(key))))) % size
            j += 1
        self.array[i] = temp

    def remove(self, key):
        i = self.hashFunc(key)
        while self.array[i] is not None:
            if self.array[i].key == key:
                temp = self.array[i]
                self.array[i] = _MapEntry("REMOVED", None)
                return temp
            i = self.doubleHash(key)
        return None

    def set_zero(self):
        self.probes_get = 0
        self.probes_put = 0


# build the data array
for i in range(0, size):
    data.append(random.randint(1, 1000000000))

# Collision test
# Insert Data
lin = HashTable_LinearProbing()
dou = HashTable_DoubleHashing()

# keep count outside to keep index number when changing loads
count = 0

for i in range(len(load)):
    # load the data in the HashTables
    for j in range(count, int(load[i] * size)):
        lin.put(data[count], 0)
        dou.put(data[count], 0)
        count += 1

    # Reset Probes
    lin.set_zero()
    dou.set_zero()

    # Successful Searches
    success = random.sample(data[0:int(load[i] * size)], int(size * 0.01))
    for k in range(len(success)):
        lin.get(success[k])
        dou.get(success[k])
    # Unsuccessful Searches
    for k in range(len(success)):
        lin.put(success[k], 0)
        dou.put(success[k], 0)

    # Output statements
    print("load factor is =  " + str(load[i]))
    print("  successful search: ")
    print("linear probing:   " +
          str(lin.probes_get / (size * 0.01)))
    print("double hashing:   " +
          str(dou.probes_get / (size * 0.01)))

    print("  unsuccessful search:")
    print("linear probing:   " +
          str(lin.probes_put / (size * 0.01)))
    print("double hashing:   " +
          str(dou.probes_put / (size * 0.01)))
    print("\n")
