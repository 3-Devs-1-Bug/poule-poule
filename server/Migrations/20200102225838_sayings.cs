using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class sayings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Saying",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Saying", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Saying",
                columns: new[] { "Id", "Content" },
                values: new object[,]
                {
                    { 1, "Mon coq est lâché, gardez vos poules !" },
                    { 2, "Il ne faut pas compter les œufs au cul de la poule." },
                    { 3, "Poule qui chante et coq qui danse méritent la potence." },
                    { 4, "Qui prend le coq pour guide aura un poulailler pour refuge." },
                    { 5, "Si l'on veut l'œuf, qu'on supporte la poule." },
                    { 6, "Poule promeneuse devient la proie du renard." },
                    { 7, "Quand le renard se met à prêcher, prends garde à ta poule." },
                    { 8, "Une poule ne se confesse pas au renard." },
                    { 9, "La poule affamée trouve elle-même l'orge au grenier." },
                    { 10, "On ne confie pas des poules à un renard." },
                    { 11, "L'œuf d'aujourd'hui vaut mieux que la poule de demain." },
                    { 12, "Même la poule à un cœur." },
                    { 13, "La poule domestique chasse la poule sauvage." }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Saying");
        }
    }
}
