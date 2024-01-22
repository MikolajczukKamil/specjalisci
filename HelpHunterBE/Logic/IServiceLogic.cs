using HelpHunterBE.Dto;

namespace HelpHunterBE.Logic
{
    public interface IServiceLogic
    {
        Task<List<ServiceDto>> GetAvailableServices(int specialistId);

        Task<bool> CreateOrUpdateService(ServiceDto service);
    }
}
