namespace Api
{
  public static class Helpers
  {
    public static string GetGroupName(int gameId)
    {
      return $"game-{gameId}";
    }
  }
}