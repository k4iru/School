using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace assign2_n01446543.Controllers
{
    public class J4Controller : ApiController
    {
        /// <summary>
        /// Attempt at longest Palindrome for fun
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/J4/LongestPalindrome/{str}")]
        public int LongestPalindrome(string str)
        {
            int longestLength = 0;
            int startIndex = 0;
            int endIndex = 1;
            if (str.Length == 0 || str == null) return 0;
            if (str.Length == 1) return 1;

            for (int i = 0; i < str.Length; i++)
            {
                string subString = str.Substring(startIndex, endIndex);
                while (IsPalindrome(subString) == true && startIndex > 0 && endIndex < str.Length)
                {
                    if (subString.Length > longestLength)
                    {
                        longestLength = subString.Length;
                    }
                    startIndex--;
                    endIndex++;
                }
                startIndex = i;
                endIndex = i;
            }

            return longestLength;
        }

        public Boolean IsPalindrome(string str)
        {
            int left = 0;
            int right = str.Length - 1;

            while (left < right)
            {
                if (str[left] == str[right])
                {
                    left++;
                    right--;
                }
                else
                {
                    return false;
                }
            }
            return true;
        }
    }
}
