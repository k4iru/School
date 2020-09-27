using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace assign1_n01446543.Controllers
{
    public class AddTenController : ApiController
    {
        /// <summary>
        /// adds 10 to a number
        /// </summary>
        /// <param name="id">an integer to add 10 to</param>
        /// <returns>An int</returns>
        public int Get(int id)
        {
            int res = id + 10;
            return res ;
        }
    }
}
