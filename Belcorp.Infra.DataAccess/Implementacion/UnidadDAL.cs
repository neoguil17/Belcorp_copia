using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Belcorp.Infra.DataAccess.Core;
using Belcorp.Service.DataContracts;

namespace Belcorp.Infra.DataAccess.Implementacion
{
    public class UnidadDAL : BaseAccesoSQL
    {
        public UnidadDAL(BelcorpContext context)
            : base(context)
        { }

        public List<UnidadDto> Listar()
        {
            var dato = Contexto.Database.SqlQuery<UnidadDto>("",
                                                new SqlParameter
                                                {
                                                    SqlDbType = SqlDbType.Int,
                                                    ParameterName = "@int_CodigoAgencia",
                                                    Value = (object)DBNull.Value
                                                }).ToList();
            return dato;
        }



    }
}
