﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace assign1_n01446543.Controllers
{
    public class GreetingController : ApiController
    {
        /// <summary>
        /// greets a number of  people
        /// </summary>
        /// <param name="id">number of people to greet</param>
        /// <returns>string</returns>
        public string Get(int id)
        {
            return $"Greetings to {id} people!";
        }

        /// <summary>
        /// print hello world for a post request
        /// </summary>
        /// <returns>string</returns>
        public string Post()
        {
            return "Hello World!";
        }
    }
}
