using System;
using System.Collections.Generic;
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

        /// <summary>
        /// Method to Add a teacher to the school Database
        /// </summary>
        /// <param name="teacher">Teacher object</param>
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

                // parameterized queries
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

        /// <summary>
        /// deletes a teacher from the school databases based on teacherid.
        /// </summary>
        /// <param name="id">teacherid</param>
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

        /// <summary>
        /// Searches courses that share an id of a deleted teacher and removes them
        /// </summary>
        /// <param name="id">teacherid</param>
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


        /// <summary>
        /// Gets the next available employee number
        /// </summary>
        /// <returns>A string with of the next available employee number</returns>
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
                
                // get the employee number of the last employee and add 1
                string eNumber = ResultSet["employeenumber"].ToString();
                int number = Int32.Parse(eNumber.TrimStart('T')) + 1;
                employeeNumber = $"T{number}";
   
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

        /// <summary>
        /// Receives Teacher information and updates the existing Teacher by its id with new information
        /// </summary>
        [HttpPost]
        public void updateTeacher(Teacher teacher)
        {

            try
            {
                // connect to the school database
                MySqlConnection conn = school.AccessDatabase();
                conn.Open();

                MySqlCommand cmd = conn.CreateCommand();
                string query = "UPDATE teachers SET teacherfname=@fname, teacherlname=@lname, salary=@salary WHERE teacherid=@id";

                cmd.CommandText = query;

                cmd.Parameters.AddWithValue("@id", teacher.teacherId);
                cmd.Parameters.AddWithValue("@fname", teacher.teacherFname);
                cmd.Parameters.AddWithValue("@lname", teacher.teacherLname);
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

    }
}
