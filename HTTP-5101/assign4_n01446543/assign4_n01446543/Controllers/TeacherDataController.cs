using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using assign4_n01446543.Models;
using MySql.Data.MySqlClient;
using System.Web.Http.Cors;
using System.Diagnostics;

namespace assign4_n01446543.Controllers
{
    public class TeacherDataController : ApiController
    {
        // used to access the school database
        private readonly SchoolDbContext school = new SchoolDbContext();

        /// <summary>
        /// Accesses the school database and returns a list of all the teachers
        /// </summary>
        /// <returns>List<Teacher> a list of teachers in the school</returns>
        [HttpGet]
        public List<Teacher> ListTeachers()
        {

            // create an empty list<Teacher
            List<Teacher> TeacherList = new List<Teacher> { };
            try
            {
                // opens a connection to the school database
                MySqlConnection Conn = school.AccessDatabase();
                Conn.Open();

                // creates the sql command 
                MySqlCommand cmd = Conn.CreateCommand();
                cmd.CommandText = "SELECT * FROM teachers";

                // executes the sql command and stores results in ResultSet
                MySqlDataReader ResultSet = cmd.ExecuteReader();

                // while there are rows 
                while (ResultSet.Read())
                {
                    // extract data from each column and store in temporary variables
                    int teacherId = (int)ResultSet["teacherid"];
                    string teacherFname = ResultSet["teacherfname"].ToString();
                    string teacherLname = ResultSet["teacherlname"].ToString();
                    string employeeNumber = ResultSet["employeenumber"].ToString();
                    DateTime hireDate = ResultSet.GetDateTime("hiredate");
                    decimal salary = (decimal)ResultSet["salary"];

                    // create a new Teacher object and set the values
                    Teacher newTeacher = new Teacher
                    {
                        teacherId = teacherId,
                        teacherFname = teacherFname,
                        teacherLname = teacherLname,
                        employeeNumber = employeeNumber,
                        hireDate = hireDate,
                        salary = salary
                    };

                    // Add the Teacher object to the List<Teacher> list
                    TeacherList.Add(newTeacher);
                }

                // close the connection when finished with the query
                Conn.Close();

            }

            // handle being unable to connect to server and invalid credentials
            catch (MySqlException ex)
            {
                switch (ex.Number)
                {
                    case 0:
                        Console.WriteLine("Cannot connect to server.");
                        break;
                    case 1045:
                        Console.WriteLine("invalid username/password");
                        break;
                }
            }
            return TeacherList;
        }

        public Teacher FindTeacher(int id)
        {
            // create a Teacher Object
            Teacher newTeacher = new Teacher();
            try
            {
                // connect to the school database
                MySqlConnection conn = school.AccessDatabase();
                conn.Open();

                // create the sql command
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "SELECT * FROM teachers WHERE teacherid = @id";
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Prepare();

                // execute the sql command and store results in ResultSet
                MySqlDataReader ResultSet = cmd.ExecuteReader();

                // read the row
                ResultSet.Read();

                // extract data from each column and store in temporary variables
                int teacherId = ResultSet.GetInt32("teacherid");
                string teacherFname = ResultSet["teacherfname"].ToString();
                string teacherLname = ResultSet["teacherlname"].ToString();
                string employeeNumber = ResultSet["employeenumber"].ToString();
                DateTime hireDate = ResultSet.GetDateTime("hiredate");
                decimal salary = ResultSet.GetDecimal("salary");   

                // set values on the teacher object
                newTeacher.teacherId = teacherId;
                newTeacher.teacherFname = teacherFname;
                newTeacher.teacherLname = teacherLname;
                newTeacher.employeeNumber = employeeNumber;
                newTeacher.hireDate = hireDate;
                newTeacher.salary = salary;

 

                // close connection when finished
                conn.Close();
            }

            // handle being unable to connect to server and invalid credentials
            catch (MySqlException ex)
            {
                switch (ex.Number)
                {
                    case 0:
                        Console.WriteLine("Cannot connect to server :(.");
                        break;
                    case 1045:
                        Console.WriteLine("invalid username/password");
                        break;
                }
            }
            return newTeacher;
        }

