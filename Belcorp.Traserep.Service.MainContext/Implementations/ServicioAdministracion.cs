using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using Belcorp.Service.DataContracts;
using Belcorp.Traserep.Service.MainContext.Contracts;
using Belcorp.Infra.Data.Core;

namespace Belcorp.Traserep.Service.MainContext.Implementations
{
    public class ServicioAdministracion : IServicioAdministracion
    {
        UnidadRepositorio _unidadRepositorio = new UnidadRepositorio();

        public async Task<UnidadPaginacionResponseDto> UnidadListarPaginadoAsync(UnidadPaginacionRequestDto request)
        {

            var unidades = await _unidadRepositorio.ListadoUnidades(request);

            var listaUnidades = unidades.Select(x => new UnidadDto
            {
                 Id = x.Id,        
                 Placa = x.Placa,
                 Marca = x.Marca,
                 Modelo = x.Modelo,
                 NombreTipoUnidad = x.NombreTipoUnidad
            }).ToList();

            return new UnidadPaginacionResponseDto
            {
                CantidadResultados = unidades.Count(),
                ListaUnidad = listaUnidades
            };
        }

        public async Task<UnidadDto> RegistrarUnidadAsync(UnidadDto unidadDto)
        {
            var unidad = new Unidad
            {
                Placa = unidadDto.Placa,
                Marca = unidadDto.Marca,
                Modelo = unidadDto.Modelo,
                NombreTipoUnidad = unidadDto.NombreTipoUnidad
            };

            return await _unidadRepositorio.SaveUnidades(unidad);

        }

    }
}
