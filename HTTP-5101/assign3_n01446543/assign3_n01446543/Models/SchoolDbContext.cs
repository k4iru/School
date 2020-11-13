using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;


//https://dev.mysql.com/doc/dev/connector-net/8.0/html/T_MySql_Data_MySqlClient_MySqlConnection.htm

namespace assign3_n01446543.Models
{
    /// <summary>
    /// database information
    /// </summary>
    public class SchoolDbContext
    {
        // database credentials
        private static string User { get { return "root"; } }
        private static string Password { get { return "root"; } }
        private static string Database { get { return "school"; } }
        private static string Server { get { return "localhost"; } }
        private static string Port { get { return "3306"; } }


        // build the connection string
        protected static string ConnectionString
        {
            get
            {
                return 
                    $"server = {Server};" +
                    $"user = {User};" +
                    $"password = {Password};" +
                    $"database = {Database};" +
                    $"port = {Port};";
            }
        }

        /// <summary>
        /// creates a connection to the school database
        /// </summary>
        /// <returns>MySqlConnection object to the school database.</returns>
        public MySqlConnection AccessDatabase()
        {
            return new MySqlConnection(ConnectionString);
        }

    }
}