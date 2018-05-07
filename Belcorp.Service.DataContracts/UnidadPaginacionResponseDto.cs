using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace Belcorp.Service.DataContracts
{
    [DataContract]
    public class UnidadPaginacionResponseDto
    {
        [DataMember(EmitDefaultValue = false)]
        public int CantidadResultados { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public List<UnidadDto> ListaUnidad { get; set; }
    }
}
