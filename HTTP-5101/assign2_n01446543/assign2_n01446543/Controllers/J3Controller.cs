﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace assign2_n01446543.Controllers
{
    public class J3Controller : ApiController
    {
        /* CCC 2019 Problem J3: Cold Compress
         * modified to only take 1 input
         */

        /// <summary>
        /// takes an input string and compresses it using run-length encoding.
        /// </summary>
        /// <param name="inputString">A string representing the input</param>
        /// <example>Get ../api/J3/Compression/(AABBC) -> 1 ( 2 A 2 B 1 C 1 ) </example>
        /// <returns>A string output of the input string compressed using run-length encoding </returns>
        [HttpGet]
        [Route("api/J3/Compression/{inputString}")]
        public string Compression(string inputString)
        {
            string message = "";
            string emptyString = "Empty String";
            int sum = 1;
            char prev = inputString[0];

            if (inputString == "") return emptyString;
            if (inputString.Length == 1)
            {
                message = $"1 {inputString[0]}";
            }

            for (int i = 1; i < inputString.Length; i++)
            {
                if (prev == inputString[i]) sum++;
                else
                {
                    message += $"{sum} {prev} ";
                    prev = inputString[i];
                    sum = 1;
                }
            }

            message += $"{sum} {prev} ";

            return message;
        }

    }
}
