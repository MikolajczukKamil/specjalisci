using GeoCoordinatePortable;


namespace HelpHunterBE.Utils
{
    public static class Utils
    {
        public static double? CalculateDistance(float? lat1, float? lon1, float? lat2, float? lon2)
        {
            if (lat1.HasValue & lon1.HasValue & lat2.HasValue & lon2.HasValue)
            {
                GeoCoordinate pin1 = new GeoCoordinate(Convert.ToDouble(lat1), Convert.ToDouble(lon1));
                GeoCoordinate pin2 = new GeoCoordinate(Convert.ToDouble(lat2), Convert.ToDouble(lon2));

                return pin1.GetDistanceTo(pin2); // Returned value in meters
            }
            else
            {
                return null;
            }

        }
    }
}