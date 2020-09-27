using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace assign1_n01446543.Controllers
{
    public class HostingCostController : ApiController
    {

        /// <summary>
        /// Calculates the cost of hosting a number of fortnights
        /// </summary>
        /// <param name="id">an integer representing the number of days hosted</param>
        /// <returns>list of strings with hosting cost details</returns>
        public List<string> Get(int id) 
        {

            // variables
            int fortnights = 0;
            int remainder;
            Decimal hst = new Decimal(.13);
            Decimal priceOfFortnight = new decimal(5.50);
            decimal subTotal;
            decimal taxes;
            decimal total;

            List<string> list = new List<string>();

            if (id < 0)
            {
                list.Add("You entered negative days!");
                return list;
            }

            remainder = id / 14;
            fortnights += remainder;
            subTotal = (fortnights * priceOfFortnight) + priceOfFortnight;

            // 2 decimal points
            taxes = Math.Round(subTotal * hst, 2);
            total = Math.Round(subTotal + taxes, 2);

            // build up the list of strings
            list.Add($"{fortnights} fortnights at ${priceOfFortnight.ToString("0.00")} = ${subTotal.ToString("0.00")} CAD");
            list.Add($"HST 13% = ${taxes} CAD");
            list.Add($"Total = ${total} CAD");
            
            return list;
        }
    }
}
