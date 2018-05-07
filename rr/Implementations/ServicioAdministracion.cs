using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using Belcorp.Service.DataContracts;

namespace Belcorp.Traserep.Service.MainContext.Implementations
{
    public class ServicioAdministracion
    {
        public async Task<UnidadPaginacionResponseDto> UnidadListarPaginadoAsync(UnidadPaginacionRequestDto request)
        {
            return new UnidadPaginacionResponseDto
            {

            };
        }

    }
}
