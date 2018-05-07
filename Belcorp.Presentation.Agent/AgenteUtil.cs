using ChannelAdam.ServiceModel;
using System;

namespace Belcorp.Presentation.Agent
{
    public static class AgenteUtil
    {
        public static T ObtenerResultado<T>(IOperationResult<T> result)
        {
            if (result.HasNoException) return result.Value;
            if (result.HasFaultExceptionOfType<Exception>()) throw new Exception(ObtenerMensajeError(result)); //FaultException(Type)
            if (result.HasFaultException) throw new Exception(); //Exception FaultException
            throw new Exception(""); //Exception Generica
        }

        public static void FinalizarResultado<T>(IOperationResult<T> result)
        {
            if (result.HasNoException) return;
            if (result.HasFaultExceptionOfType<Exception>()) throw new Exception(ObtenerMensajeError(result)); //FaultException(Type)
            if (result.HasFaultException) throw new Exception();  //Exception FaultException
            var realError = result.Exception;//ToDo
            throw new Exception(""); //Exception Generica
        }

        public static void FinalizarResultado(IOperationResult result)
        {
            if (result.HasNoException) return;
            if (result.HasFaultExceptionOfType<Exception>()) throw new Exception(ObtenerMensajeError(result)); //FaultException(Type)
            if (result.HasFaultException) throw new Exception();  //Exception FaultException
            throw new Exception(""); //Exception Generica
        }

        private static string ObtenerMensajeError(IOperationResult result) {
            return string.Empty;
        }
    }
}
