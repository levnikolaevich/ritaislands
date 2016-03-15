using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using rita.Models;
using System.ComponentModel.DataAnnotations;

namespace rita.Helpers
{

    public class RoleUserAttribute : AuthorizeAttribute
    {
        public int AccessLevel { get; set; }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            var isAuthorized = base.AuthorizeCore(httpContext);
            if (!isAuthorized)
            {
                return false;
            }

            var privilegeLevels = new BdData().GetUser(httpContext.User.Identity.Name).Permissions;

            if (privilegeLevels.Contains(this.AccessLevel))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool IsInPerm(IPrincipal user, int perm)
        {
            try
            {

                if (!user.Identity.IsAuthenticated || user == null || user.Identity == null)
                    return false;

                if (new BdData().GetUser(user.Identity.Name).Permissions.Contains(perm))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

       

        //rita.Helpers.RoleUserAttribute.IsInPerm(User.Identity.Name, (int)rita.Helpers.Permissions.AddEditDel_Places
    }

    public enum RatingPartners
    {
        StartPointPartner = 3,
        StartPointNotPartner = 1
    }

    public class ActionCheck
    {

        public static bool IsAction()
        {
            try
            {

                if (new BdData().IsAction())
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

    }

    public enum Permissions
    {
        AdminMenu = 1,
        AddEditDel_Partners = 2,
        AddEditDel_Action = 3,
        AddEditDel_Gallery = 4,
        AddEditDel_Portfolio = 5,
        AddEditDel_Blog = 6,
        AddEditDel_Places = 7,
        AddEditDel_Pack = 8,
        Partner_Role = 9,
        AddEditDel_Services = 10
    }
    public class ScreenModel
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }

    public class PermanentRedirectResult : ActionResult
    {
        public string Location { get; set; }

        public PermanentRedirectResult(string location)
        {
            Location = location;
        }

        public override void ExecuteResult(ControllerContext context)
        {
            context.HttpContext.Response.StatusCode = 301;
            context.HttpContext.Response.RedirectLocation = Location;
            context.HttpContext.Response.End();
        }
    }

    public class Utility
    {

        public static byte[] ReadToEnd(System.IO.Stream stream)
        {
            long originalPosition = 0;

            if (stream.CanSeek)
            {
                originalPosition = stream.Position;
                stream.Position = 0;
            }

            try
            {
                byte[] readBuffer = new byte[4096];

                int totalBytesRead = 0;
                int bytesRead;

                while ((bytesRead = stream.Read(readBuffer, totalBytesRead, readBuffer.Length - totalBytesRead)) > 0)
                {
                    totalBytesRead += bytesRead;

                    if (totalBytesRead == readBuffer.Length)
                    {
                        int nextByte = stream.ReadByte();
                        if (nextByte != -1)
                        {
                            byte[] temp = new byte[readBuffer.Length * 2];
                            Buffer.BlockCopy(readBuffer, 0, temp, 0, readBuffer.Length);
                            Buffer.SetByte(temp, totalBytesRead, (byte)nextByte);
                            readBuffer = temp;
                            totalBytesRead++;
                        }
                    }
                }

                byte[] buffer = readBuffer;
                if (readBuffer.Length != totalBytesRead)
                {
                    buffer = new byte[totalBytesRead];
                    Buffer.BlockCopy(readBuffer, 0, buffer, 0, totalBytesRead);
                }
                return buffer;
            }
            finally
            {
                if (stream.CanSeek)
                {
                    stream.Position = originalPosition;
                }
            }
        }
    }

}