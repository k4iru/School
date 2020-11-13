using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using assign3_n01446543.Models;

namespace assign3_n01446543.Controllers
{
    public class TeacherController : Controller
    {
        /// <summary>
        /// Teacher Index page. opens up a search form for searching teachers by id.
        /// </summary>
        /// <returns>Index.cshtml</returns>
        [HttpGet]
        [Route("Teacher/")]
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// returns a list of all the teachers in the school database.
        /// </summary>
        /// <returns>List.cshtml</returns>
        [HttpGet]
        [Route("Teachers/List")]
        public ActionResult List()
        {
            TeacherDataController controller = new TeacherDataController();
            IEnumerable<Teacher> teachers = controller.ListTeachers();
            return View(teachers);
        }


        /// <summary>
        /// returns the name of a teacher and the courses taught only usable through POST request 
        /// or through the interface on the Teacher Index page.
        /// </summary>
        /// <param name="teacherId"></param>
        /// <returns>Show.cshtml</returns>
        [HttpPost]
        [Route("Teacher/Show/{teacherId}")]
        public ActionResult Show(int teacherId)
        {
            TeacherDataController controller = new TeacherDataController();
            Teacher teacher = controller.FindTeacher(teacherId);
            return View(teacher);
        }
    }
}