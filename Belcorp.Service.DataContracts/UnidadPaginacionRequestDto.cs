using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Belcorp.Service.DataContracts
{
    [DataContract]
    public class UnidadPaginacionRequestDto
    {
        [DataMember]
        public UnidadDto Unidad { get; set; }

        [DataMember]
        public PaginacionDto PaginacionDto { get; set; }
    }
}
