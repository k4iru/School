using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace assign2_n01446543.Controllers
{
    public class J1Controller : ApiController
    {

        /// <summary>
        /// compute the total calories of the selected meal
        /// </summary>
        /// <param name="burger">An integer representing choice of burger</param>
        /// <param name="drink">An integer representing choice of drink</param>
        /// <param name="side">An integer representing choice of side</param>
        /// <param name="dessert">An integer representing choice of dessert</param>
        /// <example>GET ../api/J1/Menu/4/4/4/4 -> Your total calorie count is 0</example>
        /// <example>GET ../api/J1/Menu/1/2/3/4 -> Your total calorie count is 691</example>
        /// <returns>A string of the total calories for the specified order</returns>
        [HttpGet]
        [Route("api/J1/Menu/{burger}/{drink}/{side}/{dessert}")]
        public string Menu(int burger, int drink, int side, int dessert)
        {
            int calories = 0;
            string errorMessage = "Invalid input!";
            string message = "Your total calorie count is ";

            // if any of the inputs are not between 1-4 then default to the errorMessage
            switch (burger)
            {
                case 1:
                    calories += 461;
                    break;
                case 2:
                    calories += 431;
                    break;
                case 3:
                    calories += 420;
                    break;
                case 4:
                    calories += 0;
                    break;
                default:
                    return errorMessage;
            }

            switch (drink)
            {
                case 1:
                    calories += 130;
                    break;
                case 2:
                    calories += 160;
                    break;
                case 3:
                    calories += 118;
                    break;
                case 4:
                    calories += 0;
                    break;
                default:
                    return errorMessage;
            }

            switch (side)
            {
                case 1:
                    calories += 100;
                    break;
                case 2:
                    calories += 57;
                    break;
                case 3:
                    calories += 70;
                    break;
                case 4:
                    calories += 0;
                    break;
                default:
                    return errorMessage;
            }

            switch (dessert)
            {
                case 1:
                    calories += 167;
                    break;
                case 2:
                    calories += 266;
                    break;
                case 3:
                    calories += 75;
                    break;
                case 4:
                    calories += 0;
                    break;
                default:
                    return errorMessage;
            }

            return message + calories;
        }
    }
}
