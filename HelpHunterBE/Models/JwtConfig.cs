namespace HelpHunterBE
{
    public record class JwtConfig(
        string Issuer,
        string Audience
    );
}
