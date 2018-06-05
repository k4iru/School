import time
import sys
import itertools
import unittest
import logging


def brute_force(text, pattern):
    count = 0
    for i in range(0, len(text)-len(pattern)+1):
        if pattern == text[i:i+len(pattern)]:
            count += 1
    return count


def boyer_moore(text, pattern):
    ####################################
    # calculate the last occurence of each character
    ####################################
    dict = {}
    # iterate through the pattern backwards and look for the first occurence
    for i in range(len(pattern)-1, -1, -1):
        if pattern[i:i+1] not in dict:
            dict[pattern[i:i+1]] = i
    count = 0
    i = len(pattern)-1
    j = len(pattern)-1
    while i <= len(text)-1:
        if text[i:i+1] == pattern[j:j+1]:
            if j == 0:
                count += 1
                j = len(pattern)-1
                i += len(pattern)
            else:
                i -= 1
                j -= 1
        else:
            if text[i:i+1] not in dict:
                length = -1
            else:
                length = dict[text[i:i+1]]
            i = i + len(pattern) - min(j, 1+length)
            j = len(pattern) - 1
    return count


def binSAsearch(text, pattern, sa):
    length = 0
    h = len(sa)-1
    s = 0
    e = 0
    while length < h:
        m = length+(h-length)/2
        if pattern > text[int(sa[m]):int(sa[m])+len(pattern)]:
            length = m+1
        else:
            h = m
    if pattern == text[int(sa[length]):int(sa[length])+len(pattern)]:
        s = length
    else:
        s = -1

    h = len(sa)-1
    while length < h:
        m = (length+(h-length)/2)+1
        if pattern < text[int(sa[m]):int(sa[m])+len(pattern)]:
            h = m-1
        else:
            length = m
        if pattern == text[int(sa[h]):int(sa[h])+len(pattern)]:
            e = h
        else:
            e = -1
    return e-s+1


def run():
    if len(sys.argv) != 4:
        print("Usage: python patternMatching.py text.txt text.sa text.pat")
        quit()
    # text
    text = open(sys.argv[1]).read()
    # iterate through all patterns
    with open(sys.argv[3], 'r+') as f:
        # line == one pattern
        for line in f:
            line = line.rstrip()
            print("text: \""+sys.argv[1]+"\"")
            print("pattern: \""+line+"\"")
        # brute force search
            bf_time_s = time.time()
            bf_res = brute_force(text, line)
            bf_time_e = time.time()
            bf_time = bf_time_e-bf_time_s

        # boyer-moore
            bm_time_s = time.time()
            bm_res = boyer_moore(text, line)
            bm_time_e = time.time()
            bm_time = bm_time_e-bm_time_s
        # suffix array
        # process the sa file into a list
            sa_time_s = time.time()
            sa_res = binSAsearch(text, line, sa)
            sa_time_e = time.time()
            sa_time = sa_time_e-sa_time_s
            print("Occurrences: " + str(bf_res))
            print("Suffix Array: " + str(sa_time) + "s")
            print("Brute Force: "+str(bf_time)+"s")
            print("Boyer-Moore: "+str(bm_time)+"s")


run()
