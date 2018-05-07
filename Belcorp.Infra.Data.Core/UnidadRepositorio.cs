using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Belcorp.Service.DataContracts;
using System.Data.Entity;

namespace Belcorp.Infra.Data.Core
{
    public abstract class BaseDomainContext
    {
        static BaseDomainContext()
        {
            var ensureDLLIsCopied = System.Data.Entity.SqlServer.SqlProviderServices.Instance;
        }
    }

    public class UnidadRepositorio
    {
        BelcorpEntities context = new BelcorpEntities();

        public async Task<List<Unidad>> ListadoUnidades(UnidadPaginacionRequestDto request)
        {
            var query = (
                from uni in context.Unidad
                select uni).AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.Unidad.Marca))
            {
                query = query.Where(x => x.Marca == request.Unidad.Marca);
            }

            var result = await query.ToListAsync();
            return result;

        }

        public async Task<UnidadDto> SaveUnidades(Unidad request)
        {
            var e = await context.Unidad.CountAsync();

            request.Id = (e == 0) ? 1 : ((await context.Unidad.MaxAsync(x => x.Id)) + 1);


            context.Unidad.Add(request);
            await context.SaveChangesAsync();

            return new UnidadDto();

        }
    }
}