        [HttpPost]
        [EnableCors(origins: "*", methods: "*", headers: "*")]
        public void AddTeacher([FromBody]Teacher teacher)
        {
         
            try
            {
                // connect to the school database
                MySqlConnection conn = school.AccessDatabase();
                conn.Open();

                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "INSERT INTO teachers " +
                "(teacherfname, teacherlname, employeenumber, hiredate, salary) " +
                "VALUES (@fname, @lname, @employeenumber, @hiredate, @salary)";

                cmd.Parameters.AddWithValue("@fname", teacher.teacherFname);
                cmd.Parameters.AddWithValue("@lname", teacher.teacherLname);
                cmd.Parameters.AddWithValue("@employeenumber", GetMaxEmployeeNumber());
                cmd.Parameters.AddWithValue("@hiredate", teacher.hireDate);
                cmd.Parameters.AddWithValue("@salary", teacher.salary);

                cmd.Prepare();
                cmd.ExecuteNonQuery();
                conn.Close();

            }
            catch (MySqlException ex)
            {
                switch (ex.Number)
                {
                    case 0:
                        Console.WriteLine("Cannot connect to server :(.");
                        break;
                    case 1045:
                        Console.WriteLine("invalid username/password");
                        break;
                }
            }
        }

        public void DeleteTeacher(int id)
        {
            try
            {
                // connect to the school database
                MySqlConnection conn = school.AccessDatabase();
                conn.Open();

                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "DELETE FROM teachers WHERE teacherid=@id";

                cmd.Parameters.AddWithValue("@id", id);

                cmd.Prepare();
                cmd.ExecuteNonQuery();
                conn.Close();

                // delete orphaned courses
                DeleteTeacherCourses(id);

            }
            catch (MySqlException ex)
            {
                switch (ex.Number)
                {
                    case 0:
                        Console.WriteLine("Cannot connect to server :(.");
                        break;
                    case 1045:
                        Console.WriteLine("invalid username/password");
                        break;
                }
            }
        }
        public void DeleteTeacherCourses(int id)
        {
            try
            {
                // connect to the school database
                MySqlConnection conn = school.AccessDatabase();
                conn.Open();

                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "DELETE FROM classes WHERE teacherid=@id";

                cmd.Parameters.AddWithValue("@id", id);

                cmd.Prepare();
                cmd.ExecuteNonQuery();
                conn.Close();

            }
            catch (MySqlException ex)
            {
                switch (ex.Number)
                {
                    case 0:
                        Console.WriteLine("Cannot connect to server :(.");
                        break;
                    case 1045:
                        Console.WriteLine("invalid username/password");
                        break;
                }
            }
        }

        public string GetMaxEmployeeNumber()
        {
            string employeeNumber = "";
            try
            {
                // connect to the school database
                MySqlConnection conn = school.AccessDatabase();
                conn.Open();

                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "SELECT * FROM teachers ORDER BY teacherid DESC LIMIT 1";
                cmd.Prepare();

                // execute the sql command and store results in ResultSet
                MySqlDataReader ResultSet = cmd.ExecuteReader();

                // read the row
                ResultSet.Read();
                string eNumber = ResultSet["employeenumber"].ToString();
                Debug.WriteLine("Enumber:" + eNumber);
                int number = Int32.Parse(eNumber.TrimStart('T')) + 1;
                Debug.WriteLine("trimmed:" + number);
                employeeNumber = $"T{number}";
                Debug.WriteLine("combined:" + employeeNumber);



                conn.Close();

            }
            catch (MySqlException ex)
            {
                switch (ex.Number)
                {
                    case 0:
                        Console.WriteLine("Cannot connect to server :(.");
                        break;
                    case 1045:
                        Console.WriteLine("invalid username/password");
                        break;
                }
            }
            return employeeNumber;
        }

    }
}
