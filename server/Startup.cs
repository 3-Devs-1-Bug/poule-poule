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
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<PouleContext>(options =>
          options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")
      ));
      services.AddTransient<IGameService, GameService>();
      services.AddControllers();

      services.AddSignalR(options => options.EnableDetailedErrors = true);

      services.AddCors(options =>
      {
        options.AddPolicy("default", policy =>
        {
          policy.WithOrigins("http://localhost:3000")
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

      app.UseHttpsRedirection();

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
