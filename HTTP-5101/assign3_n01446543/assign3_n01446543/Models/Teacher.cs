using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;

namespace assign3_n01446543.Models
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
        public List<string> courses = new List<string>();
    }
}