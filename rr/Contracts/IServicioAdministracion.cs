using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;
using Belcorp.Service.DataContracts;


namespace Belcorp.Traserep.Service.MainContext.Contracts
{
    [ServiceContract]
    public interface IServicioAdministracion
    {

        [OperationContract]
        Task<UnidadPaginacionResponseDto> UnidadListarPaginadoAsync(UnidadPaginacionRequestDto request);

    }
}
