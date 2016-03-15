using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Optimization;
using rita.Models;

namespace rita
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/hjs1").Include(
                "~/js/jquery2.js"));

            bundles.Add(new ScriptBundle("~/bundles/hjs2").Include(
                "~/js/jquery.themepunch.revolution.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/hjs").Include(
                "~/js/modernizr.js",
                "~/js/comment-reply.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                "~/js/bootstrap.min.js",
                "~/js/superfish.js",
                "~/js/supersubs.js",
                "~/js/plugins.js",
                "~/js/redactor.js",
                "~/js/ru.js",
                "~/js/jquery.flexslider-min.js",
                "~/js/main.js"));
        }
    }

    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            BundleTable.EnableOptimizations = true;
            //BundleTable.Bundles.RegisterTemplateBundles();
            
            // Only code required for MvcBundleConfig wire up

            //BundleTable.Bundles.RegisterConfigurationBundles();
        }

        protected void Session_Start(Object sender, EventArgs e)
        {
            try
            {
                if (Request.Cookies["r_u"] == null)
                {
                    HttpContextBase currentContext = new HttpContextWrapper(HttpContext.Current);
                    UrlHelper urlHelper = new UrlHelper(HttpContext.Current.Request.RequestContext);
                    RouteData routeData = urlHelper.RouteCollection.GetRouteData(currentContext);
                    string controller = routeData.Values["controller"] as string;
                    string action = routeData.Values["action"] as string;
                    string ip = Request.UserHostAddress;
                    string url = Request.Url.ToString();

                    if (Session["BdData"] == null)
                    {
                        Session["BdData"] = new BdData();
                    }
                    BdData bdData = (BdData) Session["BdData"];

                    Models.Cookie cookie = new Models.Cookie
                    {
                        StartPointController = controller,
                        StartPointAction = action,
                        StartPointUrl = url,
                        UserId = Request.IsAuthenticated ? (int?) bdData.GetUser(User.Identity.Name).Id : null
                    };

                    if (cookie.UserId != null && bdData.GetCookieUser(cookie.UserId.Value) != null)
                    {
                        cookie = bdData.GetCookieUser(cookie.UserId.Value);
                    }
                    else
                    {
                        cookie = bdData.AddCookie(cookie);
                    }

                    if (cookie != null)
                    {
                        // ReSharper disable once PossibleNullReferenceException
                        Response.Cookies["r_u"].Value = cookie.Id.ToString();
                        // ReSharper disable once PossibleNullReferenceException
                        Response.Cookies["r_u"].Expires = DateTime.Now.AddYears(100);
                        Session["Cookie"] = cookie;
                    }
                }
            }
            catch
            {
            }
        }

        protected void Application_PreRequestHandlerExecute(Object sender, EventArgs e)
        {
            try
            {
                if (Request.Cookies["r_u"] != null)
                {
                    HttpContextBase currentContext = new HttpContextWrapper(HttpContext.Current);
                    UrlHelper urlHelper = new UrlHelper(HttpContext.Current.Request.RequestContext);
                    RouteData routeData = urlHelper.RouteCollection.GetRouteData(currentContext);
                    string controller = routeData.Values["controller"] as string;
                    string action = routeData.Values["action"] as string;
                    string ip = Request.UserHostAddress;
                    string url = Request.Url.ToString();

                    if (Session["BdData"] == null)
                    {
                        Session["BdData"] = new BdData();
                    }
                    BdData bdData = (BdData) Session["BdData"];

                    Guid? cookieId = null;
                    try
                    {
                        cookieId = Guid.Parse(Request.Cookies["r_u"].Value);
                    }
                    catch
                    {
                    }

                    if (cookieId != null)
                    {
                        if (Session["Cookie"] == null)
                        {
                            Session["Cookie"] = bdData.GetCookie(cookieId.Value);
                        }
                        Models.Cookie cookie = (Models.Cookie) Session["Cookie"];
                        if (cookie.UserId == null && Request.IsAuthenticated)
                        {
                            cookie.UserId = bdData.GetUser(User.Identity.Name).Id;
                            bdData.UpdateCookie(cookie);
                        }
                        CookieLog cookieLog = new CookieLog()
                        {
                            Action = action,
                            Controller = controller,
                            CookieId = cookie.Id,
                            CreationDate = DateTime.Now,
                            Url = url,
                            Ip = ip
                        };
                        if (Session["CookieLogs"] == null)
                        {
                            Session["CookieLogs"] = new List<CookieLog>();
                        }
                        List<CookieLog> list = (List<CookieLog>) Session["CookieLogs"];
                        list.Add(cookieLog);
                    }
                }
            }
            catch
            {
            }
        }

        protected void Session_End(Object sender, EventArgs e)
        {
            try
            {
                if (Session["CookieLogs"] != null)
                {
                    if (Session["BdData"] == null)
                    {
                        Session["BdData"] = new BdData();
                    }
                    BdData bdData = (BdData) Session["BdData"];
                    bdData.AddCookieLog((List<CookieLog>) Session["CookieLogs"]);
                    Session["CookieLogs"] = null;
                }
            }
            catch
            {
            }
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

            if (Request.Url.ToString().ToLower().Contains("ritaislands.ru/home/main"))
            {
                UriBuilder builder = new UriBuilder("http://ritaislands.ru");
                Response.StatusCode = 301;
                Response.RedirectLocation = builder.ToString();
                Response.AddHeader("Location", builder.ToString());
                Response.End();
            }

            if (Request.Url.ToString().ToLower().Contains("ritaislands.ru/svadba-za-granicey/main"))
            {
                UriBuilder builder = new UriBuilder("http://ritaislands.ru");
                Response.StatusCode = 301;
                Response.RedirectLocation = builder.ToString();
                Response.AddHeader("Location", builder.ToString());
                Response.End();
            }

            if (Request.Url.ToString().ToLower().Contains("/home") && Request.HttpMethod.ToLower() == "get")
            {
                Response.StatusCode = 301;
                Response.RedirectLocation = Request.Url.ToString().ToLower().Replace("/home", "/svadba-za-granicey");
                Response.AddHeader("Location", Request.Url.ToString().ToLower().Replace("/home", "/svadba-za-granicey"));
                Response.End();
            }

            if (Request.Url.ToString().ToLower().Contains("testrita.azurewebsites.net"))
                return;

            if (!Request.Url.ToString().ToLower().Contains("ritaislands.ru") && !Request.Url.IsLoopback)
            {
                UriBuilder builder = new UriBuilder(Request.Url);
                builder.Host = "ritaislands.ru";
                builder.Port = 80;
                builder.Scheme = "http";
                Response.StatusCode = 301;
                Response.RedirectLocation = builder.ToString();
                Response.AddHeader("Location", builder.ToString());
                Response.End();
            }

        }

        //public HttpResponseMessage Get()
        //{

        //    var request = Request.CreateResponse(HttpStatusCode.OK);
        //    request.Content.Headers.Add("Content-Type", "application/x-gzip");
        //    request.Content.Headers.Add("Content-Encoding", "gzip");

        //    //TODO:Add your logic here...

        //    return request;
        //}

        //protected void Application_EndRequest()
        //{
        //    if (Context.Response.StatusCode == 404)
        //    {
        //        Response.Clear();

        //        var rd = new RouteData();
        //        rd.DataTokens["area"] = "AreaName"; // In case controller is in another area
        //        rd.Values["controller"] = "Home";
        //        rd.Values["action"] = "Error";

        //        IController c = new HomeController(null);
        //        c.Execute(new RequestContext(new HttpContextWrapper(Context), rd));
        //    }
        //}
    }
}