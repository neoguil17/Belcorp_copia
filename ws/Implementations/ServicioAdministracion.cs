using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using Belcorp.Service.DataContracts;
using Belcorp.Traserep.Service.MainContext.Contracts;

namespace Belcorp.Traserep.Service.MainContext.Implementations
{
    public class ServicioAdministracion : IServicioAdministracion
    {
        public async Task<UnidadPaginacionResponseDto> UnidadListarPaginadoAsync(UnidadPaginacionRequestDto request)
        {
            return new UnidadPaginacionResponseDto
            {

            };
        }

    }
}
