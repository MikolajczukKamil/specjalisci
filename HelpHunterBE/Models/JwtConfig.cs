namespace HelpHunterBE
{
    public record class JwtConfig(
        string Key,
        string Issuer,
        string Audience
    );
}
