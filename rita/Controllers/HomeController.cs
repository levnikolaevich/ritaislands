using System.Globalization;
using System.Text;
using System.Web.Security;
using rita.Helpers;
using rita.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MailChimp;

namespace rita.Controllers
{

    public class MainFrame
    {
        public string AUrl { get; set; }
        public string AUrlImg { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public DateTime Datetime { get; set; }
        public string Text { get; set; }
    }

    //[OutputCache(Duration = 60 * 60 * 24 * 1, Location = System.Web.UI.OutputCacheLocation.Client, VaryByCustom = "lang")]
    public class HomeController : Controller
    {
        private readonly BdData _data = new BdData();
        
     

        public ActionResult Advert()
        {
            return View();
        }

        public ActionResult Message(string id)
        {
            ViewBag.Text = id;
            return View();
        }

        public ActionResult TestC()
        {
            Response.Cookies["r_u"].Value = "11";
            Response.Cookies["r_u"].Expires = DateTime.Now.AddDays(10);
            return Content("ok");
        }

        public ActionResult TestC2()
        {
            if (Request.Cookies["r_u"] != null)
            {
                return Content("ok " + Request.Cookies["r_u"].Value);
            }
            return Content("fail");
        }

        public ActionResult Main()
        {
            DateTime dts = DateTime.Now;
            ViewBag.ActiveMenu = "Index";
            //if (Request.IsAuthenticated)
            //{
            //    list = _data.GetDirectionsAll();
            //}
            //else
            //{
            //    list = _data.GetDirectionsAllVisible();
            //}
            List<Direction> list = _data.GetDirectionsAllVisible();
            ViewBag.Directions = list;
            DateTime dte = DateTime.Now;
            //_data.WriteLog("GetDirections  " + dts.ToString("O") + "_______" + dte.ToString("O"));

            dts = DateTime.Now;
            List<Portfolio> listP = _data.GetPortfoliosAllVisible();
            dte = DateTime.Now;
            //_data.WriteLog("GetPortfoliosAllVisible  " + dts.ToString("O") + "_______" + dte.ToString("O"));

            dts = DateTime.Now;
            List<Blog> listS = _data.GetAllBlogVisible();

            dte = DateTime.Now;
            //_data.WriteLog("GetAllBlogVisible  " + dts.ToString("O") + "_______" + dte.ToString("O"));


            dts = DateTime.Now;
            List<MainFrame> listF = listP.Select(portfolio => new MainFrame
            {
                AUrl = Url.Action("PortFolioIndex", "Home", new { id = portfolio.TranslitName }),
                AUrlImg = Url.Action("GetImagePortfolio", "Home", new { id = portfolio.SmallImage }),
                Date = portfolio.CreationDate.ToString("dd MMMM yyyy", new System.Globalization.CultureInfo("ru-RU")),
                Name = portfolio.Name,
                Text = portfolio.ShortText,
                Datetime = portfolio.CreationDate
            }).ToList();
            listF.AddRange(listS.Select(santorini => new MainFrame
            {
                AUrl = Url.Action("BlogIndex", "Home", new { id = santorini.TranslitName }),
                AUrlImg = Url.Action("GetImageSanta", "Home", new { id = santorini.SmallImage }),
                Date = santorini.CreationDate.ToString("dd MMMM yyyy", new System.Globalization.CultureInfo("ru-RU")),
                Name = santorini.Name,
                Text = santorini.ShortText,
                Datetime = santorini.CreationDate
            }));

            ViewBag.listF = listF.OrderByDescending(x => x.Datetime).Take(3).ToList();
            dte = DateTime.Now;
            //_data.WriteLog("foreach  " + dts.ToString("O") + "_______" + dte.ToString("O"));

            ViewBag.IsAuth = Request.IsAuthenticated;

            return View();
        }

        #region Wedding

        public ActionResult WeddingIndex(string id)
        {
            return View();
        }

        public ActionResult Weddings()
        {
            ViewBag.List = _data.GetWeddings(true);
            return View();
        }
        #endregion

        #region Search

        public ActionResult Search(int? countGuest, decimal? minMoney, decimal? maxMoney, int? dir, string isBeach)
        {
            #region Кол-во гостей
            ViewBag.Count_guest = countGuest;
            ViewBag.InputCountGuest = countGuest == null ? "" : countGuest.Value.ToString(CultureInfo.InvariantCulture);
            #endregion

            #region Бюджет
            ViewBag.MinMoney = minMoney;
            ViewBag.MaxMoney = maxMoney;
            ViewBag.InputMinMoney = minMoney == null ? "" : ((int)minMoney.Value).ToString(CultureInfo.InvariantCulture);
            ViewBag.InputMaxMoney = maxMoney == null ? "" : ((int)maxMoney.Value).ToString(CultureInfo.InvariantCulture);
            #endregion

            #region Направления
            if (dir == 0)
            {
                dir = null;
            }
            ViewBag.Dir = dir;
            #endregion

            #region Пляж
            if (isBeach != null && isBeach.Trim() == "on")
            {
                ViewBag.IsBeach = true;
            }
            else
            {
                ViewBag.IsBeach = null;
            }
            #endregion

            ViewBag.ListDirection = _data.GetPlaceCategories();
            ViewBag.List = _data.GetPackets();
            return View();
        }
        #endregion

        #region Auth
        //[AllowAnonymous]
        public ActionResult LogOn(string returnUrl)
        {
            if (Session["LogonListError"] != null)
            {
                ViewBag.ListError = Session["LogonListError"];
                Session["LogonListError"] = null;
            }

            if (String.IsNullOrEmpty(returnUrl))
            {
                ViewBag.ReturnUrl = @Url.Action("Main", "Home");
            }

            ViewBag.Ret = returnUrl;
            ViewBag.ActiveMenu = "Partners";
            return View();
        }

        //[AllowAnonymous]
        [HttpPost]
        public ActionResult LogOn(string email, string password, string returnUrl)
        {

            if (!_data.IsAuthorize(email, password))
            {
                Session["LogonListError"] = "Неправильный логин или пароль";
                return Redirect(Url.Action("LogOn", "Home"));
            }

            FormsAuthentication.SetAuthCookie(email, true);



            if (String.IsNullOrEmpty(returnUrl))
            {

                User user = _data.GetUser(email);
                Session["User"] = user;

                if (user.PartnerId != null)
                {
                    //LogonPartnerEmail(user);
                    return Redirect(Url.Action("PartnerIndex", "Home", new { id = user.Partners.TrName }));
                }
                return Redirect(Url.Action("Main", "Admin"));

            }
            return Redirect(returnUrl);
        }

        public ActionResult Registration()
        {
            ViewBag.ActiveMenu = "Partners";
            return View();
        }

