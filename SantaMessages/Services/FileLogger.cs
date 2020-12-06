using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;

namespace SantaMessages.Services
{
    public static class FileLogger
    {
        private static ReaderWriterLock file_lock = new ReaderWriterLock();

        private static string FilePath
        {
            get
            {
                string dir_name = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase);
                string file_path = Path.Combine(dir_name.Replace("file:\\", ""), "messages.txt");
                return file_path;
            }
        }

        public static void WriteToFile(string text)
        {
            try
            {
                // Increase the lock timer (MS) if needed
                file_lock.AcquireWriterLock(500);
                File.AppendAllLines(FilePath, new[] { text });
            }
            finally
            {
                file_lock.ReleaseWriterLock();
            }
        }
    }
}
