using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using assign3_n01446543.Models;

namespace assign3_n01446543.Controllers
{
    public class StudentController : Controller
    {

        
        [HttpGet]
        [Route("Student")]
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// returns a list of all the students in the school database.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("Student/List")]
        public ActionResult List()
        {
            StudentDataController controller = new StudentDataController();
            IEnumerable<Student> students = controller.ListStudents();
            return View(students);
        }

        /// <summary>
        /// returns the name of a student and their student number through the interface in Students Index page. 
        /// </summary>
        /// <param name="studentId"></param>
        /// <returns>Show.cshtml</returns>
        [HttpPost]
        [Route("Student/Show/{studentId}")]
        public ActionResult Show(int studentId)
        {
            StudentDataController controller = new StudentDataController();
            Student student = controller.FindStudent(studentId);
            return View(student);
        }
    }
}