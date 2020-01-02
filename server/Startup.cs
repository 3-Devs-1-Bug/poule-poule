using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Api.Hubs;

namespace server
{
  public class Startup
  {
    private IConfiguration _config { get; }

    public Startup(IConfiguration configuration)
    {
      _config = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<PouleContext>(options =>
          options.UseSqlServer(_config.GetConnectionString("DefaultConnection"))
      );
      services.AddTransient<IGameService, GameService>();
      services.AddTransient<IGameManager, GameManager>();
      services.AddTransient<ISayingService, SayingService>();
      services.AddControllers();

      services.AddSignalR(options => options.EnableDetailedErrors = true);

      var allowedOrigins = _config["AllowedOrigins"].Split(',');

      services.AddCors(options =>
      {
        options.AddPolicy("default", policy =>
        {
          policy.WithOrigins(allowedOrigins)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
      });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
      {
        // apply migrations at startup if any
        var dbContext = serviceScope.ServiceProvider.GetService<PouleContext>();
        if (dbContext.Database.GetPendingMigrations().Any())
        {
          dbContext.Database.Migrate();
        }
      }

      // app.UseHttpsRedirection();

      app.UseRouting();

      // CORS middleware must be configured to execute between the calls to UseRouting and UseEndpoints.
      // ie. don't move this line.
      app.UseCors("default");

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
        endpoints.MapHub<GameHub>("/gameHub");
      });
    }
  }
}
