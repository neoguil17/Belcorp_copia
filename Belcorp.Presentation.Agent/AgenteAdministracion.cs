
using System;
using System.Threading.Tasks;
using ChannelAdam.ServiceModel;
using System.Linq.Expressions;
using Belcorp.Presentation.Agent.ServicioAdministracion;
using Belcorp.Presentation.Agent;

namespace Rep.Traserep.Presentation.Agent
{
    public class AgenteAdministracion : IDisposable
    {
        private readonly IServiceConsumer<IServicioAdministracion> proxy;

        public AgenteAdministracion()
        {
            proxy = ServiceConsumerFactory.Create<IServicioAdministracion>(() => new ServicioAdministracionClient());
        }  

        public async Task<T> InvocarFuncionAsync<T>(Expression<Func<IServicioAdministracion, Task<T>>> func)
        {
            var result = await proxy.ConsumeAsync<T>(func);
            return AgenteUtil.ObtenerResultado<T>(result);
        }

        public async Task InvocarAccionAsync(Expression<Func<IServicioAdministracion, Task>> func)
        {            
            var result = await proxy.ConsumeAsync(func);
            AgenteUtil.FinalizarResultado(result);
        }

        public void Dispose()
        {
            if (proxy != null)
                proxy.Dispose();
        }
    }
}
