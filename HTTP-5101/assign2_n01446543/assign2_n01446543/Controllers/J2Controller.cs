using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace assign2_n01446543.Controllers
{
    public class J2Controller : ApiController
    {
        /// <summary>
        /// determines how many ways you can roll a value of 10
        /// </summary>
        /// <param name="m">An integer number representing the number of sides for the first die</param>
        /// <param name="n">An integer number representing the number of sides for the second die</param>
        /// <example>GET ../api/J2/DiceGame/6/8 -> There are 5 total ways to get the sum 10. </example>
        /// <example>GET ../api/J2/DiceGame/3/3 -> There are 0 ways to get the sum 10.</example>
        /// <returns>A string with the total number of ways to roll 10 with the 2 dice integers </returns>
        [HttpGet]
        [Route("api/J2/DiceGame/{m}/{n}")]
        public string DiceGame(int m, int n)
        {
            
            int sum = 0;
            for (int i = 1; i <= m; i++)
            {
                for (int j = 1; j <= n; j++) {
                    if ((i + j) == 10)
                    {
                        sum++;
                    }
                }
           
            }

            string message = $"There are {sum} total ways to get the sum 10.";
            return message;
        }
    }
}
