using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Belcorp.Presentation.Web.Startup))]
namespace Belcorp.Presentation.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
