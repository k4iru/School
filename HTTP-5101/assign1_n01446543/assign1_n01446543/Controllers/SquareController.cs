using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace assign1_n01446543.Controllers
{
    public class SquareController : ApiController
    {
        public int Get(int id)
        {
            return id * id;
        }
    }
}
