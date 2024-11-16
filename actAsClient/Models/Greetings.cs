using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace actAsCLient.Models
{
    public class Greetings
    {
        public int Id { get; set; }
        public string? TimeOfDay{ get; set; }
        public string? Languange{ get; set; }
        public string? GreetingMessage{ get; set; }  
    }
}