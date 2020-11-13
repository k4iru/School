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
    public class StudentDataController : ApiController
    {

        // used to access the school database
        private readonly SchoolDbContext school = new SchoolDbContext();

        /// <summary>
        /// Accesses the school database and returns a list of all the students.
        /// </summary>
        /// <returns>IEnumerable<Student> that contains every student in the school.</returns>
        public IEnumerable<Student> ListStudents()
        {

            List<Student> StudentList = new List<Student> { };
            try
            {

                // opens connection to the schooldb
                MySqlConnection Conn = school.AccessDatabase();
                Conn.Open();

                // creates sql command 
                MySqlCommand cmd = Conn.CreateCommand();
                cmd.CommandText = "SELECT * FROM students";

                // executes sql command and stores it in a ResultSet
                MySqlDataReader ResultSet = cmd.ExecuteReader();


                // while there are still rows
                while (ResultSet.Read())
                {

                    // pull column date and store them in temporary variables
                    uint studentId = ResultSet.GetUInt32("studentid");
                    string studentFname = ResultSet["studentfname"].ToString();
                    string studentLname = ResultSet["studentlname"].ToString();
                    string studentNumber = ResultSet["studentnumber"].ToString();
                    DateTime enrolDate = ResultSet.GetDateTime("enroldate");


                    // create a new Student object and set all the values
                    Student newStudent = new Student
                    {
                        studentId = studentId,
                        studentFname = studentFname,
                        studentLname = studentLname,
                        studentNumber = studentNumber,
                        enrolDate = enrolDate
                    };

                    // add the student object to the IEnumerable<Student>
                    StudentList.Add(newStudent);
                }

                // close the connection when finished
                Conn.Close();
            }

            // handle server being unreachable and invalid credentials
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

            return StudentList;
        }

        /// <summary>
        /// finds a single student based on the inputted studentid.
        /// </summary>
        /// <param name="id">the primary key in the student table used to identify students.</param>
        /// <returns>A single Student object</returns>
        public Student FindStudent(int id)
        {
            // instanstiate a Student object
            Student newStudent = new Student();
            try
            {
                // connect to the school database
                MySqlConnection conn = school.AccessDatabase();
                conn.Open();

                // create a sql command 
                MySqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "SELECT * FROM students WHERE studentid =" + id;

                // executes the sql command and stores the results in the ResultSet
                MySqlDataReader ResultSet = cmd.ExecuteReader();

                // read the row
                ResultSet.Read();

                // extracts data from each column and store them in temporary variables
                uint studentId = (uint)ResultSet["studentid"];
                string studentFname = ResultSet["studentfname"].ToString();
                string studentLname = ResultSet["studentlname"].ToString();
                string studentNumber = ResultSet["studentnumber"].ToString();
                DateTime enrolDate = ResultSet.GetDateTime("enroldate");

                // set the values for the Student object
                newStudent.studentId = studentId;
                newStudent.studentFname = studentFname;
                newStudent.studentLname = studentLname;
                newStudent.studentNumber = studentNumber;
                newStudent.enrolDate = enrolDate;

                // close the connection
                conn.Close();

            }

            // handle server being unreachable and invalid credentials
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
            return newStudent;
        }

    }
}
