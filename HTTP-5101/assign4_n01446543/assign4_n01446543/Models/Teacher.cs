using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace assign4_n01446543.Models
{
    /// <summary>
    ///  teacher class
    /// </summary>
    public class Teacher
    {
        public int teacherId;
        public string teacherFname;
        public string teacherLname;
        public string employeeNumber;
        public DateTime hireDate;
        public decimal salary;
        public List<Course> courses = new List<Course>();
    }
}