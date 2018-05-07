using System.Web;
using System.Web.Optimization;

namespace Belcorp.Presentation.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-2.1.4.js",
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/require").Include(
                        "~/Scripts/require.js"));

            bundles.Add(new ScriptBundle("~/bundles/rep").Include(
                        "~/Scripts/rep-constants.js",
                        "~/Scripts/rep-extensions.js",
                        "~/Scripts/rep-knockout-extensions.js",
                        "~/Scripts/rep-functions.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                        "~/Scripts/knockout-3.4.2.js",
                        "~/Scripts/knockout.mapping-latest.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/moment.js",
                      "~/Scripts/bootstrap-datetimepicker.js",
                      "~/Scripts/bootstrap-datetimepicker.es.js",
                      "~/Scripts/bootstrap-select.min.js",
                      "~/Scripts/bootstrap-multiselect.js",
                      "~/Scripts/bootstrap-treeview.js",
                      "~/Scripts/bootbox.min.js",
                      "~/Scripts/jrespond.js",
                      "~/Scripts/jquery.nicescroll.js",
                      "~/Scripts/jquery.adminPlugin.js",
                      "~/Scripts/main.js",
                      "~/Scripts/scrupulous.js",
                      "~/Scripts/extras.js"));

            bundles.Add(new StyleBundle("~/Content/styles").Include(
                      "~/Content/css/bootstrap.min.css",
                      "~/Content/css/bootstrap.datepicker.css",
                      "~/Content/css/bootstrap.select.css",
                      "~/Content/css/bootstrap-multiselect.css",
                      "~/Content/css/style.css"));
            bundles.Add(new StyleBundle("~/Content/font-awesome").Include("~/Content/css/font-awesome.css", new CssRewriteUrlTransform()));
            bundles.Add(new StyleBundle("~/Content/main").Include("~/Content/css/main.css", new CssRewriteUrlTransform()));
            bundles.Add(new StyleBundle("~/Content/plugins").Include(
                      "~/Content/css/plugins.css",
                      "~/Content/css/responsive.css",
                      "~/Content/css/scrupulous.css",
                      "~/Content/css/loader.css",
                      "~/Content/css/site.css"));
            bundles.Add(new StyleBundle("~/Content/login").Include(
                      "~/Content/css/login.css", new CssRewriteUrlTransform()));
        }
    }
}