        [Authorize]
        public ActionResult DelPartner()
        {

            ViewBag.ActiveMenu = "Partners";
            return View();
        }

        [Authorize]
        [HttpPost]
        public ActionResult DelPartner(string oldpassword)
        {
            if (_data.IsAuthorize(User.Identity.Name, oldpassword))
            {
                int? partnerId = _data.GetUser(User.Identity.Name).PartnerId;
                _data.DeleteUser(User.Identity.Name);
                if (partnerId != null)
                {
                    _data.DelPartner(partnerId.Value);
                }
                return Redirect(Url.Action("LogOff", "home"));
            }
            return Redirect(Url.Action("LogOff", "home"));
        }



        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult ModerationOn(string id)
        {
            User user = _data.GetUser(id);
            Partners partner = _data.GetPartner(user.Partners.TrName);

            partner.IsEnabled = true;

            _data.SavePartner(partner);

            string str = "Ваш профиль прошёл модерацию и опубликован на сайте Ritaislands.ru. Помните - больше переходов на профиль = ваш профиль выше в рейтинге на сайте!";

            _data.WriteEmail(str, "Ваш профиль опубликован на Ritaislands.ru");

            SendEmail send = new SendEmail();

            try
            {
                send.SendMail("rita@ritaislands.ru", new[] { partner.Email }, new string[0], new string[0],
                              "Ваш профиль опубликован на Ritaislands.ru", str, false, System.Net.Mail.MailPriority.High);
            }
            catch { }

            return Redirect(Url.Action("PartnerIndex", "home", new { id = partner.TrName }));
        }


        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        public ActionResult ModerationOff(string id)
        {
            User user = _data.GetUser(id);
            Partners partner = _data.GetPartner(user.Partners.TrName);

            partner.Moderated = 0;

            _data.SavePartner(partner);

            string str = "Ваш профиль НЕ прошёл модерацию и НЕ опубликован на сайте Ritaislands.ru. За дополнительной информцией пишите нам. Спасибо!";

            _data.WriteEmail(str, "Ваш профиль НЕ опубликован на Ritaislands.ru");
            
            SendEmail send = new SendEmail();

            try
            {
                send.SendMail("rita@ritaislands.ru", new[] { partner.Email }, new string[0], new string[0],
                              "Ваш профиль НЕ опубликован на Ritaislands.ru", str, false, System.Net.Mail.MailPriority.High);
            }
            catch { }

            return Redirect(Url.Action("PartnerIndex", "home", new { id = partner.TrName }));

        }

        [Authorize]
        public ActionResult ChangePassword()
        {
            ViewBag.ActiveMenu = "Partners";
            ViewBag.User = _data.GetUser(User.Identity.Name);

            return View();
        }

        public ActionResult RecoveryPassword()
        {
            ViewBag.ActiveMenu = "Partners";
            ViewBag.User = _data.GetUser(User.Identity.Name);

            return View();
        }

        [HttpPost]
        public ActionResult RecoveryPassword(string email)
        {
            if (_data.RecoveryPassword(email, Request.ServerVariables["REMOTE_ADDR"]))
            {
                return Redirect(Url.Action("Message", "Home", new { id = "Ваша заявка на восстановление пароля принята, в течение 5 минут Вам придет письмо с ссылкой на восстановление пароля" }));
            }
            return Redirect(Url.Action("Message", "Home", new { id = "Произошла ошибка" }));
        }

        public ActionResult RecoveryPasswordFromEmail(Guid id)
        {
            if (!_data.CheckGuidRecovery(id))
                return Redirect(Url.Action("Message", "Home", new { id = "Произошла ошибка" }));

            ViewBag.Guid = id;
            ViewBag.ActiveMenu = "Partners";
            return View();
        }

        [HttpPost]
        public ActionResult RecoveryPasswordFromEmail(Guid id, string newPassword)
        {
            if (!_data.CheckGuidRecovery(id))
                return Redirect(Url.Action("Message", "home", new { id = "Произошла ошибка" }));

            UrlRecoveryPassword url = _data.GetGuidRecovery(id);
            User user = _data.GetUser(url.Email);
            user.Password = newPassword;
            _data.ChangePassword(user);

            return Redirect(Url.Action("Message", "home", new { id = "Пароль изменен успешно" }));
        }

        [RoleUser(AccessLevel = (int)Permissions.Partner_Role)]
        [HttpPost]
        public ActionResult ChangePassword(string newpassword, string oldpassword)
        {
            if (_data.IsAuthorize(User.Identity.Name, oldpassword))
            {
                User user = _data.GetUser(User.Identity.Name);
                user.Password = newpassword;
                _data.ChangePassword(user);
                return Redirect(Url.Action("Message", "home", new { id = "Пароль изменен успешно" }));
            }
            return Redirect(Url.Action("Message", "home", new { id = "Неправильный логин или пароль" }));
        }

        [HttpPost]
        public ActionResult Registration(string email, string firstName, string lastName, string password)
        {
            Partners partner = new Partners
            {
                CreationDate = DateTime.Now,
                ShortDescription = "Описание для раздела Партнёры",
                Description = "Здесь вы можете рассказать о себе, своей работе и своих увлечениях",
                CategoryId = 1,
                FirstName = firstName.Trim(),
                LastName = lastName.Trim(),
                Email = email,
                IsEnabled = false,
                Rating = 0,
                Moderated = 0
            };

            _data.AddPartner(partner);

            //SendPartnerEmail(email, "http://ritaislands.ru/home/partnerindex/" + partner.TrName);

            User user = new User
            {
                PartnerId = partner.Id,
                Name = firstName.Trim(),
                LastName = lastName.Trim(),
                Email = email,
                Password = password
            };

            _data.AddUser(user);
            FormsAuthentication.SetAuthCookie(email, true);
            Session["User"] = user;


            //RegistrationPartnerEmail(user);


            return Redirect(Url.Action("PartnerIndex", "home", new { id = partner.TrName }));
        }

        [Authorize]
        public ActionResult LogOff()
        {
            FormsAuthentication.SignOut();
            Session["User"] = null;
            return Redirect(Url.Action("Main", "Home"));
        }

        private void LogonPartnerEmail(User user)
        {
            string str = @"
            Контакт: " + user.Email + @"
            Ccылка на профиль: http://ritaislands.ru/svadba-za-granicey/partnerindex/" + user.Partners.TrName + @"
            ";

            _data.WriteEmail(str, "Партнер авторизовался");
            SendEmail send = new SendEmail();
            try
            {
                send.SendMail("rita@ritaislands.ru", new[] { "rita@ritaislands.ru" }, new string[0], new string[0],
                              "Партнер авторизовался", str, false, System.Net.Mail.MailPriority.High);
            }
            catch { }
        }



