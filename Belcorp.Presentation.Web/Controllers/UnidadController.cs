using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Belcorp.Service.DataContracts;
using Rep.Traserep.Presentation.Agent;

namespace Belcorp.Presentation.Web.Controllers
{
    public class UnidadController : Controller
    {
        private readonly AgenteAdministracion agenteAdministracion = null;

        public UnidadController(AgenteAdministracion agenteAdministracion)
        {
            this.agenteAdministracion = agenteAdministracion;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> InicializarBandeja()
        {
           
            return Json(new
            {
                ListaTipoUnidad = 0,
                ListaEstado = 0

            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<JsonResult> BuscarPaginado(BusquedaFiltroDto<UnidadDto> busqueda)
        {

            var request = new UnidadPaginacionRequestDto
            {
                Unidad = busqueda.Filtro,
                PaginacionDto = busqueda.Paginacion
            };

            var resultado = await agenteAdministracion.InvocarFuncionAsync(x => x.UnidadListarPaginadoAsync(request));
            return Json(new
            {
                Lista = resultado.ListaUnidad,
                Total = resultado.CantidadResultados
            });

        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<JsonResult> Guardar(UnidadDto item)
        {
            UnidadDto retorno;
            retorno = await agenteAdministracion.InvocarFuncionAsync(o => o.RegistrarUnidadAsync(item));

            return Json(retorno);
        }
    }
}