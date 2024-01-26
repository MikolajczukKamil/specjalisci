namespace HelpHunterBE.Logic.Searches
{
    public interface ISearchLogic
    {
        List<ServiceInfo> ExecuteSearchQuery(SearchCriteria criteria);
    }
}
