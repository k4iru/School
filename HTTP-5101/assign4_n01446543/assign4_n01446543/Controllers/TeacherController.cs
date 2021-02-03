﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using assign4_n01446543.Models;

namespace assign4_n01446543.Controllers
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

        /// <summary>
        /// Get route to display specific teacher 
        /// </summary>
        /// <param name="id">teacherid</param>
        /// <returns>GetShow.chtml</returns>
        [HttpGet]
        [Route("Teacher/GetShow/{id}")]
        public ActionResult GetShow(int id)
        {
            TeacherDataController controller = new TeacherDataController();
            Teacher teacher = controller.FindTeacher(id);
            return View(teacher);
        }

        /// <summary>
        /// Confirmation page to delete a teacher
        /// </summary>
        /// <param name="id">takes id of a teacher</param>
        /// <returns>returns to list of teachers</returns>
        [HttpGet]
        [Route("Teacher/DeleteConfirm/{id}")]
        public ActionResult DeleteConfirm(int id)
        {
            TeacherDataController controller = new TeacherDataController();
            Teacher teacher = controller.FindTeacher(id);


            return View(teacher);
        }

        /// <summary>
        /// Deletes specified teacher
        /// </summary>
        /// <param name="id">takes teachers id as an input</param>
        /// <returns>returns the list of teachers</returns>

        [HttpPost]
        [Route("Teacher/Delete/{id}")]
        public ActionResult Delete(int id)
        {
            TeacherDataController controller = new TeacherDataController();
            controller.DeleteTeacher(id);
            return RedirectToAction("List");
        }

        /// <summary>
        /// Ajax view for adding a teacher
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("Teacher/Add_Ajax")]
        public ActionResult Add_Ajax()
        {
            return View();
        }

        /// <summary>
        /// View for adding a teacher
        /// </summary>
        /// <returns>A list of teachers</returns>
        [HttpGet]
        [Route("Teacher/Add")]
        public ActionResult Add()
        {
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fname"></param>
        /// <param name="lname"></param>
        /// <param name="date"></param>
        /// <param name="salary"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("Teacher/Create/{fname}/{lname}/{salary}")]
        public ActionResult Create(string fname, string lname, DateTime date, decimal salary)
        {
            TeacherDataController controller = new TeacherDataController();
            Teacher teacher = new Teacher();
            teacher.teacherFname = fname;
            teacher.teacherLname = lname;
            teacher.hireDate = Convert.ToDateTime(date);
            teacher.salary = Convert.ToDecimal(salary);

            controller.AddTeacher(teacher);
            return RedirectToAction("List");
        }

        /// <summary>
        /// Update teacher information based on teacherid
        /// </summary>
        /// <param name="id">Teacher id</param>
        /// <param name="fname">Teacher first name</param>
        /// <param name="lname">Teacher last name</param>
        /// <param name="salary">Teacher salary</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Update(int id, string fname, string lname,  decimal salary)
        {
            Teacher teacher = new Teacher();
            teacher.teacherId = id;
            teacher.teacherFname = fname;
            teacher.teacherLname = lname;

            teacher.salary = salary;

            TeacherDataController controller = new TeacherDataController();
            controller.updateTeacher(teacher);

            return RedirectToAction("GetShow/" + id);
        }


        /// <summary>
        /// View for updating teacher, displays teachers current information in input fields
        /// </summary>
        /// <param name="id">teacher id</param>
        /// <returns>View of update page</returns>
        [HttpGet]
        public ActionResult Update(int id)
        {
            TeacherDataController controller = new TeacherDataController();

            Teacher selectedTeacher = controller.FindTeacher(id);

            return View(selectedTeacher);
        }
    }
}