﻿using System.Web;
using System.Web.Mvc;

namespace assign2_n01446543
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
