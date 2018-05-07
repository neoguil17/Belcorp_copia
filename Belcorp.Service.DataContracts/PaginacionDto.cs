using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace Belcorp.Service.DataContracts
{
    [DataContract]
    public class PaginacionDto
    {
        [DataMember(EmitDefaultValue = false)]
        public int NroPagina { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public int TamanioPagina { get; set; }
    }
}
