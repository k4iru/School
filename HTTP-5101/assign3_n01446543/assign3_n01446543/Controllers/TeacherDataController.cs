using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using assign3_n01446543.Models;
using MySql.Data.MySqlClient;
using System.Diagnostics;

namespace assign3_n01446543.Controllers
{
    public class TeacherDataController : ApiController
    {
        private SchoolDbContext school = new SchoolDbContext();

        [HttpGet]
        public IEnumerable<Teacher> ListTeachers()
        {
            Debug.WriteLine("test");

            MySqlConnection Conn = school.AccessDatabase();
            Conn.Open();

            MySqlCommand cmd = Conn.CreateCommand();

            cmd.CommandText = "SELECT * FROM teachers";

            MySqlDataReader ResultSet = cmd.ExecuteReader();

            List<Teacher> TeacherList = new List<Teacher> { };

            while (ResultSet.Read())
            {
                int teacherId = (int)ResultSet["teacherid"];
                string teacherFname = ResultSet["teacherfname"].ToString();
                string teacherLname = ResultSet["teacherlname"].ToString();
                string employeeNumber = ResultSet["employeenumber"].ToString();
                string hireDate = ResultSet["hiredate"].ToString();
                decimal salary = (decimal)ResultSet["salary"];

                Teacher newTeacher = new Teacher();
                newTeacher.teacherId = teacherId;
                newTeacher.teacherFname = teacherFname;
                newTeacher.teacherLname = teacherLname;
                newTeacher.employeeNumber = employeeNumber;
                newTeacher.hireDate = hireDate;
                newTeacher.salary = salary;

                TeacherList.Add(newTeacher);
            }

            Conn.Close();

            return TeacherList;
        }

        [HttpGet]
        public Teacher findTeacher(int id)
        {
            Teacher newTeacher = new Teacher();
            MySqlConnection Conn = school.AccessDatabase();
            Conn.Open();

            MySqlCommand cmd = Conn.CreateCommand();

            cmd.CommandText = "SELECT * FROM teachers WHERE teacherid =" + id;

            MySqlDataReader ResultSet = cmd.ExecuteReader();

            while (ResultSet.Read())
            {
                int teacherId = (int)ResultSet["teacherid"];
                string teacherFname = ResultSet["teacherfname"].ToString();
                string teacherLname = ResultSet["teacherlname"].ToString();
                string employeeNumber = ResultSet["employeenumber"].ToString();
                string hireDate = ResultSet["hiredate"].ToString();
                decimal salary = (decimal)ResultSet["salary"];

                newTeacher.teacherId = teacherId;
                newTeacher.teacherFname = teacherFname;
                newTeacher.teacherLname = teacherLname;
                newTeacher.employeeNumber = employeeNumber;
                newTeacher.hireDate = hireDate;
                newTeacher.salary = salary;
            }

            return newTeacher;
        }

    }
}