        private void RegistrationPartnerEmail(User user)
        {


            string str = @"
            Контакт: " + user.Email + @"
            Ccылка на профиль: http://ritaislands.ru/svadba-za-granicey/partnerindex/" + user.Partners.TrName + @"
            ";

            _data.WriteEmail(str, "Партнер зарегистрировался");
            SendEmail send = new SendEmail();

            try
            {
                send.SendMail("rita@ritaislands.ru", new[] { "rita@ritaislands.ru" }, new string[0], new string[0],
                              "Партнер зарегистрировался", str, false, System.Net.Mail.MailPriority.High);
            }
            catch { }

        }

        #endregion

        #region Action

        public ActionResult Action(string id)
        {
            ViewBag.ActiveMenu = "Action";
            ViewBag.CurrentDirection = _data.GetDirection(id);

            if (Request.IsAuthenticated)
            {
                ViewBag.IsAuth = true;
                ViewBag.List = String.IsNullOrEmpty(id) ? _data.GetActions() : _data.GetActionsFromDirTrname(id);
                ViewBag.ListDiresctions = _data.GetDirectionWithAction();
            }
            else
            {
                ViewBag.IsAuth = false;
                ViewBag.List = String.IsNullOrEmpty(id) ? _data.GetAllVisibleActions() : _data.GetActionsFromDirTrnameVis(id);
                ViewBag.ListDiresctions = _data.GetDirectionWithActionVis();
            }

            return View();
        }

        public ActionResult ActionPartner(string id)
        {
            ViewBag.ActiveMenu = "Action";
            ViewBag.CurrentDirection = _data.GetDirectionFirst();

            if (Request.IsAuthenticated)
            {
                ViewBag.IsAuth = true;
                ViewBag.List = String.IsNullOrEmpty(id) ? _data.GetActions() : _data.GetActionsFromPartTrname(id);
                ViewBag.ListDiresctions = _data.GetDirectionWithAction();
            }
            else
            {
                ViewBag.IsAuth = false;
                ViewBag.List = String.IsNullOrEmpty(id) ? _data.GetAllVisibleActions() : _data.GetActionsFromPartTrnameVis(id);
                ViewBag.ListDiresctions = _data.GetDirectionWithActionVis();
            }

            return View("Action");
        }

        public ActionResult ActionPlace(string id)
        {
            ViewBag.ActiveMenu = "Action";
            ViewBag.CurrentDirection = _data.GetDirection(_data.GetPlace(id).Direction.TrName);

            if (Request.IsAuthenticated)
            {
                ViewBag.IsAuth = true;
                ViewBag.List = String.IsNullOrEmpty(id) ? _data.GetActions() : _data.GetActionsFromPlaceTrname(id);
                ViewBag.ListDiresctions = _data.GetDirectionWithAction();
            }
            else
            {
                ViewBag.IsAuth = false;
                ViewBag.List = String.IsNullOrEmpty(id) ? _data.GetAllVisibleActions() : _data.GetActionsFromPlaceTrnameVis(id);
                ViewBag.ListDiresctions = _data.GetDirectionWithActionVis();
            }

            return View("Action");
        }

        public ActionResult ActionIndex(string id)
        {
            ViewBag.ActiveMenu = "Action";

            Actions actions = _data.GetActionTrName(id);
            ViewBag.Actions = actions;

            if (actions == null)
            {
                PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("Action", "Home"));
                permanent.ExecuteResult(ControllerContext);
            }

            // ReSharper disable once PossibleNullReferenceException
            if (actions.IsVisible)
            {
                //Поиск следующей акции
                int idp = actions.Id;
                Actions nextaction = null;
                // ReSharper disable once PossibleInvalidOperationException
                int minId = _data.GetActionsMinId().Value;
                // ReSharper disable once PossibleInvalidOperationException
                int maxId = _data.GetActionsMaxId().Value;

                while (nextaction == null)
                {
                    if (idp >= minId && idp < maxId)
                    {
                        idp++;
                        nextaction = _data.GetActionVisible(idp);
                    }
                    else if (idp == maxId)
                    {
                        nextaction = _data.GetActionId(minId);
                    }
                }

                ViewBag.nextaction = nextaction;

                //Поиск предыдущей акции
                idp = actions.Id;
                Actions prevaction = null;

                while (prevaction == null)
                {
                    if (idp > minId && idp <= maxId)
                    {
                        idp--;
                        prevaction = _data.GetActionVisible(idp);
                    }
                    else if (idp == minId)
                    {
                        prevaction = _data.GetActionId(maxId);
                    }
                }

                ViewBag.prevaction = prevaction;
            }

            ViewBag.ActionDirectionCount = actions.ActionDirection.Count;
            ViewBag.ActionPlaceCount = actions.ActionPlace.Count;
            ViewBag.ActionPackCount = actions.ActionPack.Count;
            ViewBag.ActionPartnerCount = actions.ActionPartner.Count;

            return View();
        }

        #endregion

        #region Services
        public ActionResult Services()
        {
            return View();
        }
        #endregion

        #region ContactServices







        public ActionResult ContactServices(string packet)
        {
            ViewBag.Packet = packet;
            if (Session["Packet"] != null)
            {
                ViewBag.Text = Session["Packet"].ToString();
                Session["Packet"] = null;
            }
            else
            {
                ViewBag.Text = packet;
            }
            return View();
        }

        //public void sendChimpEmail(string emailto, int templateId)
        //{
            


        //}


        [HttpPost]
        public ActionResult SendUslugi(string ch, string txt, string rd, string ssum)
        {
            ch = Server.UrlDecode(ch);
            txt = Server.UrlDecode(txt);
            rd = Server.UrlDecode(rd);

            StringBuilder sb = new StringBuilder();
            sb.Append(@"Свадебный пакет ""ИНДИВИДУАЛЬНЫЙ""" + Environment.NewLine);

            if (ch != null)
                foreach (string s in ch.Replace("=", " = ").Split('&'))
                {
                    sb.Append(s + Environment.NewLine);
                }

            if (rd != null)
                foreach (string s in rd.Replace("=", " = ").Split('&'))
                {
                    sb.Append(s + Environment.NewLine);
                }

            if (txt != null)
                foreach (string s in txt.Split('&'))
                {
                    if (s.Substring(s.Length - 1, 1) != "=")
                    {
                        sb.Append(s.Replace("=", " = ") + Environment.NewLine);
                    }
                }

            sb.Append(Environment.NewLine + "Сумма = " + ssum);

            Session["Packet"] = sb.ToString();

            return Redirect(Url.Action("ContactServices", "Home", new { packet = @"Свадебный пакет ""ИНДИВИДУАЛЬНЫЙ""" }));
        }

