using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace Belcorp.Service.DataContracts
{
    [DataContract]
    public class UnidadDto
    {
        [DataMember(EmitDefaultValue = false)]
        public int Id { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public string Placa { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public string Marca { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public string Modelo { get; set; }
        [DataMember(EmitDefaultValue = false)]
        public string NombreTipoUnidad { get; set; }

    }
}
