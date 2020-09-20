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
        // tried returning a string and List<string> but couldn't get them to linebreak. HttpResponseMessage was the only thing 
        // that worked though it outputs the xml namespace.
        public HttpResponseMessage Get(int id) 
        {
            int fortnights = 0;
            double hst = 0.13;
            double priceOfFortnight = 5.50;
            int remainder;
            double subTotal;
            double taxes;
            double total;

            List<string> list = new List<string>();

            // dividing ints truncates values
            remainder = id / 14;
            fortnights += remainder;
            subTotal = (fortnights * priceOfFortnight) + priceOfFortnight;

            taxes = Math.Round(subTotal * hst, 2);
            total = Math.Round(subTotal + taxes, 2);


            // build up the list of strings
            list.Add($"\n{fortnights} fortnights at ${priceOfFortnight.ToString("0.00")} = ${subTotal.ToString("0.00")} CAD");
            list.Add($"HST 13% = ${taxes} CAD");
            list.Add($"Total = ${total} CAD");

            // join strings and add a line break between each one
            var result = String.Join("\n", list.ToArray());

            // creates a plain text http response message so that each string is on a new line
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, result);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");
            
            return response;
        }
    }
}
