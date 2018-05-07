using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SimpleInjector;
using SimpleInjector.Integration.Web;
using Rep.Traserep.Presentation.Agent;
using System.Reflection;
using SimpleInjector.Integration.Web.Mvc;
using System.Web.Mvc;

namespace Belcorp.Presentation.Web
{
    public class InitializeContainer
    {
        public static Container Container = new Container();

        public static void Start()
        {
            Container.Options.DefaultScopedLifestyle = new WebRequestLifestyle();

            Container.Register<AgenteAdministracion, AgenteAdministracion>(Lifestyle.Scoped);

            Container.RegisterMvcControllers(Assembly.GetExecutingAssembly());
            Container.Verify();
            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(Container));
        

           
        }
    }
}