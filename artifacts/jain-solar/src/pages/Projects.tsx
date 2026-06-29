import React, { useEffect } from "react";
import { useGetProjects } from "@workspace/api-client-react";
import { MapPin, Zap, Calendar, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Projects() {
  useEffect(() => {
    document.title = "Our Projects | Jain Communications";
  }, []);

  const { data: projects, isLoading, isError } = useGetProjects();

  return (
    <div className="pt-20 min-h-screen bg-gray-50 pb-24">
      <div className="bg-primary py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Installations</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Take a look at some of the solar power plants we've successfully commissioned across Punjab.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-20">
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <Skeleton className="w-full aspect-video" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">Could not load projects</h3>
            <p className="text-muted-foreground">Please try refreshing the page later.</p>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.imageUrl || "/src/assets/images/project-res-1.png"} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary border-none font-semibold px-3 py-1">
                      {project.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-4 line-clamp-1">{project.title}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary/40 shrink-0" />
                      <span className="text-sm font-medium">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Zap className="w-5 h-5 text-secondary shrink-0" />
                      <span className="text-sm font-medium">Capacity: {project.capacity}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary/40 shrink-0" />
                      <span className="text-sm font-medium">Commissioned: {project.year}</span>
                    </div>
                  </div>

                  {project.savings && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="text-sm font-semibold text-green-600 bg-green-50 rounded-lg px-4 py-2 inline-flex items-center w-full">
                        <span className="flex-1 text-center">Est. Savings: {project.savings}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {projects && projects.length === 0 && !isLoading && (
          <div className="text-center py-20">
             <h3 className="text-2xl font-bold text-primary mb-2">No projects found</h3>
             <p className="text-muted-foreground">Check back later for updates to our portfolio.</p>
          </div>
        )}
      </div>
    </div>
  );
}
