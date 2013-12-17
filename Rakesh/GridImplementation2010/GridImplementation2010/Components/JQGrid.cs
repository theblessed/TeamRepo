using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace Component.JQGrid
{    
    [DataContract]
    public abstract class JGridBindableObjects
    {
        // dummy abstract class
    }

    [DataContract]
    public class JGridPagedResult<T> where T : JGridBindableObjects
    {
        [DataMember]
        public List<T> rows {get; set;}
        
        [DataMember]
        public int totalRecords { get; set; }
        
        [DataMember]
        public int totalPages { get; set; }
    }
}
