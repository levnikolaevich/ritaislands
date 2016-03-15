using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace rita.Models
{
    public partial class User
    {
        public List<int> Permissions { get; set; }
    }
}