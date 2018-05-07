using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace Belcorp.Service.DataContracts
{
    [DataContract]
    public class BusquedaFiltroDto<T>
    {
        [DataMember(EmitDefaultValue = false)]
        public T Filtro { get; set; }

        [DataMember(EmitDefaultValue = false)]
        public PaginacionDto Paginacion { get; set; }

    }
}
