﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Belcorp.Presentation.Agent.ServicioAdministracion {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="ServicioAdministracion.IServicioAdministracion")]
    public interface IServicioAdministracion {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioAdministracion/UnidadListarPaginado", ReplyAction="http://tempuri.org/IServicioAdministracion/UnidadListarPaginadoResponse")]
        Belcorp.Service.DataContracts.UnidadPaginacionResponseDto UnidadListarPaginado(Belcorp.Service.DataContracts.UnidadPaginacionRequestDto request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioAdministracion/UnidadListarPaginado", ReplyAction="http://tempuri.org/IServicioAdministracion/UnidadListarPaginadoResponse")]
        System.Threading.Tasks.Task<Belcorp.Service.DataContracts.UnidadPaginacionResponseDto> UnidadListarPaginadoAsync(Belcorp.Service.DataContracts.UnidadPaginacionRequestDto request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioAdministracion/RegistrarUnidad", ReplyAction="http://tempuri.org/IServicioAdministracion/RegistrarUnidadResponse")]
        Belcorp.Service.DataContracts.UnidadDto RegistrarUnidad(Belcorp.Service.DataContracts.UnidadDto unidadDto);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IServicioAdministracion/RegistrarUnidad", ReplyAction="http://tempuri.org/IServicioAdministracion/RegistrarUnidadResponse")]
        System.Threading.Tasks.Task<Belcorp.Service.DataContracts.UnidadDto> RegistrarUnidadAsync(Belcorp.Service.DataContracts.UnidadDto unidadDto);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IServicioAdministracionChannel : Belcorp.Presentation.Agent.ServicioAdministracion.IServicioAdministracion, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class ServicioAdministracionClient : System.ServiceModel.ClientBase<Belcorp.Presentation.Agent.ServicioAdministracion.IServicioAdministracion>, Belcorp.Presentation.Agent.ServicioAdministracion.IServicioAdministracion {
        
        public ServicioAdministracionClient() {
        }
        
        public ServicioAdministracionClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public ServicioAdministracionClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public ServicioAdministracionClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public ServicioAdministracionClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Belcorp.Service.DataContracts.UnidadPaginacionResponseDto UnidadListarPaginado(Belcorp.Service.DataContracts.UnidadPaginacionRequestDto request) {
            return base.Channel.UnidadListarPaginado(request);
        }
        
        public System.Threading.Tasks.Task<Belcorp.Service.DataContracts.UnidadPaginacionResponseDto> UnidadListarPaginadoAsync(Belcorp.Service.DataContracts.UnidadPaginacionRequestDto request) {
            return base.Channel.UnidadListarPaginadoAsync(request);
        }
        
        public Belcorp.Service.DataContracts.UnidadDto RegistrarUnidad(Belcorp.Service.DataContracts.UnidadDto unidadDto) {
            return base.Channel.RegistrarUnidad(unidadDto);
        }
        
        public System.Threading.Tasks.Task<Belcorp.Service.DataContracts.UnidadDto> RegistrarUnidadAsync(Belcorp.Service.DataContracts.UnidadDto unidadDto) {
            return base.Channel.RegistrarUnidadAsync(unidadDto);
        }
    }
}