        #endregion

        #region Index
        public ActionResult Index(string id)
        {
            if (String.IsNullOrEmpty(id))
            {
                PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("Index", "Home", new { id = "Svadba-na-Santorini" }));
                permanent.ExecuteResult(ControllerContext);
            }

            ViewBag.ActiveMenu = "Index";
            Direction direction = _data.GetDirection(id);

            // ReSharper disable once PossibleNullReferenceException
            if (direction == null && id.Contains("_"))
            {
                PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("Index", "Home", new { id = id.Replace("_", "-") }));
                permanent.ExecuteResult(ControllerContext);
            }
            ViewBag.Direction = direction;
            // ReSharper disable once PossibleNullReferenceException
            ViewBag.List = _data.GetPortfoliosTop3(direction.Id);
            ViewBag.Slider = _data.GetSliders(direction.Id);
            //ViewBag.MainImages = _data.GetMainImages();
            ViewBag.ListPlaces = Request.IsAuthenticated ? _data.GetTopXPlacesAll(id, 1, 3) : _data.GetTopXPlaces(id, 1, 3);

            ViewBag.Updated = _data.GetDateIndex();

            Session["dir"] = id;

            ViewBag.IsAuth = Request.IsAuthenticated;

            return View();
        }

        public ActionResult RitaislandsMap()
        {
            ViewBag.Directions = _data.GetDirections();
            ViewBag.Places = _data.GetAllVisiblePlaces();
            ViewBag.Partners = _data.GetOnlyVisiblePartners();
            ViewBag.Portfolio = _data.GetPortfoliosAllVisible();
            ViewBag.Blog = _data.GetAllBlogVisible();
            ViewBag.a = _data.GetAllBlogVisible().Count();
            ViewBag.b = _data.GetPortfoliosAllVisible().Count();

            return View();
        }

        public ActionResult Error(string url)
        {
            Response.StatusCode = 404;
            return View();
        }

        #endregion

        #region Feedback
        public ActionResult Feedback(int? page)
        {
            ViewBag.ActiveMenu = "Feedback";

            List<Feedback> list = _data.GetFeedbacks();          

            #region Paging
            const int CountElementOnPage = 5;
            if (page == null)
            {
                page = 1;
            }
            ViewBag.SelectPage = page.Value;
            if (list.Count % CountElementOnPage == 0)
            {
                ViewBag.PageCount = list.Count / CountElementOnPage;
            }
            else
            {
                ViewBag.PageCount = list.Count / CountElementOnPage + 1;
            }
            int skip = 0;
            if (page.Value > 1)
            {
                skip = (page.Value - 1) * CountElementOnPage;
            }
            list = list.Skip(skip).Take(CountElementOnPage).ToList();
            #endregion

            ViewBag.Feedbacks = list;


            return View();
        }

        #endregion

        #region Gallery
        public ActionResult Gallery(string id)
        {

            if (String.IsNullOrEmpty(id))
            {
                PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("Gallery", "Home", new { id = "Svadba-na-Santorini" }));
                permanent.ExecuteResult(this.ControllerContext);
            }

            ViewBag.ActiveMenu = "Gallery";

            // ReSharper disable once SimplifyLinqExpression
            if (!_data.GetDirections3().Any(x => x.TrName == id))
            {
                // ReSharper disable once ReplaceWithSingleCallToCount
                if (Session["dir"] != null && _data.GetDirections3().Where(x => x.TrName == Session["dir"].ToString()).Count() != 0)
                {
                    id = Session["dir"].ToString();
                }
                else
                {
                    id = _data.GetDirections().First().TrName;
                    PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("Gallery", "Home", new { id }));
                    permanent.ExecuteResult(ControllerContext);
                }
            }

            ViewBag.IsAuth = Request.IsAuthenticated;

            Direction direction = _data.GetDirection(id);
            ViewBag.Directions = _data.GetDirections3();
            ViewBag.Direction = direction;

            ViewBag.List = _data.GetGallerysAll(direction.Id);

            return View();
        }

        #endregion

        #region О нас
        public ActionResult About()
        {
            ViewBag.ActiveMenu = "About";
            return View();
        }
        #endregion

        #region Спасибо
        public ActionResult Thanks()
        {
            return View();
        }
        #endregion

        #region Portfolio
        public ActionResult PortFolioIndex(string id)
        {
            ViewBag.ActiveMenu = "Portfolio";

            Portfolio portfolio2 = _data.GetPortfolio(id);
            ViewBag.Portfolio = portfolio2;

            if (portfolio2 == null && id.Contains("_"))
            {
                PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("PortFolioIndex", "Home", new { id = id.Replace("_", "-") }));
                permanent.ExecuteResult(ControllerContext);
            }

            // ReSharper disable once PossibleNullReferenceException
            Direction postdirection = _data.GetDirectionID(portfolio2.DirectionId);
            ViewBag.PostDirection = postdirection;

            if (portfolio2.IsVisible)
            {
                var list = _data.GetPortfoliosNoPage();
                Dictionary<int, Portfolio> dictionary = new Dictionary<int, Portfolio>();
                int i = 0;

                foreach (Portfolio partners in list)
                {
                    i++;
                    dictionary.Add(i, partners);
                }

                var currentItem = dictionary.First(x => x.Value.Id == portfolio2.Id);
                Portfolio previousItem = currentItem.Key > 1 ? dictionary[currentItem.Key - 1] : dictionary[dictionary.Count];
                Portfolio nextItem = currentItem.Key < dictionary.Count ? dictionary[currentItem.Key + 1] : dictionary[1];

                ViewBag.nextpost = nextItem;
                ViewBag.prevpost = previousItem;
            }

            return View();
        }

        public ActionResult Portfolio(int? page)
        {
            if (page == null || page < 1)
                page = 1;
            ViewBag.ActiveMenu = "Portfolio";

            if (User.Identity.IsAuthenticated && _data.GetUser(User.Identity.Name).Permissions.Contains((int)Permissions.AddEditDel_Portfolio))
            {
                ViewBag.List = _data.GetPortfoliosAll(page.Value);
                ViewBag.PageCount = _data.GetCountPagePortfoliosAll();
            }
            else
            {
                ViewBag.List = _data.GetPortfolios(page.Value);
                ViewBag.PageCount = _data.GetCountPagePortfolios();
            }

            ViewBag.SelectPage = page.Value;

            ViewBag.IsAuth = Request.IsAuthenticated;

            return View();
        }

        #endregion

        #region Blog
        public ActionResult BlogIndex(string id)
        {
            ViewBag.ActiveMenu = "Blog";

            Blog santorini = _data.GetSanta(id);
            ViewBag.Portfolio = santorini;

            if (santorini == null && id.Contains("_"))
            {
                PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("BlogIndex", "Home", new { id = id.Replace("_", "-") }));
                permanent.ExecuteResult(ControllerContext);
            }

            // ReSharper disable once PossibleNullReferenceException
            //            if (santorini.IsVisible)
            //            {
            //                //Поиск следующего поста в Блоге
            //                int idp = santorini.Id;
            //                Blog nextpost = null;
            //// ReSharper disable once PossibleInvalidOperationException
            //                int minId = _data.GetBlogMinId().Value;
            //// ReSharper disable once PossibleInvalidOperationException
            //                int maxId = _data.GetBlogMaxId().Value;

            //                while (nextpost == null)
            //                {
            //                    if (idp >= minId && idp < maxId)
            //                    {
            //                        idp++;
            //                        nextpost = _data.GetBlogVisible(idp);
            //                    }
            //                    else if (idp == maxId)
            //                    {
            //                        nextpost = _data.GetSanta(minId);
            //                    }
            //                }

            //                ViewBag.nextpost = nextpost;

            //                //Поиск предыдущего поста в Блоге
            //                idp = santorini.Id;
            //                Blog prevpost = null;

            //                while (prevpost == null)
            //                {
            //                    if (idp > minId && idp <= maxId)
            //                    {
            //                        idp--;
            //                        prevpost = _data.GetBlogVisible(idp);
            //                    }
            //                    else if (idp == minId)
            //                    {
            //                        prevpost = _data.GetSanta(maxId);
            //                    }
            //                }

            //                ViewBag.prevpost = prevpost;
            //            }

            if (santorini.IsVisible)
            {
                var list = _data.GetSantasNoPage();
                Dictionary<int, Blog> dictionary = new Dictionary<int, Blog>();
                int i = 0;

                foreach (Blog partners in list)
                {
                    i++;
                    dictionary.Add(i, partners);
                }

                var currentItem = dictionary.First(x => x.Value.Id == santorini.Id);
                Blog previousItem = currentItem.Key > 1 ? dictionary[currentItem.Key - 1] : dictionary[dictionary.Count];
                Blog nextItem = currentItem.Key < dictionary.Count ? dictionary[currentItem.Key + 1] : dictionary[1];

                ViewBag.nextpost = nextItem;
                ViewBag.prevpost = previousItem;
            }

            return View();
        }

        public ActionResult Blog(int? page)
        {
            if (page == null || page < 1)
                page = 1;
            ViewBag.ActiveMenu = "Blog";

            if (User.Identity.IsAuthenticated && _data.GetUser(User.Identity.Name).Permissions.Contains((int)Permissions.AddEditDel_Blog))
            {
                ViewBag.List = _data.GetSantasAll(page.Value);
                ViewBag.PageCount = _data.GetCountPageSantaAll();
            }
            else
            {
                ViewBag.List = _data.GetSantas(page.Value);
                ViewBag.PageCount = _data.GetCountPageSanta();
            }

            ViewBag.SelectPage = page.Value;

            ViewBag.IsAuth = Request.IsAuthenticated;

            return View();
        }
        #endregion

        #region Contact
        public ActionResult Contact()
        {
            ViewBag.ActiveMenu = "Contact";
            return View();
        }
        #endregion

        #region Partners
        public ActionResult Partners(string id)
        {
            ViewBag.FirstCategory = _data.GetPartnerCategoriesFirst();

            if (string.IsNullOrEmpty(id))
            {
                PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("Partners", "Home", new { id = ViewBag.FirstCategory.TrName }));
                permanent.ExecuteResult(ControllerContext);
            }

            if (!string.IsNullOrEmpty(id))
            {
                ViewBag.Partner = _data.GetPartnerCategorie(id);
                ViewBag.List = _data.GetAllPartners(id);
            }

            ViewBag.PartnerCategories = _data.GetPartnerCategories2();
            ViewBag.ActiveMenu = "Partners";

            if (Request.IsAuthenticated)
            {
                ViewBag.IsAuth = true;
                ViewBag.User = _data.GetUser(User.Identity.Name);
            }
            else
            {
                ViewBag.IsAuth = false;
            }


            return View();
        }

        public ActionResult PartnerIndex(string id)
        {
            ViewBag.ActiveMenu = "Partners";

            Partners partner = _data.GetPartner(id);

            if (partner == null && id.Contains("_"))
            {
                PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("PartnerIndex", "Home", new { id = id.Replace("_", "-") }));
                permanent.ExecuteResult(ControllerContext);
            }


            if (partner != null)
            {

                ViewBag.Portfolio = partner;
                ViewBag.PartnerImages = _data.GetPartnerImages(partner.Id);

                if (ViewBag.Portfolio.Price != null)
                {
                    ViewBag.Portfolio.Price = (int)ViewBag.Portfolio.Price;
                }


                if (User.Identity.IsAuthenticated)
                {
                    string partneremail = User.Identity.Name;
                    User user = _data.GetUser(partneremail);

                    if (user.PartnerId == partner.Id)
                    {
                        ViewBag.OwnPartner = partner;
                    }

                }


                if (!partner.IsEnabled && !User.Identity.IsAuthenticated)
                {
                    PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("Partners", "Home", new { id = "photo" }));
                    permanent.ExecuteResult(ControllerContext);
                }

                else if (partner.IsEnabled)
                {

                    var list = _data.GetAllPartners(partner.PartnerCategory.TrName);
                    Dictionary<int, Partners> dictionary = new Dictionary<int, Partners>();
                    int i = 0;

                    foreach (Partners partners in list.Where(x => x.IsEnabled))
                    {
                        i++;
                        dictionary.Add(i, partners);
                    }

                    var currentItem = dictionary.First(x => x.Value.Id == partner.Id);
                    Partners previousItem = currentItem.Key > 1 ? dictionary[currentItem.Key - 1] : dictionary[dictionary.Count];
                    Partners nextItem = currentItem.Key < dictionary.Count ? dictionary[currentItem.Key + 1] : dictionary[1];

                    ViewBag.nextpartner = nextItem;
                    ViewBag.prevpartner = previousItem;
                    ViewBag.Mesto = currentItem.Key;

                    if (partner.Rating == null)
                    {
                        partner.Rating = 0;
                    }

                    if (previousItem.Rating == null)
                    {
                        previousItem.Rating = 0;
                    }

                    if (nextItem.Rating == null)
                    {
                        nextItem.Rating = 0;
                    }

                    if (previousItem.Rating == partner.Rating)
                    {
                        ViewBag.toNextRate = 1;
                    }
                    else if (previousItem.Rating < partner.Rating)
                    {
                        ViewBag.toNextRate = 0;
                    }
                    else
                    {
                        ViewBag.toNextRate = previousItem.Rating - partner.Rating;
                    }

                    if (nextItem.Rating == partner.Rating)
                    {
                        ViewBag.toLastRate = 1;
                    }
                    else if (nextItem.Rating > partner.Rating)
                    {
                        ViewBag.toLastRate = 0;
                    }
                    else
                    {
                        ViewBag.toLastRate = partner.Rating - nextItem.Rating;
                    }

                }
            }
            else
            {
                ViewBag.FirstCategory = _data.GetPartnerCategoriesFirst();
                PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("Partners", "Home", new { id = ViewBag.FirstCategory.TrName }));
                permanent.ExecuteResult(ControllerContext);

            }

            return View();
        }


        [RoleUser(AccessLevel = (int)Permissions.Partner_Role)]
        public ActionResult UpdatePartner()
        {
            if (Session["UpdatePartnerListError"] != null)
            {
                ViewBag.ListError = Session["UpdatePartnerListError"];
                Session["UpdatePartnerListError"] = null;
            }
            ViewBag.ActiveMenu = "Partners";
            ViewBag.PartnerCategories = _data.GetPartnerCategories();

            string email = User.Identity.Name;
            User user = _data.GetUser(email);
            Partners partner = _data.GetPartner(user.Partners.TrName);
            ViewBag.Partner = partner;
            ViewBag.PartnerImages = _data.GetPartnerImages(partner.Id);

            return View();
        }

        [RoleUser(AccessLevel = (int)Permissions.Partner_Role)]
        public ActionResult UpdatePartnerPhoto()
        {
            if (Session["UpdatePartnerPhotoListError"] != null)
            {
                ViewBag.ListError = Session["UpdatePartnerPhotoListError"];
                Session["UpdatePartnerPhotoListError"] = null;
            }
            else
            {
                ViewBag.ListError = null;
            }
            ViewBag.ActiveMenu = "Partners";
            //ViewBag.PartnerCategories = _data.GetPartnerCategories();

            string email = User.Identity.Name;
            User user = _data.GetUser(email);
            Partners partner = _data.GetPartner(user.Partners.TrName);
            ViewBag.Partner = partner;
            ViewBag.PartnerImages = _data.GetPartnerImages(partner.Id);

            return View();
        }

        [ValidateInput(false)]
        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.Partner_Role)]
        public ActionResult UpdatePartner(string city, string firstName, string lastName, string trName, decimal? price, string profession, string viezd, string phone, string site, string email, string skype, string facebook, string vk, int prId, string text, string name, string shortText, string longText, HttpPostedFileBase file, HttpPostedFileBase file1, HttpPostedFileBase file2)
        {
            List<string> list = new List<string>();

            string partneremail = User.Identity.Name;
            User user = _data.GetUser(partneremail);
            Partners partner = _data.GetPartner(user.Partners.TrName);

            partner.ShortDescription = shortText;
            partner.Description = longText;
            partner.Name = name.Trim();
            partner.TrName = trName.Trim();
            partner.CategoryId = prId;
            partner.City = city;
            partner.FirstName = firstName.Trim();
            partner.LastName = lastName.Trim();
            partner.Profession = profession;
            partner.Viezd = viezd.Trim();
            partner.Phone = phone;
            partner.Site = site.Contains(@"http:") ? site.Remove(0, 7) : site;

            partner.Skype = skype;
            partner.Facebook = facebook.Contains(@"https:") ? facebook.Remove(0, 21) : facebook;
            partner.Vk = vk.Contains(@"http:") ? vk.Remove(0, 14) : vk;

            partner.Price = price;
            partner.IsEnabled = false;
            partner.Moderated = 0;

            if (file != null)
            {
                byte[] b = new byte[file.ContentLength];
                file.InputStream.Read(b, 0, file.ContentLength);
                if (!ImageHelper.ValidateImage2(file, 278, 370))
                {
                    list.Add("Неправильный размер картинки для закладки партнеры");
                }
                else
                {
                    partner.Image = _data.UploadImageRet(new Image { Data = b });
                }
            }

            if (file1 != null)
            {
                byte[] b1 = new byte[file1.ContentLength];
                file1.InputStream.Read(b1, 0, file1.ContentLength);
                if (!ImageHelper.ValidateImage2(file1, 200, 200))
                {
                    list.Add("Неправильный размер аватарки пользователя");
                }
                else
                {
                    partner.Avatar = _data.UploadImageRet(new Image { Data = b1 });
                }
            }

            if (file2 != null)
            {
                byte[] b2 = new byte[file2.ContentLength];
                file2.InputStream.Read(b2, 0, file2.ContentLength);
                if (!ImageHelper.ValidateImage2(file2, 430, 1170))
                {
                    list.Add("Неправильный размер фоновой картинки в профиле");
                }
                else
                {
                    partner.ImageProfile = _data.UploadImageRet(new Image { Data = b2 });
                }
            }

            Session["UpdatePartnerListError"] = list;

            _data.UpdatePartner(partner);
            if (list.Count > 0)
            {
                return Redirect(Url.Action("UpdatePartner", "Home"));
            }
            return Redirect(Url.Action("PartnerIndex", "Home", new { id = partner.TrName }));
        }

        public ActionResult PartnerThanks()
        {
            return View();
        }


        [RoleUser(AccessLevel = (int)Permissions.Partner_Role)]
        public ActionResult DelPartnerPhoto(int id)
        {
            string partneremail = User.Identity.Name;
            User user = _data.GetUser(partneremail);

            PartnersImage partnerimage = _data.GetPartnersImageByImageId(id);

            if (partnerimage.PartnerId == user.PartnerId)
            {
                _data.DelPartnerPhoto(id);
            }

            return Redirect(Url.Action("UpdatePartnerPhoto", "Home"));
        }

        [RoleUser(AccessLevel = (int)Permissions.Partner_Role)]
        public ActionResult DelPartnerAllPhoto()
        {
            string partneremail = User.Identity.Name;
            User user = _data.GetUser(partneremail);

            if (user.PartnerId != null)
            {
                _data.DelPartnerAllPhoto((int)user.PartnerId);
            }


            return Redirect(Url.Action("UpdatePartnerPhoto", "Home"));
        }



        /// <summary>
        /// Функция добавления фотографий и видео в профиль партнера
        /// </summary>
        /// <param name="file">Фотография</param>
        /// <param name="video">Ссылка на видео</param>
        /// <returns></returns>
        [ValidateInput(false)]
        [HttpPost]
        [RoleUser(AccessLevel = (int)Permissions.Partner_Role)]
        public ActionResult AddPartnerPhotos(IEnumerable<HttpPostedFileBase> file, string video)
        {
            List<string> list = new List<string>();

            string partneremail = User.Identity.Name;
            User user = _data.GetUser(partneremail);
            Partners partner = _data.GetPartner(user.Partners.TrName);

            IEnumerable<HttpPostedFileBase> httpPostedFileBases = file as IList<HttpPostedFileBase> ?? file.ToList();
            foreach (HttpPostedFileBase f in httpPostedFileBases)
            {
                PartnersImage partnerImage = new PartnersImage();
                byte[] b = new byte[f.ContentLength];
                f.InputStream.Read(b, 0, f.ContentLength);

                if (!ImageHelper.ValidateImage2(f, 480, 720))
                {

                    list.Add("Неправильный размер фотографий для фотогалереи");
                }
                else
                {
                    partnerImage.Image = _data.UploadImageRet(new Image { Data = b });
                    partnerImage.PartnerId = partner.Id;
                    if (!string.IsNullOrEmpty(video) && httpPostedFileBases.Count() > 1)
                    {
                        partnerImage.VideoUrl = video;
                    }

                    _data.AddPartnerPhoto(partnerImage);
                }

            }

            Session["UpdatePartnerPhotoListError"] = list;

            return Redirect(Url.Action("UpdatePartnerPhoto", "Home"));
        }

        /// <summary>
        /// Послать письмо Админу о добавлении Партнера
        /// </summary>
        /// <param name="contact"></param>
        /// <param name="page"></param>
        // ReSharper disable once UnusedMember.Local
        private void SendPartnerEmail(string contact, string page)
        {
            string str = @"
            Контакт: " + contact + @"
            Ccылка на профиль: " + page + @"
            ";

            _data.WriteEmail(str, "Новый партнер");

            SendEmail send = new SendEmail();
            try
            {
                send.SendMail("rita@ritaislands.ru", new[] { "rita@ritaislands.ru" }, new string[0], new string[0],
                              "Новый партнер", str, false, System.Net.Mail.MailPriority.High);
            }
            catch { }
        }

        [RoleUser(AccessLevel = (int)Permissions.Partner_Role)]
        public ActionResult EmailModeration()
        {


            string partneremail = User.Identity.Name;
            User user = _data.GetUser(partneremail);
            Partners partner = _data.GetPartner(user.Partners.TrName);


            string str = @"
            Контакт: " + partner.Email + @"
            Ccылка на профиль: http://ritaislands.ru/svadba-za-granicey/partnerindex/" + partner.TrName + @"
            ";

            _data.PartnerOnModerated(partner);

            _data.WriteEmail(str, "Модерация партнера");

            SendEmail send = new SendEmail();

            try
            {
                send.SendMail("rita@ritaislands.ru", new[] { "rita@ritaislands.ru" }, new string[0], new string[0],
                              "Модерация партнера", str, false, System.Net.Mail.MailPriority.High);
            }
            catch
            {


            }

            return Redirect(Url.Action("PartnerIndex", "Home", new { id = partner.TrName }));

        }

        [RoleUser(AccessLevel = (int)Permissions.Partner_Role)]
        public ActionResult PublicatedOff()
        {

            string partneremail = User.Identity.Name;
            User user = _data.GetUser(partneremail);
            Partners partner = _data.GetPartner(user.Partners.TrName);

            _data.PublicatedOff(partner);

            return Redirect(Url.Action("PartnerIndex", "Home", new { id = partner.TrName }));
        }

        [RoleUser(AccessLevel = (int)Permissions.AddEditDel_Partners)]
        //[HttpPost]
        public ActionResult PublicatedAdminOff(string id)
        {


            User user = _data.GetUser(id);
            Partners partner = _data.GetPartner(user.Partners.TrName);

            _data.PublicatedOff(partner);

            string str = "Ваш профиль снят с публикации на сайте Ritaislands.ru. За дополнительной информацией пишите нам. Спасибо!";

            _data.WriteEmail(str, "Изменен ваш профиль на Ritaislands.ru");
            SendEmail send = new SendEmail();

            try
            {
                send.SendMail("rita@ritaislands.ru", new[] { partner.Email }, new string[0], new string[0],
                              "Изменен ваш профиль на Ritaislands.ru", str, false, System.Net.Mail.MailPriority.High);
            }
            catch { }
            return Redirect(Url.Action("PartnerIndex", "Home", new { id = partner.TrName }));
        }

        #endregion

        #region Places
        public ActionResult Res(int? countryId, int? countGuests, decimal? money, bool? isAction, int? type)
        {
            List<int> listCountry = new List<int>();
            if (countryId != null)
            {
                listCountry.Add(countryId.Value);
            }

            if (countGuests == null)
            {
                countGuests = 0;
            }

            if (money == null)
            {
                money = 0;
            }

            if (isAction == null)
            {
                isAction = false;
            }

            if (type == null)
            {
                type = 1;
            }

            ViewBag.CountryId = countryId;
            ViewBag.CountGuests = countGuests.Value;
            ViewBag.Money = money.Value;
            ViewBag.IsAction = isAction.Value;
            ViewBag.Type = type.Value;

            ViewBag.List = _data.GetRes(listCountry, countGuests.Value, money.Value, isAction.Value, type.Value);

            return View();
        }

        public ActionResult Places(string id, int? type)
        {
            //if (String.IsNullOrEmpty(id))
            //{
            //    PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("Places", "Home", new { id = "Svadba-na-Santorini" }));
            //    permanent.ExecuteResult(this.ControllerContext);
            //}


            if (!string.IsNullOrEmpty(id) && _data.GetAllPlaces(id).Count == 0 && id.Contains("_"))
            {
                PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("Places", "Home", new { id = id.Replace("_", "-") }));
                permanent.ExecuteResult(ControllerContext);
            }
            if (string.IsNullOrEmpty(id) || _data.GetAllPlaces(id).Count == 0)
            {
                if (Session["dir"] != null && _data.GetAllPlaces(Session["dir"].ToString()).Count != 0)
                {
                    id = Session["dir"].ToString();
                    ViewBag.Partner = _data.GetPlaceCategorie(id);
                }
                else
                {
                    Direction partner = _data.GetPlaceCategoriesFirst();
                    ViewBag.Partner = partner;
                    id = partner.TrName;
                }
            }
            else
            {
                ViewBag.Partner = _data.GetPlaceCategorie(id);
            }

            if (type == null)
            {
                type = 1;
            }

            List<Places> list = _data.GetAllPlaces(id);

            ViewBag.Id = id;
            ViewBag.Type = type;
            ViewBag.List = list.Where(x => x.PlaceTypeId == type);
            ViewBag.PartnerCategories = _data.GetDirections2();
            ViewBag.IsPl = list.Any(x => x.PlaceTypeId == 1);
            ViewBag.IsRest = list.Any(x => x.PlaceTypeId == 2);
            ViewBag.ActiveMenu = "Places";

            ViewBag.IsAuth = Request.IsAuthenticated;


            return View();
        }

        public ActionResult PlaceIndex(string id)
        {
            ViewBag.ActiveMenu = "Places";

            Places place = _data.GetPlace(id);
            if (place == null && id.Contains("_"))
            {
                PermanentRedirectResult permanent = new PermanentRedirectResult(Url.Action("PlaceIndex", "Home", new { id = id.Replace("_", "-") }));
                permanent.ExecuteResult(ControllerContext);
            }

            // ReSharper disable once PossibleNullReferenceException
            if (place.PlaceTypeId == 1)
            {
                ViewBag.CategoryName = "Рестораны";
                ViewBag.List = _data.GetAllPlaces(place.Direction.TrName, 2);
            }
            else
            {
                ViewBag.CategoryName = "Площадки для проведения церемонии";
                ViewBag.List = _data.GetAllPlaces(place.Direction.TrName, 1);

            }

            if (place.IsEnabled)
            {
                var list = _data.GetAllPlaces(place.Direction.TrName);
                Dictionary<int, Places> dictionary = new Dictionary<int, Places>();
                int i = 0;

                foreach (Places partners in list)
                {
                    i++;
                    dictionary.Add(i, partners);
                }

                var currentItem = dictionary.First(x => x.Value.Id == place.Id);
                Places previousItem = currentItem.Key > 1 ? dictionary[currentItem.Key - 1] : dictionary[dictionary.Count];
                Places nextItem = currentItem.Key < dictionary.Count ? dictionary[currentItem.Key + 1] : dictionary[1];

                ViewBag.nextplace = nextItem;
                ViewBag.prevplace = previousItem;
            }

            ViewBag.Portfolio = place;
            ViewBag.PartnerImages = _data.GetPlaceImages(place.Id);
            ViewBag.Packs = _data.GetPlacePacks(place.Id);

            ViewBag.IsAuth = Request.IsAuthenticated;

            return View();
        }

        #endregion

        #region Cash

        [OutputCache(Duration = 60 * 60 * 24 * 7, Location = System.Web.UI.OutputCacheLocation.ServerAndClient, VaryByCustom = "lang")]
        public ActionResult GetImagePlacePhoto(int id, string p)
        {
            return File(_data.GetImagePlacePhoto(id), "JPEG");
        }

        [OutputCache(Duration = 60 * 60 * 24 * 7, Location = System.Web.UI.OutputCacheLocation.ServerAndClient, VaryByCustom = "lang")]
        public ActionResult GetImagePartnerPhoto(int id, string p)
        {
            return File(_data.GetImagePartnerPhoto(id), "JPEG");
        }

        [OutputCache(Duration = 60 * 60 * 24 * 7, Location = System.Web.UI.OutputCacheLocation.ServerAndClient, VaryByCustom = "lang")]
        public FileContentResult GetImageGallery(int id, string p)
        {
            return File(_data.GetGalleryImage(id), "JPEG");
        }

        [OutputCache(Duration = 60 * 60 * 24 * 7, Location = System.Web.UI.OutputCacheLocation.ServerAndClient, VaryByCustom = "lang")]
        public FileContentResult GetImageGallery2(int id, string p)
        {
            byte[] file = _data.GetGalleryImage(id);
            ImageHelper.ResizeImageFile3(file, 50);

            return File(file, "JPEG");
        }

        [OutputCache(Duration = 60 * 60 * 24 * 7, Location = System.Web.UI.OutputCacheLocation.ServerAndClient, VaryByCustom = "lang")]
        public FileContentResult GetImageGallery3(int id, string p)
        {
            byte[] file = _data.GetGalleryImage(id);
            ImageHelper.ResizeImageFile2(file, 370);

            return File(file, "JPEG");
        }

        [OutputCache(Duration = 60 * 60 * 24 * 7, Location = System.Web.UI.OutputCacheLocation.ServerAndClient, VaryByCustom = "lang")]
        public FileContentResult GetImage(int id)
        {
            return File(_data.GetImage(id), "JPEG");
        }

        [OutputCache(Duration = 60 * 60 * 24 * 7, Location = System.Web.UI.OutputCacheLocation.ServerAndClient, VaryByCustom = "lang")]
        public FileContentResult GetImages(int id)
        {
            return File(_data.GetImage(id), "JPEG");
        }

        [OutputCache(Duration = 60 * 60 * 24 * 7, Location = System.Web.UI.OutputCacheLocation.ServerAndClient, VaryByCustom = "lang")]
        public ActionResult GetImagePartner(int id, int? img)
        {
            if (Session["Screen"] == null)
            {
                return File(_data.GetImagePartner(id), "JPEG");
            }
            ScreenModel model = (ScreenModel)Session["Screen"];
            return File(ImageHelper.ResizeImageFile2(_data.GetImagePartner(id), model.Width), "JPEG");
        }

        [OutputCache(Duration = 60 * 60 * 24 * 7, Location = System.Web.UI.OutputCacheLocation.ServerAndClient, VaryByCustom = "lang")]
        public ActionResult GetImagePlace(int id, int? img)
        {
            if (Session["Screen"] == null)
            {
                return File(_data.GetImagePlace(id), "JPEG");
            }
            ScreenModel model = (ScreenModel)Session["Screen"];
            return File(ImageHelper.ResizeImageFile2(_data.GetImagePlace(id), model.Width), "JPEG");
        }

        [OutputCache(Duration = 60 * 60 * 24 * 7, Location = System.Web.UI.OutputCacheLocation.ServerAndClient, VaryByCustom = "lang")]
        public ActionResult GetImagePortfolio(int id)
        {
            if (Session["Screen"] == null)
            {
                return File(_data.GetImagePortfolio(id), "JPEG");
            }
            ScreenModel model = (ScreenModel)Session["Screen"];
            return File(ImageHelper.ResizeImageFile2(_data.GetImagePortfolio(id), model.Width), "JPEG");
        }

        [OutputCache(Duration = 60 * 60 * 24 * 7, Location = System.Web.UI.OutputCacheLocation.ServerAndClient, VaryByCustom = "lang")]
        public ActionResult GetImageSanta(int id)
        {
            if (Session["Screen"] == null)
            {
                return File(_data.GetImage(id), "JPEG");
            }
            ScreenModel model = (ScreenModel)Session["Screen"];
            return File(ImageHelper.ResizeImageFile2(_data.GetImage(id), model.Width), "JPEG");
        }
        #endregion

        [HttpPost]
        public ActionResult SaveScreen(ScreenModel model)
        {
            if (model.Width < 1379)
            {
                model.Width = 1379;
            }
            Session["Screen"] = model;
            return Content("Ok");
        }

    }
}
