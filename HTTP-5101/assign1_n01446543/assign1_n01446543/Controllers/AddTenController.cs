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
        /// <param name="id">int id</param>
        /// <returns>int</returns>
        public int Get(int id)
        {
            return id + 10;
        }
    }
}
