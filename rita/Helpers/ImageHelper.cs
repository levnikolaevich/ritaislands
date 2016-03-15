using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace rita.Helpers
{
    public class ImageHelper
    {
        public static bool ValidateImage(HttpPostedFileBase file, int height, int width)
        {
            if (file.ContentLength <= 10000000)
            {
                try
                {
                    using (Image img = Image.FromStream(file.InputStream))
                    {
                        if (img.Height < height || img.Width < width)
                            return false;
                        else
                            return true;
                    }
                }
                catch { }
            }

            return false;
        }

        public static bool ValidateImage2(HttpPostedFileBase file, int height, int width)
        {
            if (file.ContentLength <= 10000000)
            {
                try
                {
                    using (Image img = Image.FromStream(file.InputStream))
                    {
                        if (img.Height != height || img.Width != width)
                            return false;
                        else
                            return true;
                    }
                }
                catch { }
            }

            return false;
        }

        public static void CorrectImage(HttpPostedFileBase file, int width)
        {
            if (file.ContentLength <= 10000000)
            {
                try
                {
                    using (Image img = Image.FromStream(file.InputStream))
                    {
                        if (img.Width > 640)
                        {
                            double cor = (double)img.Width / img.Height;
                            double height = (double)width / cor;
                            byte[] b = new byte[file.ContentLength];
                            file.InputStream.Read(b, 0, file.ContentLength);
                            ResizeImageFile(b, (int)height, width);
                        }
                    }
                }
                catch (Exception exception) { }
            }
        }

        public static byte[] CreateImage(Stream stream)
        {
            Image img = Image.FromStream(stream);
            MemoryStream ms = new MemoryStream();
            img.Save(ms, ImageFormat.Jpeg);
            return ResizeImageFile(ms.ToArray(), 480, 640);
        }

        public static void SaveImage(HttpPostedFileBase file)
        {
            string path = Path.Combine(HttpContext.Current.Server.MapPath("/images"), file.FileName);
            file.SaveAs(path);
        }

        public static byte[] ResizeImageFile(byte[] imageFile, int targetH, int targetW)
        {
            Image original = Image.FromStream(new MemoryStream(imageFile));
            Image imgPhoto = Image.FromStream(new MemoryStream(imageFile));

            if (original.Width > targetW)
            {
                double cor = (double)original.Width / original.Height;
                targetH = (int)(targetW / cor);
            }
            else if (targetH == 0)
            {
                return imageFile;
            }

            // Create a new blank canvas.  The resized image will be drawn on this canvas.
            Bitmap bmPhoto = new Bitmap(targetW, targetH, PixelFormat.Format24bppRgb);
            bmPhoto.SetResolution(72, 72);
            Graphics grPhoto = Graphics.FromImage(bmPhoto);
            grPhoto.SmoothingMode = SmoothingMode.AntiAlias;
            grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;
            grPhoto.PixelOffsetMode = PixelOffsetMode.HighQuality;
            grPhoto.DrawImage(imgPhoto, new Rectangle(0, 0, targetW, targetH), 0, 0, original.Width, original.Height, GraphicsUnit.Pixel);
            // Save out to memory and then to a file.  We dispose of all objects to make sure the files don't stay locked.
            MemoryStream mm = new MemoryStream();
            bmPhoto.Save(mm, System.Drawing.Imaging.ImageFormat.Jpeg);
            original.Dispose();
            imgPhoto.Dispose();
            bmPhoto.Dispose();
            grPhoto.Dispose();
            return mm.GetBuffer();
        }

        public static byte[] ResizeImageFile2(byte[] imageFile, int size)
        {
            int targetW = 0;
            int targetH = 0;
            Image original = Image.FromStream(new MemoryStream(imageFile));
            Image imgPhoto = Image.FromStream(new MemoryStream(imageFile));

            if (original.Width > original.Height)
            {
                targetW = size;
                double cor = (double)original.Width / original.Height;
                targetH = (int)(targetW / cor);
            }
            else if (original.Width < original.Height)
            {
                targetH = size;
                double cor = (double)original.Height / original.Width;
                targetW = (int)(targetH / cor);
            }
            else if (original.Width == original.Height)
            {
                targetW = size;
                targetH = size;
            }

            // Create a new blank canvas.  The resized image will be drawn on this canvas.
            Bitmap bmPhoto = new Bitmap(targetW, targetH, PixelFormat.Format24bppRgb);
            bmPhoto.SetResolution(72, 72);
            Graphics grPhoto = Graphics.FromImage(bmPhoto);
            grPhoto.SmoothingMode = SmoothingMode.AntiAlias;
            grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;
            grPhoto.PixelOffsetMode = PixelOffsetMode.HighQuality;
            grPhoto.DrawImage(imgPhoto, new Rectangle(0, 0, targetW, targetH), 0, 0, original.Width, original.Height, GraphicsUnit.Pixel);
            // Save out to memory and then to a file.  We dispose of all objects to make sure the files don't stay locked.
            MemoryStream mm = new MemoryStream();
            bmPhoto.Save(mm, System.Drawing.Imaging.ImageFormat.Jpeg);
            original.Dispose();
            imgPhoto.Dispose();
            bmPhoto.Dispose();
            grPhoto.Dispose();
            return mm.GetBuffer();
        }

        public static byte[] ResizeImageFile3(byte[] imageFile, int size)
        {
            int targetW = 0;
            int targetH = 0;
            Image original = Image.FromStream(new MemoryStream(imageFile));
            Image imgPhoto = Image.FromStream(new MemoryStream(imageFile));

            if (original.Width > original.Height)
            {
                targetH = size;
                double cor = (double)original.Height / original.Width;
                targetW = (int)(targetH / cor);
            }
            else if (original.Width < original.Height)
            {
                targetW = size;
                double cor = (double)original.Width / original.Height;
                targetH = (int)(targetW / cor);
            }
            else if (original.Width == original.Height)
            {
                targetW = size;
                targetH = size;
            }

            // Create a new blank canvas.  The resized image will be drawn on this canvas.
            Bitmap bmPhoto = new Bitmap(targetW, targetH, PixelFormat.Format24bppRgb);
            bmPhoto.SetResolution(72, 72);
            Graphics grPhoto = Graphics.FromImage(bmPhoto);
            grPhoto.SmoothingMode = SmoothingMode.AntiAlias;
            grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;
            grPhoto.PixelOffsetMode = PixelOffsetMode.HighQuality;
            grPhoto.DrawImage(imgPhoto, new Rectangle(0, 0, targetW, targetH), 0, 0, original.Width, original.Height, GraphicsUnit.Pixel);
            // Save out to memory and then to a file.  We dispose of all objects to make sure the files don't stay locked.
            MemoryStream mm = new MemoryStream();
            bmPhoto.Save(mm, System.Drawing.Imaging.ImageFormat.Jpeg);
            original.Dispose();
            imgPhoto.Dispose();
            bmPhoto.Dispose();
            grPhoto.Dispose();
            return mm.GetBuffer();
        }

        public static byte[] ConvertJPG(byte[] imageFile)
        {
            int targetW = 0;
            int targetH = 0;
            Image original = Image.FromStream(new MemoryStream(imageFile));
            Image imgPhoto = Image.FromStream(new MemoryStream(imageFile));

            targetW = original.Width;
            targetH = original.Height;

            // Create a new blank canvas.  The resized image will be drawn on this canvas.
            Bitmap bmPhoto = new Bitmap(targetW, targetH, PixelFormat.Format24bppRgb);
            bmPhoto.SetResolution(72, 72);
            Graphics grPhoto = Graphics.FromImage(bmPhoto);
            grPhoto.SmoothingMode = SmoothingMode.AntiAlias;
            grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;
            grPhoto.PixelOffsetMode = PixelOffsetMode.HighQuality;
            grPhoto.DrawImage(imgPhoto, new Rectangle(0, 0, targetW, targetH), 0, 0, original.Width, original.Height, GraphicsUnit.Pixel);
            // Save out to memory and then to a file.  We dispose of all objects to make sure the files don't stay locked.
            MemoryStream mm = new MemoryStream();
            bmPhoto.Save(mm, System.Drawing.Imaging.ImageFormat.Jpeg);
            original.Dispose();
            imgPhoto.Dispose();
            bmPhoto.Dispose();
            grPhoto.Dispose();
            return mm.GetBuffer();
        }

    }
}